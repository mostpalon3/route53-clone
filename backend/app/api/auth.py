from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.dependencies import get_db, get_current_user
from app.core.security import verify_password, create_access_token
from app.models.user import User
from app.schemas.auth import Token, UserResponse, UserLogin
from app.schemas.hosted_zone import APIResponse

router = APIRouter()

@router.post("/login", response_model=APIResponse)
def login_for_access_token(user_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    access_token = create_access_token(subject=user.email)
    
    return APIResponse(
        success=True,
        message="Login successful",
        data={"access_token": access_token, "token_type": "bearer"}
    )

@router.post("/logout", response_model=APIResponse)
def logout():
    return APIResponse(success=True, message="Successfully logged out")

@router.get("/me", response_model=APIResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    user_data = UserResponse.model_validate(current_user)
    return APIResponse(success=True, message="User profile retrieved", data=user_data.model_dump())
