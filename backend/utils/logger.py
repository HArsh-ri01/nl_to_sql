import logging
import os
from datetime import datetime
from pathlib import Path


class Logger:
    """
    Custom logger utility for the application
    """

    def __init__(self, name="nl_to_sql", log_level=logging.INFO):
        # Create logs directory if it doesn't exist
        log_dir = Path("logs")
        log_dir.mkdir(exist_ok=True)

        # Create a logger
        self.logger = logging.getLogger(name)
        self.logger.setLevel(log_level)

        # Remove existing handlers if any
        if self.logger.handlers:
            self.logger.handlers.clear()

        # Create file handler which logs even debug messages
        log_file = log_dir / f"{name}_{datetime.now().strftime('%Y%m%d')}.log"
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(log_level)

        # Create console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(log_level)

        # Create formatter and add to the handlers
        formatter = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)

        # Add handlers to logger
        self.logger.addHandler(file_handler)
        self.logger.addHandler(console_handler)

    def info(self, message):
        self.logger.info(message)

    def error(self, message):
        self.logger.error(message)

    def warning(self, message):
        self.logger.warning(message)

    def debug(self, message):
        self.logger.debug(message)

    def critical(self, message):
        self.logger.critical(message)


# Create a singleton instance with more verbose initialization
try:
    logger = Logger()
    # Add an immediate log to verify logger is working
    logger.info("Logger initialized successfully")
except Exception as e:
    # Fallback to basic logging if custom logger fails
    import logging

    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("nl_to_sql_fallback")
    logger.error(f"Failed to initialize custom logger: {str(e)}")
    logger.info("Using fallback logger")
