from datetime import datetime
from enum import Enum
from pydantic import BaseModel, EmailStr, Field


class AvailabilityStatus(str, Enum):
    available = "available"
    unavailable = "unavailable"
    limited = "limited"


class Product(BaseModel):
    id: str
    productNameFa: str
    productNameEn: str
    slug: str
    categoryId: str
    price: int
    currency: str = "تومان"
    unit: str
    imageUrl: str
    gallery: list[str] = Field(default_factory=list)
    shortDescriptionFa: str
    shortDescriptionEn: str
    fullDescriptionFa: str
    fullDescriptionEn: str
    availabilityStatus: AvailabilityStatus
    featured: bool = False
    tags: list[str] = Field(default_factory=list)
    seoTitleFa: str | None = None
    seoTitleEn: str | None = None
    seoDescriptionFa: str | None = None
    seoDescriptionEn: str | None = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)


class Category(BaseModel):
    id: str
    categoryNameFa: str
    categoryNameEn: str
    slug: str
    imageUrl: str
    descriptionFa: str
    descriptionEn: str
    displayOrder: int
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)


class ContactMessage(BaseModel):
    id: str
    fullName: str
    phoneNumber: str
    email: EmailStr | None = None
    companyName: str | None = None
    subject: str
    message: str
    status: str = "new"
    createdAt: datetime = Field(default_factory=datetime.utcnow)


class ContactMessageCreate(BaseModel):
    fullName: str
    phoneNumber: str
    email: EmailStr | None = None
    companyName: str | None = None
    subject: str
    message: str


class AdminUser(BaseModel):
    id: str
    usernameOrEmail: str
    displayName: str
    role: str = "admin"


class SiteContent(BaseModel):
    id: str
    key: str
    valueFa: str
    valueEn: str
    updatedAt: datetime = Field(default_factory=datetime.utcnow)


class MediaAsset(BaseModel):
    id: str
    url: str
    altFa: str
    altEn: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)


class AdminLoginRequest(BaseModel):
    usernameOrEmail: str
    password: str
