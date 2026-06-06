import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AdminForm,
  AdminSidebar,
  AdminTable,
  AdminTopbar,
  Button,
  FormInput,
  FormTextarea,
  ImageUploader,
  Modal,
  SelectInput
} from '../components/ui.jsx';
import { adminSummary, categories, localizedCategory, products } from '../data/catalog.js';

function AdminShell({ title, children }) {
  return (
    <div className="admin-shell">
      <AdminSidebar />
      <main className="admin-main">
        <AdminTopbar title={title} />
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [state, setState] = useState('default');
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });

  function submit(event) {
    event.preventDefault();
    setState('loading');
    setTimeout(() => {
      if (form.usernameOrEmail === 'admin@rashin.test' && form.password === 'rashin') {
        navigate('/admin/dashboard');
      } else {
        setState('error');
      }
    }, 650);
  }

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <form className="card grid" style={{ width: 'min(100% - 32px, 440px)', padding: 28 }} onSubmit={submit}>
        <h1>ورود به پنل مدیریت راشین</h1>
        <FormInput id="usernameOrEmail" label="Username or Email" value={form.usernameOrEmail} onChange={(e) => setForm({ ...form, usernameOrEmail: e.target.value })} />
        <FormInput id="password" label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {state === 'error' ? <div className="availability unavailable">اطلاعات ورود صحیح نیست. لطفاً دوباره بررسی کنید.</div> : null}
        <Button loading={state === 'loading'}>Login</Button>
        <small>Prototype credentials: admin@rashin.test / rashin</small>
      </form>
    </div>
  );
}

export function AdminDashboardPage() {
  const cards = [
    ['Total Products', adminSummary.totalProducts],
    ['Total Categories', adminSummary.totalCategories],
    ['Available Products', adminSummary.availableProducts],
    ['New Messages', adminSummary.newMessages]
  ];

  return (
    <AdminShell title="AdminDashboardPage">
      <div className="grid grid-4">
        {cards.map(([label, value]) => <div className="card" style={{ padding: 24 }} key={label}><h2>{value}</h2><p>{label}</p></div>)}
      </div>
      <div className="grid grid-2" style={{ marginTop: 24 }}>
        <div>
          <h2>Recent Products</h2>
          <AdminTable columns={[{ key: 'productNameEn', label: 'Product' }, { key: 'price', label: 'Price' }, { key: 'availabilityStatus', label: 'Status' }]} rows={products.slice(0, 5)} />
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h2>Recent Messages</h2>
          {['Retail partnership inquiry', 'Stock check for dairy', 'Wholesale pistachio price'].map((message) => <p key={message}>{message}</p>)}
          <h2>Quick Actions</h2>
          <div className="inline-actions">
            <Button>Create product</Button>
            <Button variant="outline">Create category</Button>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

export function ProductManagementPage() {
  const [items, setItems] = useState(products);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('default');

  function save(event) {
    event.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setModalOpen(false);
    }, 600);
  }

  function remove(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <AdminShell title="ProductManagementPage">
      <div className="product-meta" style={{ marginBottom: 20 }}>
        <h2>Manage Products</h2>
        <Button onClick={() => setModalOpen(true)}>Create product</Button>
      </div>
      {status === 'success' ? <div className="availability available">Saved successfully</div> : null}
      <AdminTable
        columns={[
          { key: 'productNameFa', label: 'Persian Name' },
          { key: 'productNameEn', label: 'English Name' },
          { key: 'categoryId', label: 'Category' },
          { key: 'price', label: 'Price' },
          { key: 'availabilityStatus', label: 'Availability' },
          { key: 'featured', label: 'Featured', render: (row) => row.featured ? 'Yes' : 'No' }
        ]}
        rows={items}
        actions={(row) => (
          <div className="inline-actions" style={{ marginTop: 0 }}>
            <Button variant="outline" onClick={() => setModalOpen(true)}>Edit</Button>
            <Button variant="ghost">Publish</Button>
            <Button variant="danger" onClick={() => remove(row.id)}>Delete</Button>
          </div>
        )}
      />
      <Modal open={modalOpen} title="Product form" onClose={() => setModalOpen(false)}>
        <AdminForm onSubmit={save}>
          <FormInput id="productNameFa" label="productNameFa" />
          <FormInput id="productNameEn" label="productNameEn" />
          <FormInput id="slug" label="slug" />
          <SelectInput id="category" label="category">{categories.map((category) => <option key={category.id}>{category.categoryNameEn}</option>)}</SelectInput>
          <FormInput id="price" label="price" type="number" />
          <FormInput id="currency" label="currency" defaultValue="تومان" />
          <FormInput id="unit" label="unit" />
          <ImageUploader />
          <FormTextarea id="shortDescriptionFa" label="shortDescriptionFa" />
          <FormTextarea id="shortDescriptionEn" label="shortDescriptionEn" />
          <FormTextarea id="fullDescriptionFa" label="fullDescriptionFa" />
          <FormTextarea id="fullDescriptionEn" label="fullDescriptionEn" />
          <SelectInput id="availabilityStatus" label="availabilityStatus"><option>available</option><option>limited</option><option>unavailable</option></SelectInput>
          <FormInput id="tags" label="tags" />
          <FormInput id="seoTitle" label="seoTitle" />
          <FormTextarea id="seoDescription" label="seoDescription" />
          <Button loading={status === 'loading'}>Save product</Button>
        </AdminForm>
      </Modal>
    </AdminShell>
  );
}

export function CategoryManagementPage() {
  const [items, setItems] = useState(categories);
  const [modalOpen, setModalOpen] = useState(false);

  function remove(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <AdminShell title="CategoryManagementPage">
      <div className="product-meta" style={{ marginBottom: 20 }}>
        <h2>Manage Categories</h2>
        <Button onClick={() => setModalOpen(true)}>Create category</Button>
      </div>
      <AdminTable
        columns={[
          { key: 'categoryNameFa', label: 'Persian Name' },
          { key: 'categoryNameEn', label: 'English Name' },
          { key: 'slug', label: 'Slug' },
          { key: 'displayOrder', label: 'Order' },
          { key: 'isActive', label: 'Active', render: (row) => row.isActive ? 'Yes' : 'No' }
        ]}
        rows={items}
        actions={(row) => (
          <div className="inline-actions" style={{ marginTop: 0 }}>
            <Button variant="outline" onClick={() => setModalOpen(true)}>Edit</Button>
            <Button variant="ghost">Publish</Button>
            <Button variant="danger" onClick={() => remove(row.id)}>Delete</Button>
          </div>
        )}
      />
      <Modal open={modalOpen} title="Category form" onClose={() => setModalOpen(false)}>
        <AdminForm onSubmit={(event) => { event.preventDefault(); setModalOpen(false); }}>
          <FormInput id="categoryNameFa" label="categoryNameFa" />
          <FormInput id="categoryNameEn" label="categoryNameEn" />
          <FormInput id="slug" label="slug" />
          <ImageUploader label="Set category image" />
          <FormTextarea id="descriptionFa" label="descriptionFa" />
          <FormTextarea id="descriptionEn" label="descriptionEn" />
          <FormInput id="displayOrder" label="displayOrder" type="number" />
          <SelectInput id="isActive" label="isActive"><option>true</option><option>false</option></SelectInput>
          <FormInput id="seoTitle" label="seoTitle" />
          <FormTextarea id="seoDescription" label="seoDescription" />
          <Button>Save category</Button>
        </AdminForm>
      </Modal>
    </AdminShell>
  );
}
