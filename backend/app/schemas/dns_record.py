from pydantic import BaseModel, constr
from typing import Optional
from datetime import datetime

class DNSRecordBase(BaseModel):
    record_name: str
    record_type: str
    routing_policy: str = "Simple"
    set_identifier: Optional[str] = None
    alias: bool = False
    value: str
    ttl: Optional[int] = None
    health_check_id: Optional[str] = None
    evaluate_target_health: bool = False

class DNSRecordCreate(DNSRecordBase):
    pass

class DNSRecordUpdate(BaseModel):
    record_name: Optional[str] = None
    record_type: Optional[str] = None
    routing_policy: Optional[str] = None
    set_identifier: Optional[str] = None
    alias: Optional[bool] = None
    value: Optional[str] = None
    ttl: Optional[int] = None
    health_check_id: Optional[str] = None
    evaluate_target_health: Optional[bool] = None

class DNSRecordResponse(DNSRecordBase):
    id: int
    record_id: str
    hosted_zone_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict | list | DNSRecordResponse] = None
