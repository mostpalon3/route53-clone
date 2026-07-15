from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from app.api import auth, hosted_zones, dns_records
from app.database import Base, engine, SessionLocal
from app.services.auth_service import seed_default_admin

# Setup basic logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Route53 Clone API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={"success": False, "message": "An internal server error occurred", "data": None},
    )

# Routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(hosted_zones.router, prefix="/api/hosted-zones", tags=["hosted_zones"])
app.include_router(dns_records.router, prefix="/api", tags=["dns_records"])

@app.on_event("startup")
def on_startup():
    db = SessionLocal()
    try:
        seed_default_admin(db)
    except Exception as e:
        logger.error(f"Failed to seed admin user: {e}")
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "Route53 Clone API is running"}
