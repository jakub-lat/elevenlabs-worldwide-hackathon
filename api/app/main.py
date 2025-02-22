from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
  
from fastapi import Request
from openai import OpenAI

client = OpenAI()

from fastapi import FastAPI, UploadFile, File, HTTPException
from openai import OpenAI
import shutil
import os

app = FastAPI()
client = OpenAI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/transcribe/")
async def transcribe_audio(file: UploadFile = File(...)):
    try:
        file_location = f"{UPLOAD_DIR}/{file.filename}"
        
        # Save the uploaded file
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Open the saved file and transcribe
        with open(file_location, "rb") as audio_file:
            transcription = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )
        
        # Delete the file after processing
        os.remove(file_location)
        
        return {"text": transcription.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/get_next_message")
async def get_next_message(request: Request):
    body = await request.json()
    print("here is good")
    
    conversation_history = body.get("conversation_history", [])
    
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=conversation_history if conversation_history else None
    )
    
    conversation_history.append({"role": "assistant", "content": response.choices[0].message['content']})
    
    return {"message": response.choices[0].message['content'], "conversation_history": conversation_history}
