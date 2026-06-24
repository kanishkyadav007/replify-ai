from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[
        {
            "role": "user",
            "content": "Say hello in one short sentence."
        }
    ]
)

print(response.choices[0].message.content)

message = """
I think my friend is upset with me.
"""

prompt = f"""
You are Replify AI.

Analyze the message:

{message}

Return JSON only:

{{
    "emotion":"",
    "confidence":"",
    "replies":[
        "",
        "",
        ""
    ]
}}
"""

response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[
        {
            "role": "user",
            "content": prompt
        }
    ]
)

print(response.choices[0].message.content)