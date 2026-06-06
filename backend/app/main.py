from uuid import uuid4
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from .data import CATEGORIES, PRODUCTS
from .models import AdminLoginRequest, ContactMessage, ContactMessageCreate, Product, Category, SiteContent


app = FastAPI(title="Rashin Catalog API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5174", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

messages: list[ContactMessage] = []
products_store: list[Product] = list(PRODUCTS)
categories_store: list[Category] = list(CATEGORIES)
site_content_store: list[SiteContent] = [
    SiteContent(
        id="site-font-persian",
        key="fontFamilyPersian",
        valueFa="Estedad, Vazirmatn, Tahoma, sans-serif",
        valueEn="Estedad, Vazirmatn, Tahoma, sans-serif",
    )
]


@app.get("/api/categories")
def get_categories():
    return categories_store


@app.get("/api/site-content")
def get_site_content():
    return site_content_store


@app.get("/api/products")
def get_products(search: str | None = None, category: str | None = None, availability: str | None = None):
    result = products_store
    if search:
        term = search.lower()
        result = [item for item in result if term in " ".join([item.productNameFa, item.productNameEn, item.categoryId, *item.tags]).lower()]
    if category:
        result = [item for item in result if item.categoryId == category]
    if availability:
        result = [item for item in result if item.availabilityStatus == availability]
    return result


@app.get("/api/products/{slug}")
def get_product(slug: str):
    for product in products_store:
        if product.slug == slug:
            return product
    raise HTTPException(status_code=404, detail="Product not found")


@app.post("/api/contact")
def create_contact_message(payload: ContactMessageCreate):
    message = ContactMessage(id=str(uuid4()), **payload.model_dump())
    messages.append(message)
    return {"ok": True, "message": message}


@app.post("/api/admin/login")
def admin_login(payload: AdminLoginRequest):
    if payload.usernameOrEmail == "admin@rashin.test" and payload.password == "rashin":
        return {"token": "mock-admin-token", "user": {"id": "admin-1", "displayName": "Rashin Admin"}}
    raise HTTPException(status_code=401, detail="Unauthorized")


@app.get("/api/admin/dashboard")
def admin_dashboard():
    return {
        "totalProducts": len(products_store),
        "totalCategories": len(categories_store),
        "availableProducts": len([item for item in products_store if item.availabilityStatus == "available"]),
        "newMessages": len([item for item in messages if item.status == "new"]),
    }


@app.get("/api/admin/products")
def admin_products():
    return products_store


@app.post("/api/admin/products")
def create_product(product: Product):
    products_store.append(product)
    return product


@app.put("/api/admin/products/{product_id}")
def update_product(product_id: str, product: Product):
    for index, item in enumerate(products_store):
        if item.id == product_id:
            products_store[index] = product
            return product
    raise HTTPException(status_code=404, detail="Product not found")


@app.delete("/api/admin/products/{product_id}")
def delete_product(product_id: str):
    global products_store
    products_store = [item for item in products_store if item.id != product_id]
    return {"ok": True}


@app.get("/api/admin/categories")
def admin_categories():
    return categories_store


@app.post("/api/admin/categories")
def create_category(category: Category):
    categories_store.append(category)
    return category


@app.put("/api/admin/categories/{category_id}")
def update_category(category_id: str, category: Category):
    for index, item in enumerate(categories_store):
        if item.id == category_id:
            categories_store[index] = category
            return category
    raise HTTPException(status_code=404, detail="Category not found")


@app.delete("/api/admin/categories/{category_id}")
def delete_category(category_id: str):
    global categories_store
    categories_store = [item for item in categories_store if item.id != category_id]
    return {"ok": True}


@app.get("/api/admin/messages")
def admin_messages():
    return messages


@app.get("/api/admin/site-content")
def admin_site_content():
    return site_content_store


@app.put("/api/admin/site-content/{content_id}")
def update_site_content(content_id: str, payload: SiteContent):
    for index, item in enumerate(site_content_store):
        if item.id == content_id:
            site_content_store[index] = payload
            return payload
    raise HTTPException(status_code=404, detail="Site content setting not found")
