import json
import os
from pathlib import Path
from datetime import datetime

DATA_DIR = Path(__file__).parent / "data"

def ensure_data_dir():
    """Ensure data directory exists"""
    DATA_DIR.mkdir(exist_ok=True)

def read_json(filename: str) -> dict:
    """Read JSON file from data directory"""
    ensure_data_dir()
    filepath = DATA_DIR / filename
    if not filepath.exists():
        return {}
    
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def write_json(filename: str, data: dict):
    """Write JSON file to data directory"""
    ensure_data_dir()
    filepath = DATA_DIR / filename
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def get_next_id(items: list, id_key: str = 'id') -> int:
    """Get the next ID for a new item"""
    if not items:
        return 1
    return max(item.get(id_key, 0) for item in items) + 1

def get_today_date() -> str:
    """Get today's date in YYYY-MM-DD format"""
    return datetime.now().strftime("%Y-%m-%d")
