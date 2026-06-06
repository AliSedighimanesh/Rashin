import { CheckCircle, Globe2, ImagePlus, Loader2, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { availabilityCopy, categories, localizedCategory, navCopy, pageCopy } from '../data/catalog.js';

export function Button({ children, variant = 'primary', loading = false, disabled = false, className = '', ...props }) {
  return (
    <button className={`button button-${variant} ${className}`} disabled={disabled || loading} {...props}>
      {loading ? <Loader2 size={18} aria-hidden="true" /> : null}
      {children}
    </button>
  );
}

export function PaletteSwitcher() {
  const [palette, setPalette] = useState(localStorage.getItem('rashin-palette') || 'forest');

  useEffect(() => {
    document.body.dataset.palette = palette;
    localStorage.setItem('rashin-palette', palette);
  }, [palette]);

  return (
    <div className="palette-switcher" aria-label="Theme palette">
      {['forest', 'olive', 'violet'].map((item) => (
        <button
          key={item}
          className={`palette-dot ${palette === item ? 'is-active' : ''}`}
          type="button"
          data-palette-option={item}
          onClick={() => setPalette(item)}
          aria-label={`Theme ${item}`}
        />
      ))}
    </div>
  );
}

export function LanguageSwitcher() {
  const { lang = 'fa' } = useParams();
  const navigate = useNavigate();
  const nextLang = lang === 'fa' ? 'en' : 'fa';

  function switchLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) return;
    const parts = path.split('/').filter(Boolean);
    if (parts[0] === 'fa' || parts[0] === 'en') parts[0] = nextLang;
    else parts.unshift(nextLang);
    navigate(`/${parts.join('/')}`);
  }

  return (
    <button className="lang-button" type="button" onClick={switchLanguage} aria-label="LanguageSwitcher">
      <Globe2 size={16} aria-hidden="true" />
      {lang === 'fa' ? 'EN' : 'FA'}
    </button>
  );
}

export function Navbar() {
  const { lang = 'fa' } = useParams();
  const t = navCopy[lang] || navCopy.fa;
  const links = [
    ['products', `/${lang}/products`, t.products],
    ['categories', `/${lang}/categories`, t.categories],
    ['brands', `/${lang}/brands`, t.brands],
    ['about', `/${lang}/about`, t.about],
    ['contact', `/${lang}/contact`, t.contact]
  ];

  return (
    <header className="navbar" aria-label="Navbar">
      <div className="container nav-inner">
        <NavLink to={`/${lang}`} className="brand">
          <img className="brand-logo" src="/rashin-logo.jpg" alt={lang === 'fa' ? 'لوگوی راشین' : 'Rashin logo'} />
          <span>{lang === 'fa' ? 'راشین' : 'Rashin'}</span>
        </NavLink>
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map(([key, href, label]) => (
            <NavLink key={key} to={href} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <PaletteSwitcher />
          <LanguageSwitcher />
          <NavLink className="button button-primary nav-cta" to={`/${lang}/contact`}>{t.cta}</NavLink>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const { lang = 'fa' } = useParams();
  const t = navCopy[lang] || navCopy.fa;
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <img className="brand-logo" src="/rashin-logo.jpg" alt={lang === 'fa' ? 'لوگوی راشین' : 'Rashin logo'} />
            <span>{lang === 'fa' ? 'راشین' : 'Rashin'}</span>
          </div>
          <p>{lang === 'fa' ? 'کاتالوگ محصولات غذایی راشین با قیمت قابل مشاهده و مسیر تماس مستقیم برای سفارش و همکاری.' : 'Rashin food products catalog with visible prices and direct contact paths for ordering and partnerships.'}</p>
        </div>
        <div>
          <h3>{lang === 'fa' ? 'دسترسی سریع' : 'Quick Links'}</h3>
          <ul>
            <li><NavLink to={`/${lang}/products`}>{t.products}</NavLink></li>
            <li><NavLink to={`/${lang}/categories`}>{t.categories}</NavLink></li>
            <li><NavLink to={`/${lang}/about`}>{t.about}</NavLink></li>
            <li><NavLink to={`/${lang}/contact`}>{t.contact}</NavLink></li>
          </ul>
        </div>
        <div>
          <h3>{t.categories}</h3>
          <ul>{categories.slice(0, 5).map((category) => <li key={category.id}>{localizedCategory(category, lang).name}</li>)}</ul>
        </div>
        <div>
          <h3>{t.contact}</h3>
          <p>sales@rashin-food.test</p>
          <p>{lang === 'fa' ? '۰۲۱-۴۴۰۰-۱۲۳۴' : '+98 21 4400 1234'}</p>
          <p>{lang === 'fa' ? 'تهران، دفتر فروش راشین' : 'Tehran, Rashin sales office'}</p>
        </div>
      </div>
      <div className="container footer-credit">
        {lang === 'fa' ? 'طراحی و ساخت ' : 'Design and development '}
        <a href="https://alisedighimanesh.ir" target="_blank" rel="noreferrer">alisedighimanesh.ir</a>
      </div>
    </footer>
  );
}

export function SectionHeader({ title, text, center = false }) {
  return (
    <div className={`section-header ${center ? 'center' : ''}`}>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export function PageHero({ title, intro }) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
        {intro ? <p>{intro}</p> : null}
      </div>
    </section>
  );
}

export function PriceBadge({ product, lang = 'fa' }) {
  const formattedPrice = Number(product.price).toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US');
  return (
    <span className="price-badge" aria-label={`price ${product.price}`}>
      <span>{formattedPrice}</span> <small>{lang === 'fa' ? 'تومان' : 'Toman'}</small>
    </span>
  );
}

export function AvailabilityBadge({ status, lang }) {
  const label = availabilityCopy[lang]?.[status] || status;
  return <span className={`availability ${status}`}>{label}</span>;
}

export function ProductVisual({ product, large = false }) {
  return (
    <div className={`product-visual ${large ? 'large' : ''}`} role="img" aria-label={product.name}>
      <span className="product-visual-glow" />
      <span className="product-visual-disc" />
      <span className="product-visual-line" />
    </div>
  );
}

export function ProductCard({ product, lang, loading = false }) {
  if (loading) return <LoadingState text={pageCopy[lang].loadingProducts} />;

  return (
    <article className={`card product-card ${product.availabilityStatus === 'unavailable' ? 'unavailable' : ''}`}>
      <ProductVisual product={product} />
      <div className="product-body">
        <div className="product-title-row">
          <NavLink className="detail-pill" to={`/${lang}/products/${product.slug}`}>
            {pageCopy[lang].viewDetails}
          </NavLink>
          <h3>{product.name}</h3>
        </div>
        <p>{product.shortDescription}</p>
        <div className="product-foot">
          <AvailabilityBadge status={product.availabilityStatus} lang={lang} />
          <div className="price-unit">
            <PriceBadge product={product} lang={lang} />
            <small>{product.unit}</small>
          </div>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products, lang, loading }) {
  if (loading) return <LoadingState text={pageCopy[lang].loadingProducts} />;
  if (!products.length) return <EmptyState title={pageCopy[lang].noProducts} />;
  return <div className="grid product-grid-4">{products.map((product) => <ProductCard key={product.id} product={product} lang={lang} />)}</div>;
}

export function ProductSearchBar({ value, onChange, lang }) {
  return (
    <label className="field" htmlFor="product-search">
      <span>{lang === 'fa' ? 'جستجوی محصول' : 'Product Search'}</span>
      <span className="search-wrap">
        <Search size={18} aria-hidden="true" />
        <input
          id="product-search"
          className="input"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={pageCopy[lang].searchPlaceholder}
          aria-label="Search input"
        />
      </span>
    </label>
  );
}

export function ProductFilters({ lang, category, availability, onCategory, onAvailability }) {
  return (
    <div aria-label="Filter controls">
      <div className="filters">
        <button className={`chip ${category === 'all' ? 'active' : ''}`} onClick={() => onCategory('all')}>{pageCopy[lang].allCategories}</button>
        {categories.map((item) => (
          <button key={item.id} className={`chip ${category === item.id ? 'active' : ''}`} onClick={() => onCategory(item.id)}>
            {localizedCategory(item, lang).name}
          </button>
        ))}
      </div>
      <div className="filters">
        {['all', 'available', 'limited', 'unavailable'].map((status) => (
          <button key={status} className={`chip ${availability === status ? 'active' : ''}`} onClick={() => onAvailability(status)}>
            {status === 'all' ? pageCopy[lang].allAvailability : availabilityCopy[lang][status]}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CategoryCard({ category, lang }) {
  const item = localizedCategory(category, lang);
  return (
    <article className="card category-card">
      <div className="category-icon">{category.icon}</div>
      <div className="category-body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <p><strong>{item.productCount}</strong> {lang === 'fa' ? 'محصول' : 'products'}</p>
        <NavLink className="button button-outline" to={`/${lang}/products?category=${category.id}`}>{pageCopy[lang].viewProducts}</NavLink>
      </div>
    </article>
  );
}

export function CategoryGrid({ lang, items = categories }) {
  return <div className="grid grid-4">{items.map((category) => <CategoryCard key={category.id} category={category} lang={lang} />)}</div>;
}

export function ContactCTA({ lang, title, text }) {
  const t = pageCopy[lang].home;
  return (
    <section className="section cta-section">
      <div className="container contact-cta">
        <h2>{title || t.ctaTitle}</h2>
        <p>{text || t.ctaText}</p>
        <NavLink className="button button-primary" to={`/${lang}/contact`}>{pageCopy[lang].contactSales}</NavLink>
      </div>
    </section>
  );
}

export function FormInput({ id, label, error, ...props }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <input id={id} className="input" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error ? <span id={`${id}-error`} className="field-error">{error}</span> : null}
    </label>
  );
}

export function FormTextarea({ id, label, error, ...props }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <textarea id={id} className="textarea" aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error ? <span id={`${id}-error`} className="field-error">{error}</span> : null}
    </label>
  );
}

export function SelectInput({ id, label, children, ...props }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <select id={id} className="select" {...props}>{children}</select>
    </label>
  );
}

export function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title || 'Modal'}>
      <div className="modal">
        <div className="product-meta">
          <h2>{title}</h2>
          <Button variant="ghost" onClick={onClose} aria-label="Close modal"><X size={20} /></Button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function EmptyState({ title }) {
  return <div className="state-box empty">{title}</div>;
}

export function LoadingState({ text }) {
  return <div className="state-box loading"><Loader2 size={22} aria-hidden="true" /> {text}</div>;
}

export function ErrorState({ text }) {
  return <div className="state-box error">{text}</div>;
}

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="brand footer-brand"><img className="brand-logo" src="/rashin-logo.jpg" alt="Rashin logo" />Rashin Admin</div>
      <nav aria-label="Admin navigation">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/categories">Categories</NavLink>
        <NavLink to="/fa">Public Website</NavLink>
      </nav>
    </aside>
  );
}

export function AdminTopbar({ title }) {
  return (
    <header className="admin-topbar">
      <h1>{title}</h1>
      <span className="availability available"><CheckCircle size={16} /> Admin ready</span>
    </header>
  );
}

export function AdminTable({ columns, rows, actions }) {
  return (
    <table className="admin-table">
      <thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}{actions ? <th>Actions</th> : null}</tr></thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id || row.slug}>
            {columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}
            {actions ? <td>{actions(row)}</td> : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function AdminForm({ children, onSubmit }) {
  return <form className="grid grid-2 card admin-form" onSubmit={onSubmit}>{children}</form>;
}

export function ImageUploader({ label = 'Image upload' }) {
  return (
    <div className="state-box" aria-label="ImageUploader">
      <ImagePlus size={28} aria-hidden="true" />
      <p>{label}</p>
      <input type="file" aria-label={label} />
    </div>
  );
}
