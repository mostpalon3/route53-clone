from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.hosted_zone import HostedZoneCreate, HostedZoneUpdate, HostedZoneResponse, APIResponse
from app.services import hosted_zone_service

router = APIRouter()

@router.get("", response_model=APIResponse)
def list_hosted_zones(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    zones = hosted_zone_service.get_hosted_zones(db, current_user.id)
    zones_data = [HostedZoneResponse.model_validate(z).model_dump() for z in zones]
    return APIResponse(success=True, message="Hosted zones retrieved", data=zones_data)

@router.post("", response_model=APIResponse)
def create_hosted_zone(zone_in: HostedZoneCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_zone = hosted_zone_service.create_hosted_zone(db, zone_in, current_user.id)
    zone_data = HostedZoneResponse.model_validate(new_zone).model_dump()
    return APIResponse(success=True, message="Hosted zone created successfully", data=zone_data)

@router.get("/{id}", response_model=APIResponse)
def get_hosted_zone(id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    zone = hosted_zone_service.get_hosted_zone(db, id, current_user.id)
    zone_data = HostedZoneResponse.model_validate(zone).model_dump()
    return APIResponse(success=True, message="Hosted zone retrieved", data=zone_data)

@router.put("/{id}", response_model=APIResponse)
def update_hosted_zone(id: int, zone_update: HostedZoneUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    updated_zone = hosted_zone_service.update_hosted_zone(db, id, zone_update, current_user.id)
    zone_data = HostedZoneResponse.model_validate(updated_zone).model_dump()
    return APIResponse(success=True, message="Hosted zone updated successfully", data=zone_data)

@router.delete("/{id}", response_model=APIResponse)
def delete_hosted_zone(id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    hosted_zone_service.delete_hosted_zone(db, id, current_user.id)
    return APIResponse(success=True, message="Hosted zone deleted successfully")
