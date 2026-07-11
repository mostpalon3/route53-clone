from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.database import Base

class HostedZone(Base):
    __tablename__ = "hosted_zones"

    id = Column(Integer, primary_key=True, index=True)
    zone_id = Column(String, unique=True, index=True, nullable=False)
    domain_name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    zone_type = Column(String, nullable=False, default="PUBLIC")
    record_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
