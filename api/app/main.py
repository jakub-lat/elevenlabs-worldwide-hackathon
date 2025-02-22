from fastapi import FastAPI
from fastapi import Request
from openai import OpenAI

from .tools import tools

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

client = OpenAI()

@app.post("/get_next_message")
async def get_next_message(request: Request):
    body = await request.json()
    
    conversation_history = body.get("conversation_history", [])
    conversation_history.append({"role": "user", "content": body.get("message", "")})
    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=conversation_history if conversation_history else None,
        tools=tools,
        tool_choice="auto"
    )
    
    conversation_history.append({"role": "assistant", "content": response.choices[0].message.content})
    
    return {"message": response.choices[0].message.content, "conversation_history": conversation_history}
