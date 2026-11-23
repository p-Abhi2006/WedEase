/**
 * WedEase - Role-Based Authentication & Session Manager (Prototype Demo)
 * Manages Customer, Vendor, and Admin authentication, sessions, and data using localStorage.
 */

const AuthManager = (() => {
  const STORAGE_KEYS = {
    SESSION: 'wedease_auth_session',
    CUSTOMERS: 'wedease_db_customers',
    VENDORS: 'wedease_db_vendors',
    ADMIN: 'wedease_db_admin',
    BOOKINGS: 'wedease_db_bookings',
    CATEGORIES: 'wedease_db_categories',
    PACKAGES: 'wedease_db_packages'
  };

  // Default Seed Data
  const DEFAULT_CUSTOMERS = [
    {
      id: 'cust_1',
      name: 'Ananya Sharma',
      email: 'ananya@example.com',
      phone: '9876543210',
      password: 'password123',
      city: 'Bangalore',
      weddingDate: '2026-12-18',
      partnerName: 'Rohit Verma',
      budget: '₹8,00,000',
      active: true,
      registeredAt: '2026-11-15'
    },
    {
      id: 'cust_2',
      name: 'Priya Patel',
      email: 'priya@example.com',
      phone: '9812345678',
      password: 'password123',
      city: 'Mumbai',
      weddingDate: '2027-01-22',
      partnerName: 'Aman Shah',
      budget: '₹15,00,000',
      active: true,
      registeredAt: '2026-11-18'
    }
  ];

  const DEFAULT_VENDORS = [
    {
      id: 'vend_1',
      businessName: 'The Royal Grand Convention Palace',
      ownerName: 'Rajesh Kumar',
      email: 'vendor@royalconvention.com',
      phone: '9811223344',
      category: 'venue',
      categoryLabel: 'Marriage Halls & Auditoriums',
      city: 'Bangalore',
      password: 'vendor123',
      status: 'approved', // 'approved', 'pending', 'rejected'
      startingPrice: '₹1,80,000 / day',
      services: ['AC Convention Hall', 'Bridal Suites', 'Valet Parking', 'Power Backup'],
      availability: {
        '2026-12-18': 'Booked (Ananya Sharma)',
        '2026-12-25': 'Booked (Corporate Event)'
      },
      active: true,
      registeredAt: '2026-11-10'
    },
    {
      id: 'vend_2',
      businessName: 'Rasoi Parampara Royal Catering',
      ownerName: 'Suresh Hegde',
      email: 'catering@rasoiparampara.com',
      phone: '9822334455',
      category: 'catering',
      categoryLabel: 'Catering',
      city: 'Bangalore',
      password: 'vendor123',
      status: 'approved',
      startingPrice: '₹850 / plate (Starts ₹2.2L)',
      services: ['North & South Indian Buffet', 'Live Chaat Bazaars', 'Dessert Parlour'],
      availability: {
        '2026-12-20': 'Available',
        '2026-12-25': 'Booked'
      },
      active: true,
      registeredAt: '2026-11-12'
    },
    {
      id: 'vend_3',
      businessName: 'Vriksh Floral Art & Mandap Stylists',
      ownerName: 'Meera Sen',
      email: 'decor@vriksh.com',
      phone: '9833445566',
      category: 'decoration',
      categoryLabel: 'Decoration',
      city: 'Bangalore',
      password: 'vendor123',
      status: 'pending', // Pending Admin approval
      startingPrice: '₹95,000 / setup',
      services: ['Orchid Mandap', 'LED Light Tunnel', 'Fairy Light Entrance'],
      availability: {},
      active: true,
      registeredAt: '2026-11-22'
    }
  ];

  const DEFAULT_ADMIN = {
    email: 'admin@wedease.com',
    username: 'admin',
    password: 'admin123',
    name: 'WedEase System Administrator',
    role: 'admin'
  };

  const DEFAULT_BOOKINGS = [
    {
      id: 'bk_101',
      referenceCode: 'WE-2026-8492',
      customerName: 'Ananya Sharma',
      customerEmail: 'ananya@example.com',
      customerPhone: '9876543210',
      vendorName: 'The Royal Grand Convention Palace',
      vendorEmail: 'vendor@royalconvention.com',
      serviceName: 'Marriage Hall & Auditorium (Full Day)',
      eventDate: '2026-12-18',
      location: 'Bangalore',
      guests: 'Classic (200 - 500 guests)',
      totalAmount: '₹1,80,000',
      status: 'Confirmed', // 'Pending', 'Confirmed', 'Rejected'
      notes: 'Grand convention hall booked with air-conditioning and 2 dressing suites.',
      createdAt: '2026-11-20'
    },
    {
      id: 'bk_102',
      referenceCode: 'WE-2026-7319',
      customerName: 'Ananya Sharma',
      customerEmail: 'ananya@example.com',
      customerPhone: '9876543210',
      vendorName: 'Rasoi Parampara Royal Catering',
      vendorEmail: 'catering@rasoiparampara.com',
      serviceName: 'Multi-Cuisine Royal Buffet',
      eventDate: '2026-12-18',
      location: 'Bangalore',
      guests: 'Classic (200 - 500 guests)',
      totalAmount: '₹2,20,000',
      status: 'Pending',
      notes: 'Live chaat counter, traditional banana leaf service, and mocktails requested.',
      createdAt: '2026-11-21'
    },
    {
      id: 'bk_103',
      referenceCode: 'WE-2026-4412',
      customerName: 'Priya Patel',
      customerEmail: 'priya@example.com',
      customerPhone: '9812345678',
      vendorName: 'ITC Sea-Breeze Heritage Lawns',
      vendorEmail: 'vendor@royalconvention.com',
      serviceName: 'Seaside Sunset Lawn & Banquet',
      eventDate: '2027-01-22',
      location: 'Mumbai',
      guests: 'Grand (500 - 1000 guests)',
      totalAmount: '₹2,50,000',
      status: 'Pending',
      notes: 'Sunset pheras on beachfront mandap.',
      createdAt: '2026-11-22'
    }
  ];

  const DEFAULT_CATEGORIES = [
    { id: 'cat_1', name: 'Marriage Halls and Auditoriums', slug: 'venue', icon: '🏛️', count: 18 },
    { id: 'cat_2', name: 'Catering', slug: 'catering', icon: '🍽️', count: 24 },
    { id: 'cat_3', name: 'Photography and Videography', slug: 'photography', icon: '📸', count: 32 },
    { id: 'cat_4', name: 'Decoration', slug: 'decoration', icon: '🌸', count: 19 },
    { id: 'cat_5', name: 'Makeup and Beauty', slug: 'makeup', icon: '💄', count: 28 },
    { id: 'cat_6', name: 'Vehicle Rental', slug: 'vehicle', icon: '🚘', count: 14 },
    { id: 'cat_7', name: 'Event Management', slug: 'event-management', icon: '📋', count: 15 }
  ];

  const DEFAULT_PACKAGES = [
    { id: 'pkg_1', name: 'Economical Package', price: 299000, priceDisplay: '₹2,99,000', guests: 'Up to 400', active: true },
    { id: 'pkg_2', name: 'Standard Package', price: 699000, priceDisplay: '₹6,99,000', guests: 'Up to 800', isFeatured: true, active: true },
    { id: 'pkg_3', name: 'Premium Royal Package', price: 1499000, priceDisplay: '₹14,99,000', guests: 'Up to 2,000', active: true }
  ];

  // Initialize DB from LocalStorage or seed defaults
  function initDB() {
    if (!localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(DEFAULT_CUSTOMERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.VENDORS)) {
      localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(DEFAULT_VENDORS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN)) {
      localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(DEFAULT_ADMIN));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PACKAGES)) {
      localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(DEFAULT_PACKAGES));
    }
  }

  // Getters & Setters
  function getCustomers() {
    initDB();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOMERS)) || [];
    } catch (e) {
      return DEFAULT_CUSTOMERS;
    }
  }

  function saveCustomers(list) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(list));
  }

  function getVendors() {
    initDB();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.VENDORS)) || [];
    } catch (e) {
      return DEFAULT_VENDORS;
    }
  }

  function saveVendors(list) {
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(list));
  }

  function getBookings() {
    initDB();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS)) || [];
    } catch (e) {
      return DEFAULT_BOOKINGS;
    }
  }

  function saveBookings(list) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(list));
  }

  function getCategories() {
    initDB();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)) || [];
    } catch (e) {
      return DEFAULT_CATEGORIES;
    }
  }

  function saveCategories(list) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(list));
  }

  function getPackages() {
    initDB();
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PACKAGES)) || [];
    } catch (e) {
      return DEFAULT_PACKAGES;
    }
  }

  function savePackages(list) {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(list));
  }

  // Session Management
  function getCurrentUser() {
    try {
      const session = localStorage.getItem(STORAGE_KEYS.SESSION);
      return session ? JSON.parse(session) : null;
    } catch (e) {
      return null;
    }
  }

  function setSession(role, userObj) {
    const sessionData = {
      role: role, // 'customer', 'vendor', 'admin'
      data: userObj,
      loggedInAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(sessionData));
    return sessionData;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    window.location.href = 'index.html';
  }

  // Authentication: Login
  function login(role, identifier, password) {
    initDB();
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanId || !cleanPass) {
      return { success: false, message: 'Please enter both your credentials.' };
    }

    if (role === 'admin') {
      const admin = JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN)) || DEFAULT_ADMIN;
      if ((cleanId === admin.email.toLowerCase() || cleanId === admin.username.toLowerCase()) && cleanPass === admin.password) {
        setSession('admin', admin);
        return { success: true, redirect: 'admin-dashboard.html' };
      }
      return { success: false, message: 'Invalid admin username or password.' };
    }

    if (role === 'customer') {
      const customers = getCustomers();
      const customer = customers.find(c => c.email.toLowerCase() === cleanId);
      if (!customer) {
        return { success: false, message: 'No customer account found with this email.' };
      }
      if (customer.password !== cleanPass) {
        return { success: false, message: 'Incorrect password. Try again.' };
      }
      if (!customer.active) {
        return { success: false, message: 'Your demo account is currently deactivated by admin.' };
      }
      setSession('customer', customer);
      return { success: true, redirect: 'customer-dashboard.html' };
    }

    if (role === 'vendor') {
      const vendors = getVendors();
      const vendor = vendors.find(v => v.email.toLowerCase() === cleanId);
      if (!vendor) {
        return { success: false, message: 'No registered vendor found with this email.' };
      }
      if (vendor.password !== cleanPass) {
        return { success: false, message: 'Incorrect vendor password.' };
      }
      if (!vendor.active) {
        return { success: false, message: 'Your vendor account has been deactivated.' };
      }
      setSession('vendor', vendor);
      return { success: true, redirect: 'vendor-dashboard.html' };
    }

    return { success: false, message: 'Unknown user role specified.' };
  }

  // Authentication: Register Customer
  function registerCustomer(formData) {
    initDB();
    const customers = getCustomers();

    if (customers.some(c => c.email.toLowerCase() === formData.email.trim().toLowerCase())) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newCustomer = {
      id: 'cust_' + Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      password: formData.password,
      city: formData.city || 'Bangalore',
      weddingDate: formData.weddingDate || '',
      partnerName: formData.partnerName || '',
      budget: formData.budget || '₹8,00,000',
      active: true,
      registeredAt: new Date().toISOString().split('T')[0]
    };

    customers.push(newCustomer);
    saveCustomers(customers);
    setSession('customer', newCustomer);

    return { success: true, redirect: 'customer-dashboard.html' };
  }

  // Authentication: Register Vendor
  function registerVendor(formData) {
    initDB();
    const vendors = getVendors();

    if (vendors.some(v => v.email.toLowerCase() === formData.email.trim().toLowerCase())) {
      return { success: false, message: 'A vendor with this email is already registered.' };
    }

    const newVendor = {
      id: 'vend_' + Date.now(),
      businessName: formData.businessName.trim(),
      ownerName: formData.ownerName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      category: formData.category,
      categoryLabel: formData.categoryLabel || formData.category,
      city: formData.city.trim(),
      password: formData.password,
      status: 'pending', // Starts in pending state for admin to review
      startingPrice: formData.startingPrice || '₹50,000 / event',
      services: formData.services || ['Consultation', 'Standard Package'],
      availability: {},
      active: true,
      registeredAt: new Date().toISOString().split('T')[0]
    };

    vendors.push(newVendor);
    saveVendors(vendors);
    setSession('vendor', newVendor);

    return { success: true, redirect: 'vendor-dashboard.html' };
  }

  // Role Guard for Dashboard Pages
  function requireRole(expectedRole) {
    const user = getCurrentUser();
    if (!user || user.role !== expectedRole) {
      alert(`Access Restricted: This area is strictly for ${expectedRole.toUpperCase()}s. Redirecting to login.`);
      window.location.href = `login.html?role=${expectedRole}&action=login`;
      return null;
    }
    return user;
  }

  // Update Navbar in index.html dynamically
  function updateNavbar() {
    const navSection = document.getElementById('navAuthSection');
    if (!navSection) return;

    const user = getCurrentUser();
    if (user && user.data) {
      const dashboardUrl = user.role === 'customer' 
        ? 'customer-dashboard.html' 
        : user.role === 'vendor' 
          ? 'vendor-dashboard.html' 
          : 'admin-dashboard.html';

      const displayName = user.data.name || user.data.businessName || 'My Account';
      const roleBadge = user.role.toUpperCase();

      navSection.innerHTML = `
        <div class="user-logged-pill">
          <a href="${dashboardUrl}" class="btn btn-outline nav-auth-btn user-btn">
            <span class="user-icon">👤</span>
            <span class="user-name">${escapeHtml(displayName)}</span>
            <span class="role-tag">${roleBadge}</span>
          </a>
          <button type="button" class="btn btn-link nav-logout-btn" id="headerLogoutBtn" title="Logout">
            Logout
          </button>
        </div>
        <a href="#enquiry" class="btn btn-primary nav-cta">Book Enquiry</a>
      `;

      document.getElementById('headerLogoutBtn')?.addEventListener('click', () => {
        logout();
      });
    }
  }

  // Booking Actions
  function updateBookingStatus(bookingId, newStatus) {
    const bookings = getBookings();
    const target = bookings.find(b => b.id === bookingId || b.referenceCode === bookingId);
    if (target) {
      target.status = newStatus;
      saveBookings(bookings);
      return true;
    }
    return false;
  }

  function addBookingEnquiry(enquiry) {
    const bookings = getBookings();
    bookings.unshift(enquiry);
    saveBookings(bookings);
  }

  // Vendor Approval (Admin)
  function setVendorApproval(vendorId, status) {
    const vendors = getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) {
      vendor.status = status; // 'approved' or 'rejected'
      saveVendors(vendors);
      return true;
    }
    return false;
  }

  // Customer Activation Toggle (Admin)
  function toggleCustomerActive(customerId) {
    const customers = getCustomers();
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      customer.active = !customer.active;
      saveCustomers(customers);
      return customer.active;
    }
    return false;
  }

  // Helper escape
  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, s => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[s]));
  }

  // Auto-init on load
  initDB();

  return {
    initDB,
    getCustomers,
    saveCustomers,
    getVendors,
    saveVendors,
    getBookings,
    saveBookings,
    getCategories,
    saveCategories,
    getPackages,
    savePackages,
    getCurrentUser,
    login,
    registerCustomer,
    registerVendor,
    logout,
    requireRole,
    updateNavbar,
    updateBookingStatus,
    addBookingEnquiry,
    setVendorApproval,
    toggleCustomerActive,
    escapeHtml
  };
})();

// Attach navbar update listener if on home page
document.addEventListener('DOMContentLoaded', () => {
  AuthManager.updateNavbar();
});
