from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.dns_record import DNSRecordCreate, DNSRecordUpdate, DNSRecordResponse
from app.schemas.hosted_zone import APIResponse
from app.services import dns_record_service

router = APIRouter()

@router.get("/hosted-zones/{id}/records", response_model=APIResponse)
def list_dns_records(id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    records = dns_record_service.get_records_by_zone(db, id)
    records_data = [DNSRecordResponse.model_validate(r).model_dump() for r in records]
    return APIResponse(success=True, message="DNS Records retrieved", data=records_data)

@router.post("/hosted-zones/{id}/records", response_model=APIResponse)
def create_dns_record(id: int, record_in: DNSRecordCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_record = dns_record_service.create_dns_record(db, id, record_in)
    record_data = DNSRecordResponse.model_validate(new_record).model_dump()
    return APIResponse(success=True, message="DNS Record created successfully", data=record_data)

@router.put("/records/{recordId}", response_model=APIResponse)
def update_dns_record(recordId: int, record_update: DNSRecordUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    updated_record = dns_record_service.update_dns_record(db, recordId, record_update)
    record_data = DNSRecordResponse.model_validate(updated_record).model_dump()
    return APIResponse(success=True, message="DNS Record updated successfully", data=record_data)

@router.delete("/records/{recordId}", response_model=APIResponse)
def delete_dns_record(recordId: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    dns_record_service.delete_dns_record(db, recordId)
    return APIResponse(success=True, message="DNS Record deleted successfully")
