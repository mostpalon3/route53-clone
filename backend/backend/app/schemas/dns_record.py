from pydantic import BaseModel, constr
from typing import Optional
from datetime import datetime

class DNSRecordBase(BaseModel):
    name: str
    type: str
    ttl: int = 300
    value: str
    routing_policy: str = "Simple"
    alias: bool = False

class DNSRecordCreate(DNSRecordBase):
    pass

class DNSRecordUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    ttl: Optional[int] = None
    value: Optional[str] = None
    routing_policy: Optional[str] = None
    alias: Optional[bool] = None

class DNSRecordResponse(DNSRecordBase):
    id: int
    hosted_zone_id: str
    created_at: datetime

    class Config:
        from_attributes = True

class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict | list | DNSRecordResponse] = None
