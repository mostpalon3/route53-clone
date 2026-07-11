import uuid
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from app.database import Base

class DNSRecord(Base):
    __tablename__ = "dns_records"

    id = Column(Integer, primary_key=True, index=True)
    hosted_zone_id = Column(String, ForeignKey("hosted_zones.zone_id", ondelete="CASCADE"), index=True, nullable=False)
    
    # Route53 specific fields
    record_id = Column(String, unique=True, index=True, default=lambda: str(uuid.uuid4()))
    record_name = Column(String, index=True, nullable=False)
    record_type = Column(String, index=True, nullable=False)
    routing_policy = Column(String, nullable=False, default="Simple")
    set_identifier = Column(String, nullable=True)
    alias = Column(Boolean, default=False)
    value = Column(String, nullable=False)
    ttl = Column(Integer, nullable=True) # TTL can be null for alias records
    health_check_id = Column(String, nullable=True)
    evaluate_target_health = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
