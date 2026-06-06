from .models import AvailabilityStatus, Category, Product


CATEGORIES = [
    Category(id="dairy", categoryNameFa="لبنیات", categoryNameEn="Dairy", slug="dairy", imageUrl="/media/dairy.jpg", descriptionFa="شیر، ماست و دوغ", descriptionEn="Milk, yogurt, and doogh", displayOrder=1),
    Category(id="beverages", categoryNameFa="نوشیدنی‌ها", categoryNameEn="Beverages", slug="beverages", imageUrl="/media/beverages.jpg", descriptionFa="نوشیدنی‌های طبیعی و سنتی", descriptionEn="Natural and traditional beverages", displayOrder=2),
    Category(id="nuts-dried-fruits", categoryNameFa="خشکبار", categoryNameEn="Nuts & Dried Fruits", slug="nuts-dried-fruits", imageUrl="/media/nuts.jpg", descriptionFa="خشکبار و میوه خشک", descriptionEn="Nuts and dried fruits", displayOrder=3),
    Category(id="canned-ready", categoryNameFa="کنسرو و مواد آماده", categoryNameEn="Canned & Ready Foods", slug="canned-ready-foods", imageUrl="/media/canned.jpg", descriptionFa="مواد آماده و کنسروی", descriptionEn="Ready and canned foods", displayOrder=4),
    Category(id="sauces-condiments", categoryNameFa="چاشنی و سس", categoryNameEn="Sauces & Condiments", slug="sauces-condiments", imageUrl="/media/sauces.jpg", descriptionFa="سس و چاشنی", descriptionEn="Sauces and condiments", displayOrder=5),
]


PRODUCTS = [
    Product(id="p-001", productNameFa="شیر کم‌چرب", productNameEn="Low-Fat Milk", slug="low-fat-milk", categoryId="dairy", price=48000, unit="1 liter", imageUrl="/media/low-fat-milk.jpg", shortDescriptionFa="شیر کم‌چرب روزانه", shortDescriptionEn="Daily low-fat milk", fullDescriptionFa="شیر کم‌چرب با کیفیت پایدار.", fullDescriptionEn="Low-fat milk with reliable quality.", availabilityStatus=AvailabilityStatus.available, featured=True, tags=["milk", "dairy", "شیر"]),
    Product(id="p-002", productNameFa="ماست پرچرب", productNameEn="Full-Fat Yogurt", slug="full-fat-yogurt", categoryId="dairy", price=75000, unit="900 g", imageUrl="/media/yogurt.jpg", shortDescriptionFa="ماست پرچرب کرمی", shortDescriptionEn="Creamy full-fat yogurt", fullDescriptionFa="ماست پرچرب مناسب فروشگاه.", fullDescriptionEn="Full-fat yogurt for stores.", availabilityStatus=AvailabilityStatus.available, featured=True, tags=["yogurt", "dairy", "ماست"]),
    Product(id="p-003", productNameFa="آبمیوه پرتقال طبیعی", productNameEn="Natural Orange Juice", slug="natural-orange-juice", categoryId="beverages", price=95000, unit="1 liter", imageUrl="/media/orange-juice.jpg", shortDescriptionFa="آبمیوه پرتقال طبیعی", shortDescriptionEn="Natural orange juice", fullDescriptionFa="آبمیوه با موجودی محدود.", fullDescriptionEn="Orange juice with limited stock.", availabilityStatus=AvailabilityStatus.limited, featured=True, tags=["juice", "orange", "آبمیوه"]),
]
