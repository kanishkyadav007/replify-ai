import json
from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

class ChatRequest(BaseModel):
    chat: str

@app.get("/")
def home():
    return {"status": "Replify AI Running"}

@app.post("/analyze")
def analyze(data: ChatRequest):

    prompt = f"""
You are Replify AI.

Analyze this conversation:

{data.chat}

Return valid JSON only.

Rules:
- conversation_health must be an integer from 0 to 100
- misunderstanding_risk must be: low, medium, or high
- replies must be natural and human sounding
- replies must be short (under 25 words)
- do not repeat the same wording across styles
Generate one reply for each style:
- friendly
- supportive
- funny
- professional
- confident
- flirty
- formal
- apologetic
- motivational
{{
  "friend_emotion": "",
  "your_tone": "",
  "conversation_health": 0,
  "misunderstanding_risk": "",

  "reply_styles": {{
   
    "friendly": "",
    "supportive": "",
    "funny": "",
    "professional": "",
    "confident": "",
    "flirty": "",
    "formal": "",
    "apologetic": "",
    "motivational": ""

  }},

  "communication_tip": ""
}}
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]
    )

    print(response.choices[0].message.content)

    result = json.loads(
     response.choices[0].message.content
    )
    return result