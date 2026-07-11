from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.dns_record import DNSRecord
from app.models.hosted_zone import HostedZone
from app.schemas.dns_record import DNSRecordCreate, DNSRecordUpdate

def get_records_by_zone(db: Session, zone_id_pk: int):
    zone = db.query(HostedZone).filter(HostedZone.id == zone_id_pk).first()
    if not zone:
        raise HTTPException(status_code=404, detail="Hosted zone not found")
    
    records = db.query(DNSRecord).filter(DNSRecord.hosted_zone_id == zone.zone_id).all()
    return records

def create_dns_record(db: Session, zone_id_pk: int, record_in: DNSRecordCreate):
    zone = db.query(HostedZone).filter(HostedZone.id == zone_id_pk).first()
    if not zone:
        raise HTTPException(status_code=404, detail="Hosted zone not found")
    
    new_record = DNSRecord(
        hosted_zone_id=zone.zone_id,
        name=record_in.name,
        type=record_in.type,
        ttl=record_in.ttl,
        value=record_in.value,
        routing_policy=record_in.routing_policy,
        alias=record_in.alias
    )
    db.add(new_record)
    zone.record_count += 1
    db.commit()
    db.refresh(new_record)
    return new_record

def get_dns_record(db: Session, record_id: int):
    record = db.query(DNSRecord).filter(DNSRecord.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="DNS Record not found")
    return record

def update_dns_record(db: Session, record_id: int, record_update: DNSRecordUpdate):
    record = get_dns_record(db, record_id)
    
    # Prevent modifying default SOA/NS types if we wanted to be strict,
    # but the requirement is to prevent *deleting* them. We'll allow updates.

    if record_update.name is not None:
        record.name = record_update.name
    if record_update.type is not None:
        record.type = record_update.type
    if record_update.ttl is not None:
        record.ttl = record_update.ttl
    if record_update.value is not None:
        record.value = record_update.value
    if record_update.routing_policy is not None:
        record.routing_policy = record_update.routing_policy
    if record_update.alias is not None:
        record.alias = record_update.alias

    db.commit()
    db.refresh(record)
    return record

def delete_dns_record(db: Session, record_id: int):
    record = get_dns_record(db, record_id)

    # Prevent deleting default SOA and NS
    if record.type in ["SOA", "NS"]:
        # Check if it's the root default ones (name == zone domain)
        zone = db.query(HostedZone).filter(HostedZone.zone_id == record.hosted_zone_id).first()
        if zone and record.name == zone.domain_name:
            raise HTTPException(status_code=400, detail=f"Cannot delete default {record.type} record")

    zone = db.query(HostedZone).filter(HostedZone.zone_id == record.hosted_zone_id).first()
    if zone and zone.record_count > 0:
        zone.record_count -= 1

    db.delete(record)
    db.commit()
    return True
