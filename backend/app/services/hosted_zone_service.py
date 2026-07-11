import string
import random
import re
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.hosted_zone import HostedZone
from app.models.dns_record import DNSRecord
from app.schemas.hosted_zone import HostedZoneCreate, HostedZoneUpdate
from sqlalchemy.exc import SQLAlchemyError

def is_valid_domain(domain: str) -> bool:
    pattern = re.compile(
        r"^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$"
    )
    return bool(pattern.match(domain))

def generate_zone_id() -> str:
    return "Z" + "".join(random.choices(string.ascii_uppercase + string.digits, k=13))

def allocate_name_servers():
    base = random.randint(1, 2048)
    return [
        f"ns-{base}.awsdns-{random.randint(10, 99)}.net.",
        f"ns-{base+100}.awsdns-{random.randint(10, 99)}.org.",
        f"ns-{base+200}.awsdns-{random.randint(10, 99)}.com.",
        f"ns-{base+300}.awsdns-{random.randint(10, 99)}.co.uk."
    ]

def create_hosted_zone(db: Session, zone_in: HostedZoneCreate, user_id: int) -> HostedZone:
    if not is_valid_domain(zone_in.domain_name):
        raise HTTPException(status_code=400, detail="Invalid domain name format")

    existing_zone = db.query(HostedZone).filter(HostedZone.domain_name == zone_in.domain_name).first()
    if existing_zone:
        raise HTTPException(status_code=400, detail="Hosted zone with this domain name already exists")
    
    zone_id = generate_zone_id()
    name_servers = allocate_name_servers()
    
    try:
        new_zone = HostedZone(
            user_id=user_id,
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
            record_name=zone_in.domain_name,
            record_type="SOA",
            ttl=900,
            value=f"{name_servers[0]} awsdns-hostmaster.amazon.com. 1 7200 900 1209600 86400",
            routing_policy="Simple",
            alias=False
        )
        
        # Automatically insert NS record
        ns_record = DNSRecord(
            hosted_zone_id=zone_id,
            record_name=zone_in.domain_name,
            record_type="NS",
            ttl=172800,
            value="\n".join(name_servers),
            routing_policy="Simple",
            alias=False
        )

        db.add(soa_record)
        db.add(ns_record)
        
        db.commit()
        db.refresh(new_zone)
        return new_zone
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database transaction failed")

def get_hosted_zones(db: Session, user_id: int):
    return db.query(HostedZone).filter(HostedZone.user_id == user_id).all()

def get_hosted_zone(db: Session, id: int, user_id: int):
    zone = db.query(HostedZone).filter(HostedZone.id == id, HostedZone.user_id == user_id).first()
    if not zone:
        raise HTTPException(status_code=404, detail="Hosted zone not found")
    return zone

def update_hosted_zone(db: Session, id: int, zone_update: HostedZoneUpdate, user_id: int):
    zone = get_hosted_zone(db, id, user_id)
    if zone_update.description is not None:
        zone.description = zone_update.description
    db.commit()
    db.refresh(zone)
    return zone

def delete_hosted_zone(db: Session, id: int, user_id: int):
    zone = get_hosted_zone(db, id, user_id)
    db.delete(zone)
    db.commit()
    return True
