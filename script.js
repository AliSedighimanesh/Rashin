const faDigits = new Intl.NumberFormat("fa-IR");
const enDigits = new Intl.NumberFormat("en-US");

const state = {
  lang: localStorage.getItem("rashin-home-lang") || "fa",
  palette: localStorage.getItem("rashin-home-palette") || "forest",
  heroIndex: 0,
  selectedBrand: null,
  expandedCategories: new Set(),
};

const translations = {
  fa: {
    brand: "راشین",
    navCategories: "دسته‌بندی‌ها",
    navProducts: "محصولات",
    navBrands: "برندها",
    navAbout: "درباره ما",
    navContact: "تماس",
    salesCta: "تماس با فروش",
    heroTitle: "راشین؛ پخش و تأمین محصولات غذایی با کیفیت",
    heroSubtitle:
      "محصولات غذایی متنوع را با دسته‌بندی دقیق، قیمت قابل مشاهده و اطلاعات کامل بررسی کنید و برای سفارش یا همکاری با ما تماس بگیرید.",
    viewProducts: "مشاهده محصولات",
    contactSales: "تماس با فروش",
    metaOne: "قیمت شفاف",
    metaTwo: "تنوع دسته‌بندی",
    metaThree: "استعلام سریع",
    categoryTitle: "دسته‌بندی محصولات",
    categoryText: "همه گروه‌های اصلی کاتالوگ راشین را سریع مرور کنید.",
    productsTitle: "محصولات منتخب هر دسته",
    brandsTitle: "برند محصولات",
    brandsText: "برندها و تأمین‌کنندگان را ببینید و محصولات هر برند را دنبال کنید.",
    whyTitle: "چرا راشین؟",
    whyText:
      "راشین برای معرفی دقیق محصولات، شفافیت قیمت، پاسخ‌گویی سریع و همکاری پایدار با فروشگاه‌ها و همکاران تجاری طراحی شده است.",
    trustTitle: "کاتالوگ قیمت‌دار، بدون خرید آنلاین",
    trustText: "این نسخه برای نمایش محصول، قیمت و مسیر تماس ساخته شده و فعلا سبد خرید یا پرداخت آنلاین ندارد.",
    ctaTitle: "برای سفارش یا همکاری آماده گفت‌وگو هستیم",
    ctaText: "تیم فروش راشین برای استعلام قیمت، موجودی و همکاری فروشگاهی پاسخ‌گوی شماست.",
    emailSales: "ارسال ایمیل به فروش",
    callSales: "تماس تلفنی",
    footerText: "راشین؛ کاتالوگ محصولات غذایی برای پخش و همکاری",
    more: "مشاهده بیشتر",
    less: "نمایش کمتر",
    productsCount: "محصول",
    available: "موجود",
    limited: "محدود",
    brandResult: (name) => `محصولات برند ${name} برای نمایش کامل در صفحه محصولات قابل فیلتر شدن هستند.`,
  },
  en: {
    brand: "Rashin",
    navCategories: "Categories",
    navProducts: "Products",
    navBrands: "Brands",
    navAbout: "About",
    navContact: "Contact",
    salesCta: "Contact Sales",
    heroTitle: "Rashin Food Distribution and Product Catalog",
    heroSubtitle:
      "Browse categorized food products with visible prices and detailed information, then contact us for ordering or partnership inquiries.",
    viewProducts: "View Products",
    contactSales: "Contact Sales",
    metaOne: "Visible prices",
    metaTwo: "Category variety",
    metaThree: "Fast inquiry",
    categoryTitle: "Product Categories",
    categoryText: "Browse every main Rashin catalog group at a glance.",
    productsTitle: "Selected Products by Category",
    brandsTitle: "Product Brands",
    brandsText: "Browse brands and suppliers, then follow products by brand.",
    whyTitle: "Why Rashin?",
    whyText:
      "Rashin is designed for accurate product display, transparent pricing, fast sales response, and stable cooperation with stores and trade partners.",
    trustTitle: "Priced catalog, no online checkout",
    trustText: "This version shows products, prices, and contact paths. It does not include cart or online payment yet.",
    ctaTitle: "Ready to discuss orders or partnerships",
    ctaText: "Rashin sales team can help with price inquiry, availability checks, and store partnerships.",
    emailSales: "Email Sales",
    callSales: "Call Sales",
    footerText: "Rashin; food product catalog for distribution and partnerships",
    more: "View More",
    less: "Show Less",
    productsCount: "products",
    available: "Available",
    limited: "Limited",
    brandResult: (name) => `${name} products can be filtered in the full products page.`,
  },
};

const categories = [
  category("dairy", "D", "لبنیات", "Dairy", "شیر، ماست، دوغ و فرآورده‌های لبنی", "Milk, yogurt, doogh and dairy products", 18),
  category("beverages", "B", "نوشیدنی‌ها", "Beverages", "آبمیوه، دوغ و نوشیدنی‌های سالم", "Juices, doogh and healthy drinks", 22),
  category("nuts", "N", "خشکبار", "Nuts & Dried Fruits", "پسته، کشمش، بادام و میوه خشک", "Pistachios, raisins, almonds and dried fruit", 16),
  category("canned", "C", "کنسرو و مواد آماده", "Canned & Ready Foods", "کنسرو، رب و غذاهای آماده", "Canned foods, paste and ready meals", 20),
  category("protein", "P", "مواد پروتئینی", "Protein Products", "محصولات پروتئینی بسته‌بندی‌شده", "Packaged protein products", 14),
  category("sauces", "S", "چاشنی و سس", "Sauces & Condiments", "سس، خیارشور، ادویه و چاشنی", "Sauces, pickles, spices and condiments", 24),
  category("grains", "G", "غلات و حبوبات", "Grains & Legumes", "برنج، لوبیا، عدس و غلات مصرفی", "Rice, beans, lentils and grains", 19),
  category("snacks", "K", "تنقلات", "Snacks", "محصولات سبک، فروشگاهی و آماده مصرف", "Light, retail-ready and ready-to-eat products", 28),
];

const products = [
  item("low-fat-milk", "dairy", "Dairy Fresh", "شیر کم‌چرب", "Low-Fat Milk", "۱ لیتر", "1 liter", 48000, "available"),
  item("full-fat-yogurt", "dairy", "Rashin Dairy", "ماست پرچرب", "Full-Fat Yogurt", "۹۰۰ گرم", "900 g", 75000, "available"),
  item("cream-cheese", "dairy", "Rashin Dairy", "پنیر خامه‌ای", "Cream Cheese", "۴۰۰ گرم", "400 g", 89000, "limited"),
  item("traditional-doogh", "dairy", "Dairy Fresh", "دوغ سنتی", "Traditional Doogh", "۱.۵ لیتر", "1.5 liter", 38000, "available"),
  item("butter-pack", "dairy", "Rashin Dairy", "کره پاستوریزه", "Pasteurized Butter", "۱۰۰ گرم", "100 g", 64000, "available"),
  item("kefir-drink", "dairy", "Dairy Fresh", "نوشیدنی کفیر", "Kefir Drink", "۱ لیتر", "1 liter", 58000, "limited"),
  item("orange-juice", "beverages", "Day Fresh", "آبمیوه پرتقال طبیعی", "Natural Orange Juice", "۱ لیتر", "1 liter", 95000, "limited"),
  item("apple-juice", "beverages", "Day Fresh", "آبمیوه سیب", "Apple Juice", "۱ لیتر", "1 liter", 87000, "available"),
  item("mint-doogh", "beverages", "Rashin Dairy", "دوغ نعنا", "Mint Doogh", "۱ لیتر", "1 liter", 42000, "available"),
  item("mineral-water", "beverages", "Spring Pack", "آب معدنی", "Mineral Water", "بسته ۶ عددی", "6-pack", 64000, "available"),
  item("sour-cherry-juice", "beverages", "Day Fresh", "آبمیوه آلبالو", "Sour Cherry Juice", "۱ لیتر", "1 liter", 98000, "limited"),
  item("lemon-malt", "beverages", "Spring Pack", "ماءالشعیر لیمویی", "Lemon Malt Drink", "۱ لیتر", "1 liter", 69000, "available"),
  item("pistachio", "nuts", "Aria Nuts", "پسته ممتاز", "Premium Pistachios", "۱ کیلوگرم", "1 kg", 620000, "available"),
  item("golden-raisin", "nuts", "Aria Nuts", "کشمش پلویی", "Golden Raisins", "۱ کیلوگرم", "1 kg", 185000, "available"),
  item("almond", "nuts", "Aria Nuts", "بادام درختی", "Tree Almonds", "۵۰۰ گرم", "500 g", 310000, "limited"),
  item("dried-fig", "nuts", "Rashin Select", "انجیر خشک", "Dried Figs", "۵۰۰ گرم", "500 g", 260000, "available"),
  item("walnut", "nuts", "Aria Nuts", "مغز گردو", "Walnut Kernels", "۵۰۰ گرم", "500 g", 340000, "available"),
  item("dried-apricot", "nuts", "Rashin Select", "برگه زردآلو", "Dried Apricots", "۵۰۰ گرم", "500 g", 225000, "available"),
  item("canned-tuna", "canned", "MehrCan", "کنسرو تن ماهی", "Canned Tuna", "۱۸۰ گرم", "180 g", 89000, "available"),
  item("tomato-paste", "canned", "MehrCan", "رب گوجه فرنگی", "Tomato Paste", "۸۰۰ گرم", "800 g", 54000, "available"),
  item("beans-can", "canned", "MehrCan", "کنسرو لوبیا", "Canned Beans", "۴۲۰ گرم", "420 g", 67000, "available"),
  item("ready-soup", "canned", "Rashin Select", "سوپ آماده", "Ready Soup", "۴۸۰ گرم", "480 g", 72000, "limited"),
  item("canned-corn", "canned", "MehrCan", "کنسرو ذرت", "Canned Corn", "۴۲۰ گرم", "420 g", 76000, "available"),
  item("ready-ash", "canned", "Rashin Select", "آش آماده", "Ready Ash Soup", "۵۰۰ گرم", "500 g", 84000, "limited"),
];

const brands = [
  brand("Rashin Dairy", "لبنیات راشین", "Rashin Dairy", "لبنیات و نوشیدنی", "Dairy and drinks"),
  brand("Day Fresh", "دی فرش", "Day Fresh", "آبمیوه طبیعی", "Natural juices"),
  brand("Aria Nuts", "آریا خشکبار", "Aria Nuts", "خشکبار و آجیل", "Nuts and dried fruit"),
  brand("MehrCan", "مهرکن", "MehrCan", "کنسرو و آماده", "Canned and ready foods"),
  brand("Rashin Select", "راشین سلکت", "Rashin Select", "محصولات منتخب", "Selected products"),
  brand("Spring Pack", "اسپرینگ پک", "Spring Pack", "نوشیدنی بسته‌ای", "Packaged beverages"),
  brand("Sabzineh", "سبزینه", "Sabzineh", "حبوبات و غلات", "Grains and legumes"),
  brand("Bazaar Fresh", "بازار فرش", "Bazaar Fresh", "کالای فروشگاهی", "Retail products"),
];

const heroSlides = [
  {
    titleFa: "کاتالوگ قیمت محصولات غذایی",
    titleEn: "Priced Food Product Catalog",
    textFa: "قیمت، واحد بسته‌بندی و موجودی محصولات را سریع ببینید و برای سفارش با فروش تماس بگیرید.",
    textEn: "Review price, package unit and availability, then contact sales for orders.",
    statsFa: ["۸ دسته اصلی", "۱۰۰+ محصول", "استعلام سریع"],
    statsEn: ["8 main groups", "100+ products", "Fast inquiry"],
    mode: "prices",
  },
  {
    titleFa: "پخش منظم برای فروشگاه‌ها",
    titleEn: "Reliable Distribution for Stores",
    textFa: "تمرکز روی تأمین پایدار، شفافیت قیمت و پاسخ‌گویی سریع برای همکاری‌های فروشگاهی.",
    textEn: "Focused on stable supply, transparent pricing and fast response for store partnerships.",
    statsFa: ["موجودی روشن", "قیمت قابل مشاهده", "همکاری پایدار"],
    statsEn: ["Clear stock", "Visible prices", "Stable partners"],
    mode: "supply",
  },
  {
    titleFa: "برندها و دسته‌ها در یک نگاه",
    titleEn: "Brands and Categories at a Glance",
    textFa: "از دسته‌بندی یا برند شروع کنید و سریع‌تر به محصول مورد نظر برسید.",
    textEn: "Start from a category or brand and reach the right product faster.",
    statsFa: ["فیلتر برند", "فیلتر دسته", "بدون پرداخت آنلاین"],
    statsEn: ["Brand filter", "Category filter", "No checkout"],
    mode: "brands",
  },
];

function category(id, icon, nameFa, nameEn, descFa, descEn, count) {
  return { id, icon, nameFa, nameEn, descFa, descEn, count };
}

function brand(id, nameFa, nameEn, descFa, descEn) {
  return { id, nameFa, nameEn, descFa, descEn };
}

function item(id, categoryId, brandId, productNameFa, productNameEn, unitFa, unitEn, price, availabilityStatus) {
  return {
    id,
    categoryId,
    brandId,
    productNameFa,
    productNameEn,
    unitFa,
    unitEn,
    price,
    availabilityStatus,
    shortDescriptionFa: "محصول غذایی مناسب برای عرضه فروشگاهی و همکاری پخش.",
    shortDescriptionEn: "Food product suitable for retail supply and distribution partnerships.",
  };
}

function t(key) {
  return translations[state.lang][key];
}

function localizedName(entity, prefix) {
  return state.lang === "fa" ? entity[`${prefix}Fa`] : entity[`${prefix}En`];
}

function formatPrice(price) {
  if (state.lang === "fa") return `${faDigits.format(price)} تومان`;
  return `${enDigits.format(price)} Toman`;
}

function setLanguage(nextLang) {
  state.lang = nextLang;
  localStorage.setItem("rashin-home-lang", nextLang);
  render();
}

function setPalette(nextPalette) {
  state.palette = nextPalette;
  localStorage.setItem("rashin-home-palette", nextPalette);
  document.body.dataset.palette = nextPalette;
  document.querySelectorAll("[data-palette-option]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.paletteOption === nextPalette);
  });
}

function renderHero() {
  const track = document.getElementById("heroSliderTrack");
  track.innerHTML = heroSlides.map((slide) => heroSlideMarkup(slide)).join("");
  track.style.transform = `translateX(${state.lang === "fa" ? state.heroIndex * 100 : state.heroIndex * -100}%)`;

  const dots = document.getElementById("heroDots");
  dots.innerHTML = heroSlides
    .map((_, index) => `<button type="button" class="${index === state.heroIndex ? "is-active" : ""}" data-hero-dot="${index}" aria-label="Hero slide ${index + 1}"></button>`)
    .join("");
}

function heroSlideMarkup(slide) {
  const title = state.lang === "fa" ? slide.titleFa : slide.titleEn;
  const text = state.lang === "fa" ? slide.textFa : slide.textEn;
  const stats = state.lang === "fa" ? slide.statsFa : slide.statsEn;
  const sheetProducts = products.slice(0, 3);

  if (slide.mode === "prices") {
    return `
      <article class="hero-slide">
        <div class="catalog-card">
          <div class="catalog-copy">
            <div>
              <h2>${title}</h2>
              <p>${text}</p>
            </div>
            <div class="catalog-stats">${stats.map((stat) => `<span>${stat}</span>`).join("")}</div>
          </div>
          <ul class="price-sheet">
            ${sheetProducts
              .map(
                (product) => `
                  <li>
                    <span class="product-thumb">${localizedName(product, "productName").slice(0, 1)}</span>
                    <span>
                      <strong>${localizedName(product, "productName")}</strong>
                      <small>${state.lang === "fa" ? product.unitFa : product.unitEn}</small>
                    </span>
                    <b>${formatPrice(product.price)}</b>
                  </li>
                `
              )
              .join("")}
          </ul>
        </div>
      </article>
    `;
  }

  return `
    <article class="hero-slide">
      <div class="catalog-card">
        <div class="catalog-copy">
          <div>
            <h2>${title}</h2>
            <p>${text}</p>
          </div>
          <div class="catalog-stats">${stats.map((stat) => `<span>${stat}</span>`).join("")}</div>
        </div>
        <div class="supply-grid">
          ${stats
            .map(
              (stat, index) => `
                <div class="supply-card">
                  <span class="supply-number">${state.lang === "fa" ? faDigits.format(index + 1) : index + 1}</span>
                  <strong>${stat}</strong>
                  <span>${state.lang === "fa" ? "آماده برای توسعه در صفحه محصولات" : "Ready to expand in the products page"}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    </article>
  `;
}

function renderCategories() {
  const track = document.getElementById("categoryTrack");
  track.innerHTML = categories
    .map(
      (categoryItem) => `
        <a class="category-card" href="#products-${categoryItem.id}">
          <span class="category-icon">${categoryItem.icon}</span>
          <strong>${localizedName(categoryItem, "name")}</strong>
          <span>${localizedName(categoryItem, "desc")}</span>
          <span>${state.lang === "fa" ? faDigits.format(categoryItem.count) : categoryItem.count} ${t("productsCount")}</span>
        </a>
      `
    )
    .join("");
}

function renderProductSections() {
  const stack = document.getElementById("categorySections");
  const selectedCategories = categories.slice(0, 4);
  stack.innerHTML = selectedCategories
    .map((categoryItem) => {
      const allCategoryProducts = products.filter((product) => product.categoryId === categoryItem.id);
      const isExpanded = state.expandedCategories.has(categoryItem.id);
      const categoryProducts = isExpanded ? allCategoryProducts : allCategoryProducts.slice(0, 4);
      return `
        <article class="product-shelf" id="products-${categoryItem.id}">
          <div class="shelf-head">
            <div class="shelf-title">
              <span class="category-icon">${categoryItem.icon}</span>
              <h3>${localizedName(categoryItem, "name")}</h3>
            </div>
            <a class="more-link" href="#products-${categoryItem.id}" data-category-more="${categoryItem.id}">${isExpanded ? t("less") : t("more")}</a>
          </div>
          <div class="product-grid">
            ${categoryProducts.map(productCard).join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-visual" aria-label="${localizedName(product, "productName")}"></div>
      <h4>${localizedName(product, "productName")}</h4>
      <p>${state.lang === "fa" ? product.shortDescriptionFa : product.shortDescriptionEn}</p>
      <div class="product-foot">
        <span class="price">${formatPrice(product.price)}</span>
        <span class="badge">${t(product.availabilityStatus)}</span>
      </div>
    </article>
  `;
}

function renderBrands() {
  const track = document.getElementById("brandTrack");
  track.innerHTML = brands
    .map((brandItem) => {
      const productCount = products.filter((product) => product.brandId === brandItem.id).length || 4;
      const brandName = localizedName(brandItem, "name");
      return `
        <button class="brand-card" type="button" data-brand="${brandItem.id}">
          <span class="brand-mark-small">${brandName.slice(0, 1)}</span>
          <strong>${brandName}</strong>
          <span>${localizedName(brandItem, "desc")}</span>
          <span>${state.lang === "fa" ? faDigits.format(productCount) : productCount} ${t("productsCount")}</span>
        </button>
      `;
    })
    .join("");

  const result = document.getElementById("brandResult");
  if (state.selectedBrand) {
    const brandItem = brands.find((itemBrand) => itemBrand.id === state.selectedBrand);
    result.textContent = t("brandResult")(localizedName(brandItem, "name"));
  } else {
    result.textContent = "";
  }
}

function renderText() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "fa" ? "rtl" : "ltr";
  document.title = state.lang === "fa" ? "راشین | کاتالوگ محصولات غذایی" : "Rashin | Food Product Catalog";

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (typeof translations[state.lang][key] === "string") node.textContent = translations[state.lang][key];
  });

  document.getElementById("languageToggle").textContent = state.lang === "fa" ? "EN" : "FA";
}

function render() {
  renderText();
  setPalette(state.palette);
  renderHero();
  renderCategories();
  renderProductSections();
  renderBrands();
}

function moveHero(direction) {
  state.heroIndex = (state.heroIndex + direction + heroSlides.length) % heroSlides.length;
  renderHero();
}

document.getElementById("languageToggle").addEventListener("click", () => {
  setLanguage(state.lang === "fa" ? "en" : "fa");
});

document.getElementById("heroPrev").addEventListener("click", () => moveHero(-1));
document.getElementById("heroNext").addEventListener("click", () => moveHero(1));

document.addEventListener("click", (event) => {
  const dot = event.target.closest("[data-hero-dot]");
  if (dot) {
    state.heroIndex = Number(dot.dataset.heroDot);
    renderHero();
  }

  const palette = event.target.closest("[data-palette-option]");
  if (palette) setPalette(palette.dataset.paletteOption);

  const scrollButton = event.target.closest("[data-scroll-target]");
  if (scrollButton) {
    const target = document.getElementById(scrollButton.dataset.scrollTarget);
    const direction = Number(scrollButton.dataset.scrollDir);
    const rtlFactor = state.lang === "fa" ? -1 : 1;
    target.scrollBy({ left: direction * rtlFactor * 520, behavior: "smooth" });
  }

  const brandButton = event.target.closest("[data-brand]");
  if (brandButton) {
    state.selectedBrand = brandButton.dataset.brand;
    renderBrands();
    document.getElementById("brandResult").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  const moreButton = event.target.closest("[data-category-more]");
  if (moreButton) {
    event.preventDefault();
    const categoryId = moreButton.dataset.categoryMore;
    if (state.expandedCategories.has(categoryId)) {
      state.expandedCategories.delete(categoryId);
    } else {
      state.expandedCategories.add(categoryId);
    }
    renderProductSections();
    document.getElementById(`products-${categoryId}`).scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

let heroTimer = window.setInterval(() => moveHero(1), 6500);

document.querySelector(".hero-visual").addEventListener("mouseenter", () => window.clearInterval(heroTimer));
document.querySelector(".hero-visual").addEventListener("mouseleave", () => {
  heroTimer = window.setInterval(() => moveHero(1), 6500);
});

render();
