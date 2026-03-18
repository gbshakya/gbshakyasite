#!/usr/bin/env python3
"""
Automation script for sequential execution of data collection scripts.
Runs collectData.py and collectSymbols.py with proper error handling and logging.
"""

import subprocess
import logging
import os
import sys
from datetime import datetime
import shutil

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('data_collection.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DATA_DIR = os.path.join(os.path.dirname(SCRIPT_DIR), 'static', 'data')
COLLECT_DATA_SCRIPT = os.path.join(SCRIPT_DIR, 'collectData.py')
COLLECT_SYMBOLS_SCRIPT = os.path.join(SCRIPT_DIR, 'collectSymbols.py')
CSV_FILE = os.path.join(SCRIPT_DIR, 'merolagani_company_info.csv')
TARGET_CSV_FILE = os.path.join(STATIC_DATA_DIR, 'merolagani_company_info.csv')

def run_script(script_path, script_name):
    """Run a Python script and return success status."""
    try:
        logger.info(f"Starting {script_name}...")
        
        # Change to script directory to ensure relative paths work
        original_cwd = os.getcwd()
        os.chdir(SCRIPT_DIR)
        
        # Run the script
        result = subprocess.run(
            [sys.executable, script_path],
            capture_output=True,
            text=True,
            timeout=3600  # 1 hour timeout
        )
        
        # Restore original directory
        os.chdir(original_cwd)
        
        if result.returncode == 0:
            logger.info(f"{script_name} completed successfully")
            logger.info(f"Output: {result.stdout}")
            return True
        else:
            logger.error(f"{script_name} failed with return code {result.returncode}")
            logger.error(f"Error: {result.stderr}")
            return False
            
    except subprocess.TimeoutExpired:
        logger.error(f"{script_name} timed out after 1 hour")
        return False
    except Exception as e:
        logger.error(f"Error running {script_name}: {str(e)}")
        return False

def copy_csv_to_static():
    """Copy the generated CSV file to the static data directory."""
    try:
        if os.path.exists(CSV_FILE):
            # Ensure static data directory exists
            os.makedirs(STATIC_DATA_DIR, exist_ok=True)
            
            # Copy file
            shutil.copy2(CSV_FILE, TARGET_CSV_FILE)
            logger.info(f"CSV file copied to {TARGET_CSV_FILE}")
            
            # Get file info
            file_size = os.path.getsize(TARGET_CSV_FILE)
            logger.info(f"File size: {file_size} bytes")
            return True
        else:
            logger.error(f"Source CSV file not found: {CSV_FILE}")
            return False
    except Exception as e:
        logger.error(f"Error copying CSV file: {str(e)}")
        return False

def main():
    """Main execution function."""
    logger.info("="*50)
    logger.info("Starting data collection automation")
    logger.info(f"Timestamp: {datetime.now().isoformat()}")
    logger.info("="*50)
    
    try:
        
        
        # Step 1: Run collectSymbols.py (only if first script succeeded)
        if not run_script(COLLECT_SYMBOLS_SCRIPT, "collectSymbols.py"):
            logger.error("collectSymbols.py failed. Aborting execution.")
            return False

        # Step 2: Run collectData.py
        if not run_script(COLLECT_DATA_SCRIPT, "collectData.py"):
            logger.error("collectData.py failed. Aborting execution.")
            return False
        
        # Step 3: Copy CSV to static directory
        if not copy_csv_to_static():
            logger.error("Failed to copy CSV file to static directory.")
            return False
        
        logger.info("="*50)
        logger.info("Data collection automation completed successfully!")
        logger.info(f"Final timestamp: {datetime.now().isoformat()}")
        logger.info("="*50)
        return True
        
    except Exception as e:
        logger.error(f"Unexpected error in main execution: {str(e)}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
