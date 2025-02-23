from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from openai import OpenAI
import shutil
import os
from .tools import tools
from .prompts import SYSTEM_PROMPT
from .products import products

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = OpenAI()

# Set up upload directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def read_root():
    return {"message": "API is running!"}


@app.post("/transcribe/")
async def transcribe_audio(file: UploadFile = File(...)):
    """Handles audio transcription using OpenAI's Whisper model."""
    try:
        file_location = os.path.join(UPLOAD_DIR, file.filename)

        # Save uploaded file
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Transcribe the audio file
        with open(file_location, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )

        # Remove temporary file after processing
        os.remove(file_location)

        print(f"Transcription: {transcription.text}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription error: {str(e)}")


@app.post("/get_next_message/")
async def get_next_message(request: Request):
    """Handles chatbot response using OpenAI's GPT-4o model."""

    body = await request.json()
    conversation_history = body.get("conversation_history", [])
    if len(conversation_history) == 0:
      products_formatted = [
          f"Product (id: {product['id']}): {product['name']} - {product['price']}\n"
          f"Description: {product['description']}\n"
          f"Capacity: {product['capacity']}\n"
          f"Weight: {product['weight']}\n"
          f"Season rating: {product['season_rating']}\n"
          f"Setup type: {product['setup_type']}\n"
          f"Packed size: {product['packed_size']}\n"
          f"Material: {product['material']}\n"
          f"Special features: {product['special_features']}\n"
          for product in products["products"]
      ]
      
      products_formatted = "\n".join(products_formatted)
      
      conversation_history.append({"role": "system", "content": SYSTEM_PROMPT.format(products=products_formatted)})
      conversation_history.append({"role": "assistant", "content": "Hi, what do you want to explore?"})
    
    conversation_history.append({"role": "user", "content": body.get("user_message")})

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=conversation_history,
        tools=tools,
        tool_choice="required",
    )

    assistant_message = response.choices[0].message
    tool_call_id = assistant_message.tool_calls[0].id
    function_name = assistant_message.tool_calls[0].function.name
    results = assistant_message.tool_calls[0].function.arguments

    conversation_history.append({"role": "function", "tool_call_id": assistant_message.tool_calls[0].id, "name": assistant_message.tool_calls[0].function.name, "content": results})
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=conversation_history,
        tools=tools,
        tool_choice="none",
    )
    
    conversation_history.append({
      "role": "assistant",
      "content": response.choices[0].message.content,
      "tool_calls": response.choices[0].message.tool_calls
    })

    return {"message": "test", "conversation_history": conversation_history}
