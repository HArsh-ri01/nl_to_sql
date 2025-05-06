from fastapi import APIRouter, Request, Form
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from utils.logger import logger

router = APIRouter(prefix="/debug", tags=["debug"])


class EchoRequest(BaseModel):
    message: str


@router.post("/echo")
async def echo(request: Request, message: str = Form(None), body: EchoRequest = None):
    """
    Debug endpoint that echoes back the received data in different formats
    """
    # Log the request
    logger.info("Debug echo endpoint called")

    # Collect form data
    form_data = {}
    if message:
        form_data["message"] = message

    # Prepare response with all available information
    response = {
        "status": "ok",
        "request_info": {
            "method": request.method,
            "url": str(request.url),
            "headers": dict(request.headers),
            "form_data": form_data,
            "json_body": body.dict() if body else None,
        },
    }

    return JSONResponse(content=response)


@router.get("/health")
async def health_check():
    """Simple health check endpoint"""
    return {"status": "healthy"}
