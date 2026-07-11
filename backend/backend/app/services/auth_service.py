from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import get_password_hash

def seed_default_admin(db: Session):
    admin_email = "admin@example.com"
    user = db.query(User).filter(User.email == admin_email).first()
    if not user:
        new_user = User(
            username="admin",
            email=admin_email,
            hashed_password=get_password_hash("password123")
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
