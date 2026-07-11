import string
import random
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.hosted_zone import HostedZone
from app.models.dns_record import DNSRecord
from app.schemas.hosted_zone import HostedZoneCreate, HostedZoneUpdate

def generate_zone_id() -> str:
    return "Z" + "".join(random.choices(string.ascii_uppercase + string.digits, k=13))

def create_hosted_zone(db: Session, zone_in: HostedZoneCreate) -> HostedZone:
    # Check duplicate domain name
    existing_zone = db.query(HostedZone).filter(HostedZone.domain_name == zone_in.domain_name).first()
    if existing_zone:
        raise HTTPException(status_code=400, detail="Hosted zone with this domain name already exists")
    
    zone_id = generate_zone_id()
    new_zone = HostedZone(
        zone_id=zone_id,
        domain_name=zone_in.domain_name,
        description=zone_in.description,
        zone_type=zone_in.zone_type,
        record_count=2
    )
    db.add(new_zone)
    db.flush()

    # Automatically insert SOA record
    soa_record = DNSRecord(
        hosted_zone_id=zone_id,
        name=zone_in.domain_name,
        type="SOA",
        ttl=900,
        value=f"ns-1536.awsdns-00.co.uk. awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400",
        routing_policy="Simple"
    )
    # Automatically insert NS record
    ns_record = DNSRecord(
        hosted_zone_id=zone_id,
        name=zone_in.domain_name,
        type="NS",
        ttl=172800,
        value="ns-1536.awsdns-00.co.uk.\nns-0.awsdns-00.com.\nns-1024.awsdns-00.org.\nns-512.awsdns-00.net.",
        routing_policy="Simple"
    )

    db.add(soa_record)
    db.add(ns_record)
    
    db.commit()
    db.refresh(new_zone)
    return new_zone

def get_hosted_zones(db: Session):
    return db.query(HostedZone).all()

def get_hosted_zone(db: Session, id: int):
    zone = db.query(HostedZone).filter(HostedZone.id == id).first()
    if not zone:
        raise HTTPException(status_code=404, detail="Hosted zone not found")
    return zone

def update_hosted_zone(db: Session, id: int, zone_update: HostedZoneUpdate):
    zone = get_hosted_zone(db, id)
    if zone_update.description is not None:
        zone.description = zone_update.description
    db.commit()
    db.refresh(zone)
    return zone

def delete_hosted_zone(db: Session, id: int):
    zone = get_hosted_zone(db, id)
    db.delete(zone)
    db.commit()
    return True
