import os
import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/gemini", tags=["gemini"])

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyBxJBvAD_iR_2xYTxVszd7wh_o79NT-fzc")
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent"


class MessageRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat_with_gemini(request: MessageRequest):
    """Send a message to Gemini API and get a response"""
    try:
        payload = {
            "contents": [
                {
                    "role": "user",
                    "parts": [
                        {
                            "text": f"""You are a helpful guide for the National Self Help Group (SHG) Digital Platform. You help users understand what Self Help Groups are, how the platform works, and provide guidance on SHG management in simple, non-technical language. Always be friendly and use real-world examples relevant to rural communities and SHGs in India.

User Question: {request.message}

Please provide a clear, concise response in 2-3 sentences that directly answers the question."""
                        }
                    ],
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "topK": 40,
                "topP": 0.95,
                "maxOutputTokens": 1024,
            },
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
                json=payload,
                timeout=30.0,
            )

            if response.status_code != 200:
                error_data = response.json()
                raise HTTPException(
                    status_code=response.status_code,
                    detail=error_data.get("error", {}).get("message", "Failed to get response from Gemini API"),
                )

            data = response.json()
            generated_text = data.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text")

            if not generated_text:
                raise HTTPException(status_code=500, detail="No response generated from Gemini API")

            return {"response": generated_text}

    except httpx.RequestError as e:
        raise HTTPException(status_code=500, detail=f"Request error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
