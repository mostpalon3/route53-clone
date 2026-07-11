from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from app.database import Base

class DNSRecord(Base):
    __tablename__ = "dns_records"

    id = Column(Integer, primary_key=True, index=True)
    hosted_zone_id = Column(String, ForeignKey("hosted_zones.zone_id", ondelete="CASCADE"), index=True, nullable=False)
    name = Column(String, index=True, nullable=False)
    type = Column(String, index=True, nullable=False)
    ttl = Column(Integer, nullable=False, default=300)
    value = Column(String, nullable=False)
    routing_policy = Column(String, nullable=False, default="Simple")
    alias = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
