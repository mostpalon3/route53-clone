from pydantic import BaseModel, constr
from typing import Optional
from datetime import datetime

class HostedZoneBase(BaseModel):
    domain_name: str
    description: Optional[str] = None
    zone_type: str = "PUBLIC"

class HostedZoneCreate(HostedZoneBase):
    pass

class HostedZoneUpdate(BaseModel):
    description: Optional[str] = None

class HostedZoneResponse(HostedZoneBase):
    id: int
    zone_id: str
    record_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict | list | HostedZoneResponse] = None
