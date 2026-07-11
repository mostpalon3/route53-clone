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
        record_name=record_in.record_name,
        record_type=record_in.record_type,
        ttl=record_in.ttl,
        value=record_in.value,
        routing_policy=record_in.routing_policy,
        set_identifier=record_in.set_identifier,
        alias=record_in.alias,
        health_check_id=record_in.health_check_id,
        evaluate_target_health=record_in.evaluate_target_health
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

    if record_update.record_name is not None:
        record.record_name = record_update.record_name
    if record_update.record_type is not None:
        record.record_type = record_update.record_type
    if record_update.ttl is not None:
        record.ttl = record_update.ttl
    if record_update.value is not None:
        record.value = record_update.value
    if record_update.routing_policy is not None:
        record.routing_policy = record_update.routing_policy
    if record_update.set_identifier is not None:
        record.set_identifier = record_update.set_identifier
    if record_update.alias is not None:
        record.alias = record_update.alias
    if record_update.health_check_id is not None:
        record.health_check_id = record_update.health_check_id
    if record_update.evaluate_target_health is not None:
        record.evaluate_target_health = record_update.evaluate_target_health

    db.commit()
    db.refresh(record)
    return record

def delete_dns_record(db: Session, record_id: int):
    record = get_dns_record(db, record_id)

    # Prevent deleting default SOA and NS
    if record.record_type in ["SOA", "NS"]:
        zone = db.query(HostedZone).filter(HostedZone.zone_id == record.hosted_zone_id).first()
        if zone and record.record_name == zone.domain_name:
            raise HTTPException(status_code=400, detail=f"Cannot delete default {record.record_type} record")

    zone = db.query(HostedZone).filter(HostedZone.zone_id == record.hosted_zone_id).first()
    if zone and zone.record_count > 0:
        zone.record_count -= 1

    db.delete(record)
    db.commit()
    return True
