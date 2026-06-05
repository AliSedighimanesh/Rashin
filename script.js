const content = {
  fa: {
    brand: 'راشین',
    products: 'محصولات',
    categories: 'دسته‌بندی‌ها',
    about: 'درباره راشین',
    contact: 'تماس',
    sales: 'تماس با فروش',
    heroTitle: 'راشین؛ پخش و تأمین محصولات غذایی با کیفیت',
    heroSubtitle: 'محصولات غذایی متنوع را با دسته‌بندی دقیق، قیمت قابل مشاهده و اطلاعات کامل بررسی کنید و برای سفارش یا همکاری با ما تماس بگیرید.',
    viewProducts: 'مشاهده محصولات',
    contactSales: 'تماس با فروش',
    catalog: 'کاتالوگ مواد غذایی',
    pricedCatalog: 'کاتالوگ قیمت‌دار',
    noCheckout: 'بدون خرید آنلاین؛ تماس مستقیم برای سفارش و همکاری',
    categoryTitle: 'دسته‌بندی‌های پرکاربرد',
    categoryText: 'گروه‌های اصلی محصولات غذایی راشین برای مرور سریع کاتالوگ.',
    featuredTitle: 'محصولات ویژه راشین',
    featuredText: 'نمونه‌ای از محصولات با قیمت قابل مشاهده. برای سفارش، با فروش تماس بگیرید.',
    whyTitle: 'چرا راشین؟',
    whyText: 'راشین برای معرفی دقیق محصولات، شفافیت قیمت، پاسخ‌گویی سریع و همکاری پایدار با فروشگاه‌ها و همکاران تجاری طراحی شده است.',
    priceVisible: 'قیمت قابل مشاهده',
    priceVisibleText: 'این صفحه فروشگاه آنلاین نیست؛ قیمت‌ها برای تصمیم‌گیری سریع‌تر نمایش داده می‌شوند.',
    ctaTitle: 'برای سفارش یا همکاری آماده گفت‌وگو هستیم',
    ctaText: 'تیم فروش راشین برای استعلام قیمت، موجودی و همکاری فروشگاهی پاسخ‌گوی شماست.',
    emailSales: 'ارسال ایمیل به فروش',
    chips: ['لبنیات', 'نوشیدنی‌ها', 'خشکبار', 'کنسرو و مواد آماده', 'چاشنی و سس'],
    categoriesData: [['🥛', 'لبنیات', 'شیر، ماست و دوغ'], ['🍊', 'نوشیدنی‌ها', 'آبمیوه و نوشیدنی سنتی'], ['🥜', 'خشکبار', 'پسته و کشمش']],
    productsData: [['🥛', 'شیر کم‌چرب', '۴۸٬۰۰۰ تومان'], ['🍊', 'آبمیوه پرتقال طبیعی', '۹۵٬۰۰۰ تومان'], ['🥜', 'پسته ممتاز', '۶۲۰٬۰۰۰ تومان']]
  },
  en: {
    brand: 'Rashin',
    products: 'Products',
    categories: 'Categories',
    about: 'About',
    contact: 'Contact',
    sales: 'Contact Sales',
    heroTitle: 'Rashin Food Distribution and Product Catalog',
    heroSubtitle: 'Browse categorized food products with visible prices and detailed information, then contact us for ordering or partnership inquiries.',
    viewProducts: 'View Products',
    contactSales: 'Contact Sales',
    catalog: 'Food Catalog',
    pricedCatalog: 'Price-visible Catalog',
    noCheckout: 'No online checkout; direct contact for orders and partnerships',
    categoryTitle: 'Popular Categories',
    categoryText: 'Main Rashin food product groups for quick catalog browsing.',
    featuredTitle: 'Featured Rashin Products',
    featuredText: 'A sample of visible-price products. Contact sales for ordering.',
    whyTitle: 'Why Rashin?',
    whyText: 'Rashin is designed for precise product presentation, transparent pricing, fast response, and sustainable partnerships.',
    priceVisible: 'Visible Prices',
    priceVisibleText: 'This page is not an online shop; prices are shown for faster decisions.',
    ctaTitle: 'Ready for orders or partnerships',
    ctaText: 'Rashin sales team can help with price inquiries, stock checks, and retail partnerships.',
    emailSales: 'Email Sales',
    chips: ['Dairy', 'Beverages', 'Nuts', 'Canned Foods', 'Sauces'],
    categoriesData: [['🥛', 'Dairy', 'Milk, yogurt, doogh'], ['🍊', 'Beverages', 'Juice and traditional drinks'], ['🥜', 'Nuts', 'Pistachios and raisins']],
    productsData: [['🥛', 'Low-Fat Milk', '48,000 Toman'], ['🍊', 'Natural Orange Juice', '95,000 Toman'], ['🥜', 'Premium Pistachios', '620,000 Toman']]
  }
};

let lang = 'fa';

function render() {
  const t = content[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  document.getElementById('languageToggle').textContent = lang === 'fa' ? 'EN' : 'FA';
  document.querySelectorAll('[data-i18n]').forEach((node) => {
    node.textContent = t[node.dataset.i18n];
  });
  document.getElementById('categoryChips').innerHTML = t.chips.map((chip) => `<span class="chip">${chip}</span>`).join('');
  document.getElementById('categoryGrid').innerHTML = t.categoriesData.map(([icon, title, text]) => `
    <article class="card"><div class="visual">${icon}</div><div class="card-body"><h3>${title}</h3><p>${text}</p></div></article>
  `).join('');
  document.getElementById('productGrid').innerHTML = t.productsData.map(([icon, title, price]) => `
    <article class="card"><div class="visual">${icon}</div><div class="card-body"><h3>${title}</h3><p class="price">${price}</p></div></article>
  `).join('');
}

document.getElementById('languageToggle').addEventListener('click', () => {
  lang = lang === 'fa' ? 'en' : 'fa';
  render();
});

render();
