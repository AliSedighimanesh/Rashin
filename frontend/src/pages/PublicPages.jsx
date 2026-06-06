import { useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  AvailabilityBadge,
  CategoryGrid,
  ContactCTA,
  Footer,
  FormInput,
  FormTextarea,
  Navbar,
  PageHero,
  PriceBadge,
  ProductFilters,
  ProductGrid,
  ProductSearchBar,
  ProductVisual,
  SectionHeader,
  SelectInput
} from '../components/ui.jsx';
import { brands, categories, localizedBrand, localizedCategory, localizedProduct, pageCopy, products, values } from '../data/catalog.js';

function PublicShell({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function useLang() {
  const { lang = 'fa' } = useParams();
  return lang === 'en' ? 'en' : 'fa';
}

function getLocalizedProducts(lang) {
  return products.map((product) => localizedProduct(product, lang));
}

function formatPrice(price, lang) {
  return lang === 'fa' ? `${Number(price).toLocaleString('fa-IR')} تومان` : `${Number(price).toLocaleString('en-US')} Toman`;
}

function HeroCatalogSlider({ lang }) {
  const [index, setIndex] = useState(0);
  const slides = [
    {
      title: lang === 'fa' ? 'کاتالوگ قیمت محصولات غذایی' : 'Priced Food Product Catalog',
      text: lang === 'fa' ? 'قیمت، واحد بسته‌بندی و موجودی محصولات را سریع ببینید و برای سفارش با فروش تماس بگیرید.' : 'Review price, package unit and availability, then contact sales for orders.',
      stats: lang === 'fa' ? ['۸ دسته اصلی', '۱۰۰+ محصول', 'استعلام سریع'] : ['8 main groups', '100+ products', 'Fast inquiry'],
      mode: 'prices'
    },
    {
      title: lang === 'fa' ? 'پخش منظم برای فروشگاه‌ها' : 'Reliable Distribution for Stores',
      text: lang === 'fa' ? 'تمرکز روی تأمین پایدار، شفافیت قیمت و پاسخ‌گویی سریع برای همکاری‌های فروشگاهی.' : 'Focused on stable supply, transparent pricing and fast response for store partnerships.',
      stats: lang === 'fa' ? ['موجودی روشن', 'قیمت قابل مشاهده', 'همکاری پایدار'] : ['Clear stock', 'Visible prices', 'Stable partners'],
      mode: 'supply'
    },
    {
      title: lang === 'fa' ? 'برندها و دسته‌ها در یک نگاه' : 'Brands and Categories at a Glance',
      text: lang === 'fa' ? 'از دسته‌بندی یا برند شروع کنید و سریع‌تر به محصول مورد نظر برسید.' : 'Start from a category or brand and reach the right product faster.',
      stats: lang === 'fa' ? ['فیلتر برند', 'فیلتر دسته', 'بدون پرداخت آنلاین'] : ['Brand filter', 'Category filter', 'No checkout'],
      mode: 'supply'
    }
  ];

  function move(direction) {
    setIndex((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <div className="home-hero-visual" aria-label="Rashin catalog slider">
      <div className="home-hero-slider">
        <div className="home-hero-track" style={{ transform: `translateX(${lang === 'fa' ? index * 100 : index * -100}%)` }}>
          {slides.map((slide) => (
            <article className="home-hero-slide" key={slide.title}>
              <div className="catalog-card">
                <div className="catalog-copy">
                  <div>
                    <h2>{slide.title}</h2>
                    <p>{slide.text}</p>
                  </div>
                  <div className="catalog-stats">{slide.stats.map((stat) => <span key={stat}>{stat}</span>)}</div>
                </div>
                {slide.mode === 'prices' ? (
                  <ul className="price-sheet">
                    {getLocalizedProducts(lang).slice(0, 3).map((product) => (
                      <li key={product.id}>
                        <span className="product-thumb">{product.name.slice(0, 1)}</span>
                        <span><strong>{product.name}</strong><small>{product.unit}</small></span>
                        <b>{formatPrice(product.price, lang)}</b>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="supply-grid">
                    {slide.stats.map((stat, statIndex) => (
                      <div className="supply-card" key={stat}>
                        <span className="supply-number">{lang === 'fa' ? Number(statIndex + 1).toLocaleString('fa-IR') : statIndex + 1}</span>
                        <strong>{stat}</strong>
                        <span>{lang === 'fa' ? 'آماده برای توسعه در صفحه محصولات' : 'Ready to expand in the products page'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="slider-controls hero-controls">
        <button className="icon-button" type="button" onClick={() => move(-1)} aria-label="Previous hero slide">‹</button>
        <div className="hero-dots">
          {slides.map((slide, dotIndex) => <button key={slide.title} className={dotIndex === index ? 'is-active' : ''} type="button" onClick={() => setIndex(dotIndex)} aria-label={`Hero slide ${dotIndex + 1}`} />)}
        </div>
        <button className="icon-button" type="button" onClick={() => move(1)} aria-label="Next hero slide">›</button>
      </div>
    </div>
  );
}

function HorizontalCategorySlider({ lang }) {
  const track = useRef(null);
  const t = pageCopy[lang].home;
  const scroll = (direction) => track.current?.scrollBy({ left: direction * (lang === 'fa' ? -520 : 520), behavior: 'smooth' });

  return (
    <section className="section categories-section" id="categories">
      <div className="container">
        <div className="section-row">
          <SectionHeader title={t.categoriesTitle} text={t.categoriesText} />
          <div className="slider-controls">
            <button className="icon-button" type="button" onClick={() => scroll(-1)} aria-label="Previous categories">‹</button>
            <button className="icon-button" type="button" onClick={() => scroll(1)} aria-label="Next categories">›</button>
          </div>
        </div>
        <div className="slider-window" ref={track} tabIndex={0} aria-label="Product categories">
          <div className="category-track">
            {categories.map((category) => {
              const item = localizedCategory(category, lang);
              return (
                <Link className="home-category-card" key={category.id} to={`/${lang}/products?category=${category.id}`}>
                  <span className="category-icon">{category.icon}</span>
                  <strong>{item.name}</strong>
                  <span>{item.description}</span>
                  <span>{lang === 'fa' ? item.productCount.toLocaleString('fa-IR') : item.productCount} {lang === 'fa' ? 'محصول' : 'products'}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryProductSections({ lang }) {
  const t = pageCopy[lang].home;

  return (
    <section className="section product-sections" id="products">
      <div className="container">
        <div className="section-row"><SectionHeader title={t.featuredTitle} /></div>
        <div className="category-product-stack">
          {categories.slice(0, 4).map((category) => {
            const item = localizedCategory(category, lang);
            const visible = getLocalizedProducts(lang).filter((product) => product.categoryId === category.id).slice(0, 4);
            return (
              <article className="product-shelf" id={`products-${category.id}`} key={category.id}>
                <div className="shelf-head">
                  <div className="shelf-title"><span className="category-icon">{category.icon}</span><h3>{item.name}</h3></div>
                  <Link className="more-link" to={`/${lang}/products?category=${category.id}`}>{t.more}</Link>
                </div>
                <ProductGrid products={visible} lang={lang} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BrandSlider({ lang }) {
  const track = useRef(null);
  const [selected, setSelected] = useState(null);
  const t = pageCopy[lang].home;
  const scroll = (direction) => track.current?.scrollBy({ left: direction * (lang === 'fa' ? -520 : 520), behavior: 'smooth' });

  return (
    <section className="section brands-section" id="brands">
      <div className="container">
        <div className="section-row">
          <SectionHeader title={t.brandsTitle} text={t.brandsText} />
          <div className="slider-controls">
            <button className="icon-button" type="button" onClick={() => scroll(-1)} aria-label="Previous brands">‹</button>
            <button className="icon-button" type="button" onClick={() => scroll(1)} aria-label="Next brands">›</button>
          </div>
        </div>
        <div className="slider-window" ref={track} tabIndex={0} aria-label="Product brands">
          <div className="brand-track">
            {brands.map((brand) => {
              const item = localizedBrand(brand, lang);
              return (
                <button className="brand-card" type="button" key={brand.id} onClick={() => setSelected(item)}>
                  <span className="brand-mark-small">{item.name.slice(0, 1)}</span>
                  <strong>{item.name}</strong>
                  <span>{item.description}</span>
                  <span>{lang === 'fa' ? item.productCount.toLocaleString('fa-IR') : item.productCount} {lang === 'fa' ? 'محصول' : 'products'}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="brand-result" aria-live="polite">
          {selected ? (lang === 'fa' ? `محصولات برند ${selected.name} در صفحه محصولات قابل فیلتر شدن هستند.` : `${selected.name} products can be filtered in the products page.`) : ''}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const lang = useLang();
  const t = pageCopy[lang];
  return (
    <PublicShell>
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1>{t.home.title}</h1>
              <p>{t.home.subtitle}</p>
              <div className="hero-actions">
                <Link className="button button-primary" to={`/${lang}/products`}>{t.viewProducts}</Link>
                <Link className="button button-outline" to={`/${lang}/contact`}>{t.contactSales}</Link>
              </div>
              <div className="hero-meta">
                <span>{lang === 'fa' ? 'قیمت شفاف' : 'Visible prices'}</span>
                <span>{lang === 'fa' ? 'تنوع دسته‌بندی' : 'Category variety'}</span>
                <span>{lang === 'fa' ? 'استعلام سریع' : 'Fast inquiry'}</span>
              </div>
            </div>
            <HeroCatalogSlider lang={lang} />
          </div>
        </section>
        <HorizontalCategorySlider lang={lang} />
        <CategoryProductSections lang={lang} />
        <BrandSlider lang={lang} />
        <section className="section about-section">
          <div className="container about-grid">
            <div>
              <SectionHeader title={t.home.whyTitle} text={lang === 'fa' ? 'راشین برای معرفی دقیق محصولات، شفافیت قیمت، پاسخ‌گویی سریع و همکاری پایدار با فروشگاه‌ها و همکاران تجاری طراحی شده است.' : 'Rashin is designed for accurate product display, transparent pricing, fast sales response, and stable cooperation with stores and trade partners.'} />
            </div>
            <div className="trust-panel">
              <strong>{t.home.priceTitle}</strong>
              <span>{lang === 'fa' ? 'این نسخه برای نمایش محصول، قیمت و مسیر تماس ساخته شده و فعلاً سبد خرید یا پرداخت آنلاین ندارد.' : 'This version shows products, prices, and contact paths. It does not include cart or online payment yet.'}</span>
            </div>
          </div>
        </section>
        <ContactCTA lang={lang} />
      </main>
    </PublicShell>
  );
}

export function ProductsPage() {
  const lang = useLang();
  const t = pageCopy[lang];
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(params.get('category') || 'all');
  const [availability, setAvailability] = useState('all');
  const [sort, setSort] = useState('newest');

  const items = useMemo(() => {
    let list = getLocalizedProducts(lang);
    const q = search.trim().toLowerCase();
    if (q) list = list.filter((product) => [product.name, product.categoryName, ...product.tags].join(' ').toLowerCase().includes(q));
    if (category !== 'all') list = list.filter((product) => product.categoryId === category);
    if (availability !== 'all') list = list.filter((product) => product.availabilityStatus === availability);
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'popular') list = [...list].sort((a, b) => Number(b.popular) - Number(a.popular));
    return list;
  }, [lang, search, category, availability, sort]);

  function updateCategory(next) {
    setCategory(next);
    setParams(next === 'all' ? {} : { category: next });
  }

  return (
    <PublicShell>
      <main>
        <PageHero title={t.products.title} intro={t.products.intro} />
        <section className="section">
          <div className="container">
            <div className="catalog-toolbar">
              <ProductSearchBar value={search} onChange={setSearch} lang={lang} />
              <SelectInput id="sort" label={lang === 'fa' ? 'مرتب‌سازی' : 'Sort'} value={sort} onChange={(event) => setSort(event.target.value)}>
                <option value="newest">{t.sortNewest}</option>
                <option value="low">{t.sortLow}</option>
                <option value="high">{t.sortHigh}</option>
                <option value="popular">{t.sortPopular}</option>
              </SelectInput>
            </div>
            <ProductFilters lang={lang} category={category} availability={availability} onCategory={updateCategory} onAvailability={setAvailability} />
            <ProductGrid products={items} lang={lang} />
          </div>
        </section>
        <ContactCTA lang={lang} />
      </main>
    </PublicShell>
  );
}

export function ProductDetailPage() {
  const lang = useLang();
  const { slug } = useParams();
  const product = localizedProduct(products.find((item) => item.slug === slug) || products[0], lang);
  const related = getLocalizedProducts(lang).filter((item) => item.categoryId === product.categoryId && item.id !== product.id).slice(0, 4);

  return (
    <PublicShell>
      <main>
        <section className="section">
          <div className="container grid grid-2 detail-grid">
            <div className="card detail-visual"><ProductVisual product={product} large /></div>
            <div className="detail-copy">
              <span className="chip">{product.categoryName}</span>
              <h1>{product.name}</h1>
              <p>{product.fullDescription}</p>
              <div className="product-meta">
                <PriceBadge product={product} lang={lang} />
                <AvailabilityBadge status={product.availabilityStatus} lang={lang} />
              </div>
              <div className="inline-actions">
                <Link className="button button-primary" to={`/${lang}/contact`}>{pageCopy[lang].contactToOrder}</Link>
                <Link className="button button-outline" to={`/${lang}/contact`}>{pageCopy[lang].checkAvailability}</Link>
                <Link className="button button-outline" to={`/${lang}/contact`}>{pageCopy[lang].partnershipInquiry}</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <SectionHeader title={lang === 'fa' ? 'مشخصات محصول' : 'Product Specifications'} />
            <div className="grid grid-4">
              {[
                [lang === 'fa' ? 'اندازه بسته' : 'Package Size', product.packageSize],
                [lang === 'fa' ? 'واحد' : 'Unit', product.unit],
                [lang === 'fa' ? 'مبدأ' : 'Origin', product.origin],
                [lang === 'fa' ? 'شرایط نگهداری' : 'Storage', product.storageCondition]
              ].map(([label, value]) => <div className="card spec-card" key={label}><strong>{label}</strong><p>{value}</p></div>)}
            </div>
          </div>
        </section>
        <section className="section"><div className="container"><SectionHeader title={lang === 'fa' ? 'محصولات مرتبط' : 'Related Products'} /><ProductGrid products={related} lang={lang} /></div></section>
      </main>
    </PublicShell>
  );
}

export function CategoriesPage() {
  const lang = useLang();
  const t = pageCopy[lang].categories;
  return <PublicShell><main><PageHero title={t.title} intro={t.intro} /><section className="section"><div className="container"><CategoryGrid lang={lang} /></div></section></main></PublicShell>;
}

export function AboutPage() {
  const lang = useLang();
  const t = pageCopy[lang].about;
  return (
    <PublicShell>
      <main>
        <PageHero title={t.title} intro={t.intro} />
        <section className="section">
          <div className="container grid grid-2">
            <div className="card content-card"><SectionHeader title={lang === 'fa' ? 'مأموریت و چشم‌انداز' : 'Mission and Vision'} /><p><strong>{lang === 'fa' ? 'مأموریت:' : 'Mission:'}</strong> {t.mission}</p><p><strong>{lang === 'fa' ? 'چشم‌انداز:' : 'Vision:'}</strong> {t.vision}</p></div>
            <div className="trust-panel"><strong>{lang === 'fa' ? 'استاندارد کیفیت و همکاری' : 'Quality and Partnership Standards'}</strong><span>{lang === 'fa' ? 'تمرکز راشین روی عرضه دقیق، اطلاعات شفاف و همکاری پایدار با فروشگاه‌هاست.' : 'Rashin focuses on accurate display, clear information, and stable store partnerships.'}</span></div>
          </div>
        </section>
        <section className="section"><div className="container"><SectionHeader title={lang === 'fa' ? 'ارزش‌های راشین' : 'Rashin Values'} /><div className="grid grid-5">{values[lang].map((value) => <div className="card value-card" key={value}><strong>{value}</strong></div>)}</div></div></section>
        <ContactCTA lang={lang} />
      </main>
    </PublicShell>
  );
}

export function ContactPage() {
  const lang = useLang();
  const t = pageCopy[lang].contact;
  const [state, setState] = useState('default');
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', email: '', companyName: '', subject: '', message: '' });

  function setField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  }

  function validate() {
    const next = {};
    if (!form.fullName.trim()) next.fullName = lang === 'fa' ? 'نام و نام خانوادگی الزامی است.' : 'Full name is required.';
    if (!form.phoneNumber.trim()) next.phoneNumber = lang === 'fa' ? 'شماره تماس الزامی است.' : 'Phone number is required.';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = lang === 'fa' ? 'ایمیل معتبر وارد کنید.' : 'Enter a valid email.';
    if (!form.subject.trim()) next.subject = lang === 'fa' ? 'موضوع پیام الزامی است.' : 'Subject is required.';
    if (!form.message.trim()) next.message = lang === 'fa' ? 'متن پیام نمی‌تواند خالی باشد.' : 'Message cannot be empty.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(event) {
    event.preventDefault();
    if (!validate()) return;
    setState('loading');
    setTimeout(() => setState('success'), 650);
  }

  return (
    <PublicShell>
      <main>
        <PageHero title={t.title} intro={t.intro} />
        <section className="section">
          <div className="container grid grid-2">
            <form className="card form-card" onSubmit={submit}>
              <FormInput id="fullName" label={lang === 'fa' ? 'نام و نام خانوادگی' : 'Full Name'} value={form.fullName} onChange={(e) => setField('fullName', e.target.value)} error={errors.fullName} />
              <FormInput id="phoneNumber" label={lang === 'fa' ? 'شماره تماس' : 'Phone Number'} value={form.phoneNumber} onChange={(e) => setField('phoneNumber', e.target.value)} error={errors.phoneNumber} />
              <FormInput id="email" label={lang === 'fa' ? 'ایمیل' : 'Email'} value={form.email} onChange={(e) => setField('email', e.target.value)} error={errors.email} />
              <FormInput id="companyName" label={lang === 'fa' ? 'نام شرکت (اختیاری)' : 'Company Name Optional'} value={form.companyName} onChange={(e) => setField('companyName', e.target.value)} />
              <FormInput id="subject" label={lang === 'fa' ? 'موضوع پیام' : 'Subject'} value={form.subject} onChange={(e) => setField('subject', e.target.value)} error={errors.subject} />
              <FormTextarea id="message" label={lang === 'fa' ? 'متن پیام' : 'Message'} value={form.message} onChange={(e) => setField('message', e.target.value)} error={errors.message} />
              {state === 'success' ? <div className="availability available">{t.success}</div> : null}
              <button className="button button-primary" type="submit">{state === 'loading' ? (lang === 'fa' ? 'در حال ارسال...' : 'Sending...') : (lang === 'fa' ? 'ارسال پیام' : 'Send Message')}</button>
            </form>
            <div className="grid">
              <div className="card content-card"><h2>{lang === 'fa' ? 'اطلاعات تماس' : 'Contact Information'}</h2><p>sales@rashin-food.test</p><p>{lang === 'fa' ? '۰۲۱-۴۴۰۰-۱۲۳۴' : '+98 21 4400 1234'}</p></div>
              <div className="card content-card"><h2>{lang === 'fa' ? 'استعلام فروش' : 'Sales Inquiry'}</h2><p>{lang === 'fa' ? 'برای سفارش عمده، همکاری فروشگاهی یا بررسی موجودی با تیم فروش تماس بگیرید.' : 'For wholesale orders, retail partnerships, or stock checks, contact sales.'}</p></div>
              <div className="state-box">{lang === 'fa' ? 'جایگاه نقشه دفتر راشین' : 'Rashin office map placeholder'}</div>
            </div>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}

export function OffersPage() {
  const lang = useLang();
  const offerProducts = getLocalizedProducts(lang).filter((product) => product.featured || product.availabilityStatus === 'limited');
  return <PublicShell><PageHero title={lang === 'fa' ? 'پیشنهادهای ویژه' : 'Special Offers'} intro={lang === 'fa' ? 'محصولات برجسته یا دارای موجودی محدود؛ برای سفارش با فروش تماس بگیرید.' : 'Highlighted or limited-stock products; contact sales for ordering.'} /><section className="section"><div className="container"><ProductGrid products={offerProducts} lang={lang} /></div></section></PublicShell>;
}

export function BrandsPage() {
  const lang = useLang();
  return (
    <PublicShell>
      <PageHero title={lang === 'fa' ? 'برندها و تأمین‌کنندگان' : 'Brands & Suppliers'} intro={lang === 'fa' ? 'برندها و تأمین‌کنندگان کاتالوگ راشین را مرور کنید.' : 'Browse brands and suppliers in the Rashin catalog.'} />
      <section className="section">
        <div className="container grid grid-4">
          {brands.map((brand) => {
            const item = localizedBrand(brand, lang);
            return <div className="card brand-page-card" key={brand.id}><span className="brand-mark-small">{item.name.slice(0, 1)}</span><h3>{item.name}</h3><p>{item.description}</p><Link className="button button-outline" to={`/${lang}/products`}>{pageCopy[lang].viewProducts}</Link></div>;
          })}
        </div>
      </section>
    </PublicShell>
  );
}
