from fastapi import Request
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import traceback
import sys


class ErrorLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
            return response
        except Exception as e:
            # Get detailed error info
            exc_type, exc_value, exc_traceback = sys.exc_info()
            error_details = traceback.format_exception(
                exc_type, exc_value, exc_traceback
            )
            error_str = "".join(error_details)

            # Try to import and use our logger - if it fails, use print as fallback
            try:
                from utils.logger import logger
                from models.db_models import LogManager, LogLevel

                logger.error(f"Unhandled exception: {str(e)}")
                logger.error(f"Traceback: {error_str}")

                # Try to log to database
                try:
                    client_host = getattr(request.client, "host", "unknown")
                    LogManager.log_to_db(
                        LogLevel.ERROR,
                        f"Unhandled exception: {str(e)}",
                        source=f"{request.method} {request.url.path}",
                        ip_address=client_host,
                    )
                except Exception as db_err:
                    logger.error(f"Failed to log to database: {str(db_err)}")
            except ImportError:
                # Fallback to print if logger is not available
                print(f"ERROR: Unhandled exception: {str(e)}")
                print(f"ERROR: Traceback: {error_str}")

            # Return a JSON response with the error
            return JSONResponse(
                status_code=500,
                content={"error": "Internal server error", "message": str(e)},
            )
