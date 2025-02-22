from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
  
from fastapi import Request
from openai import OpenAI

client = OpenAI()

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
