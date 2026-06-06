# Bilingual Rashin Website Design Implementation

## Public Pages

- `P-01: HomePage` route: `/fa`, `/en`
- `P-02: ProductsPage` route: `/fa/products`, `/en/products`
- `P-03: ProductDetailPage` route: `/fa/products/:slug`, `/en/products/:slug`
- `P-04: CategoriesPage` route: `/fa/categories`, `/en/categories`
- `P-05: AboutPage` route: `/fa/about`, `/en/about`
- `P-06: ContactPage` route: `/fa/contact`, `/en/contact`
- `P-07: OffersPage` route: `/fa/offers`, `/en/offers`
- `P-08: BrandsPage` route: `/fa/brands`, `/en/brands`

## Admin Pages

- `P-09: AdminLoginPage` route: `/admin/login`
- `P-10: AdminDashboardPage` route: `/admin/dashboard`
- `P-11: ProductManagementPage` route: `/admin/products`
- `P-12: CategoryManagementPage` route: `/admin/categories`

## Components

The React UI exports reusable components:

- `Button`
- `Navbar`
- `Footer`
- `LanguageSwitcher`
- `HeroSection`
- `SectionHeader`
- `ProductCard`
- `ProductGrid`
- `ProductSearchBar`
- `ProductFilters`
- `CategoryCard`
- `CategoryGrid`
- `PriceBadge`
- `AvailabilityBadge`
- `ContactCTA`
- `FormInput`
- `FormTextarea`
- `SelectInput`
- `Modal`
- `EmptyState`
- `LoadingState`
- `ErrorState`
- `AdminSidebar`
- `AdminTopbar`
- `AdminTable`
- `AdminForm`
- `ImageUploader`

## Data Models

Backend models are defined in `backend/app/models.py`:

- `Product`
- `Category`
- `ContactMessage`
- `AdminUser`
- `SiteContent`
- `MediaAsset`

The current frontend uses mock data from `frontend/src/data/catalog.js`, and the backend provides FastAPI endpoints ready for integration.

## API Endpoints

Public:

- `GET /api/categories`
- `GET /api/products`
- `GET /api/products?search=`
- `GET /api/products?category=`
- `GET /api/products?availability=`
- `GET /api/products/{slug}`
- `POST /api/contact`

Admin:

- `POST /api/admin/login`
- `GET /api/admin/dashboard`
- `GET /api/admin/products`
- `POST /api/admin/products`
- `PUT /api/admin/products/{id}`
- `DELETE /api/admin/products/{id}`
- `GET /api/admin/categories`
- `POST /api/admin/categories`
- `PUT /api/admin/categories/{id}`
- `DELETE /api/admin/categories/{id}`
- `GET /api/admin/messages`
- `GET /api/site-content`
- `GET /api/admin/site-content`
- `PUT /api/admin/site-content/{id}`

## Font Configuration

The frontend uses `Estedad, Vazirmatn, Tahoma, sans-serif` for Persian text.
The backend exposes a `SiteContent` setting with key `fontFamilyPersian` so a future CMS/admin settings page can change the Persian font stack without changing the data model.

## Deliberately Not Implemented

- Shopping cart
- Checkout
- Online payment
- Customer accounts
- Delivery tracking
- Coupon system

The product, category, and admin structures are prepared so these capabilities can be added later.
