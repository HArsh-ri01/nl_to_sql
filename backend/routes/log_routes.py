from fastapi import APIRouter, Query, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from models.db_models import LogManager, LogLevel
from utils.logger import logger

router = APIRouter(prefix="/logs", tags=["logs"])


class LogEntry(BaseModel):
    id: int
    level: str
    message: str
    timestamp: str
    source: Optional[str] = None
    ip_address: Optional[str] = None


class LogResponse(BaseModel):
    logs: List[LogEntry]
    total: int
    page: int
    per_page: int


@router.get("/error", response_model=LogResponse)
async def get_error_logs(
    page: int = Query(1, ge=1),
    per_page: int = Query(50, ge=1, le=100),
    level: Optional[str] = None,
):
    """Get error logs from the database"""
    try:
        # Convert level string to enum if provided
        level_enum = None
        if level:
            try:
                level_enum = LogLevel[level.upper()]
            except KeyError:
                raise HTTPException(
                    status_code=400, detail=f"Invalid log level: {level}"
                )

        # Calculate offset
        offset = (page - 1) * per_page

        # Get logs
        logs = LogManager.get_logs(
            log_type="error", limit=per_page, offset=offset, level=level_enum
        )

        # Log the request
        logger.info(f"Retrieved {len(logs)} error logs")

        return LogResponse(
            logs=logs,
            total=len(logs),  # In a real app, you'd have a count query
            page=page,
            per_page=per_page,
        )
    except Exception as e:
        logger.error(f"Error retrieving logs: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/app", response_model=LogResponse)
async def get_app_logs(
    page: int = Query(1, ge=1),
    per_page: int = Query(50, ge=1, le=100),
    level: Optional[str] = None,
):
    """Get application logs from the database"""
    try:
        # Convert level string to enum if provided
        level_enum = None
        if level:
            try:
                level_enum = LogLevel[level.upper()]
            except KeyError:
                raise HTTPException(
                    status_code=400, detail=f"Invalid log level: {level}"
                )

        # Calculate offset
        offset = (page - 1) * per_page

        # Get logs
        logs = LogManager.get_logs(
            log_type="app", limit=per_page, offset=offset, level=level_enum
        )

        # Log the request
        logger.info(f"Retrieved {len(logs)} app logs")

        return LogResponse(
            logs=logs,
            total=len(logs),  # In a real app, you'd have a count query
            page=page,
            per_page=per_page,
        )
    except Exception as e:
        logger.error(f"Error retrieving logs: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
