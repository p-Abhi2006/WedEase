# WedEase – Wedding Planning and Service Booking Platform

WedEase is a centralized wedding planning and service booking web platform designed to help couples discover verified wedding vendors, explore and customize all-inclusive packages, calculate realistic budgets in real time, and submit booking enquiries with zero stress.

---

## 🌟 Live Prototype & GitHub Pages Deployment

The client-side web application prototype is located inside the [`/docs`](./docs) directory and is **100% deployment-ready for GitHub Pages** without requiring a backend server.

### How to Deploy to GitHub Pages:

1. Merge your changes from `feature/backend-abhi-dev` into `dev`, and ultimately into `main`.
2. Navigate to your GitHub repository: `https://github.com/p-Abhi2006/WedEase`.
3. Go to **Settings** ➔ **Pages** (in the left sidebar).
4. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: Select `main` (or current branch) and set folder to `/docs`.
5. Click **Save**.
6. Within 1–2 minutes, your website will be live at:
   `https://p-abhi2006.github.io/WedEase/`

---

## 💻 How to Run Locally

### Option 1: Direct Browser Launch
Simply navigate into the `docs` folder and double-click `index.html` in your file explorer, or right-click and open with your preferred browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Python)
Run the built-in HTTP server from the repository root:
```bash
python -m http.server 8000 --directory docs
```
Open your browser and navigate to:
```
http://localhost:8000
```

---

## 🔐 Demo Authentication Portals & Dashboards

The prototype includes separate role-based authentication flows and dedicated dashboards for **Customers**, **Vendors**, and **Super Admins**.

### Quick Demo Access Credentials:
On the [`login.html`](./docs/login.html) page, click any of the "Quick Demo Access" buttons to automatically test each role:

| Role | Demo Email / Username | Demo Password | Accessible Dashboard |
| :--- | :--- | :--- | :--- |
| **Customer** | `ananya@example.com` | `password123` | [Customer Dashboard](./docs/customer-dashboard.html) |
| **Vendor** | `vendor@royalconvention.com` | `vendor123` | [Vendor Dashboard](./docs/vendor-dashboard.html) |
| **Super Admin** | `admin@wedease.com` or `admin` | `admin123` | [Admin Console](./docs/admin-dashboard.html) |

* **Customer Portal**: Registration & Login, celebration countdown, custom package overview, budget health widget, and active booking enquiry tracker.
* **Vendor Portal**: Partner Registration & Login, business profile manager, services/amenities editor, availability calendar, and incoming booking requests with instant **Accept / Reject** actions.
* **Admin Console**: Platform analytics overview, Customer account activation/deactivation, Vendor onboarding approvals & moderation, Service categories manager, Package pricing controls, and all-bookings audit table.
* **Role Guards**: Each dashboard validates the session role and redirects unauthorized users back to their respective login tab.

---

## 🚀 Key Prototype Features

1. **Service Discovery & Filtering**:
   - Discover vendors across all 7 essential wedding categories:
     - Marriage Halls and Auditoriums
     - Catering
     - Photography and Videography
     - Decoration
     - Makeup and Beauty
     - Vehicle Rental
     - Event Management
   - Interactive category pills, live keyword search, and city filtering (Bangalore, Mumbai, Delhi NCR, Jaipur, etc.).
   - Interactive vendor detail modal with complete amenities and starting rates.

2. **Curated Wedding Packages**:
   - 3 pre-designed tiers: **Economical (₹2,99,000)**, **Standard (₹6,99,000 - Most Popular)**, and **Premium Royal (₹14,99,000)**.
   - 1-click package selection that automatically pre-populates the Booking Enquiry form.

3. **Interactive Custom Package Builder**:
   - Modular wedding service checklist with transparent individual pricing in INR.
   - Real-time automatic calculation of custom package totals.
   - Dynamic selected items list with individual removal and transfer to booking enquiry.
   - `localStorage` state persistence.

4. **Smart Budget Estimator**:
   - Dynamic budget calculator with quick preset buttons (₹5L, ₹8L, ₹12L, ₹20L, ₹35L) and custom input.
   - Category-wise expense allocations with recommended percentages.
   - Real-time remaining balance and automatic over-budget warning alerts.

5. **Booking Enquiry Demo Form**:
   - Full input validation (name, email, 10-digit mobile, future wedding date, location, guest scale).
   - Generates simulated consultation reference tokens (`WE-2026-XXXX`) with an itemized digital receipt modal.
   - Clear prototype demo disclaimer notice.

6. **Responsive Design & Modern Aesthetic**:
   - Styled in blush pink, ivory, pure white, and champagne gold.
   - Mobile navigation drawer, smooth scrolling, and accessible native `<dialog>` modals with light-dismiss support.

---

## 🛠️ Technology Stack

- **Frontend Prototype**: HTML5, Modern CSS3 (CSS Grid, Flexbox, Custom Properties), Vanilla JavaScript (ES6+).
- **Backend Architecture (Prepared)**: Python 3.13, Django 5.1, Django REST Framework, PostgreSQL, SimpleJWT, `drf-spectacular` OpenAPI.

---

## 📁 Repository Structure

```text
WedEase/
├── docs/                           # GitHub Pages static website deployment directory
│   ├── index.html                  # Main application marketplace & enquiry sections
│   ├── login.html                  # Customer, Vendor, and Admin authentication portal
│   ├── customer-dashboard.html     # Dedicated Customer planning workspace
│   ├── vendor-dashboard.html       # Dedicated Vendor operations workspace
│   ├── admin-dashboard.html        # Platform Super Admin central management console
│   ├── auth.js                     # Role-based session manager & simulated database
│   ├── script.js                   # Marketplace client-side application logic
│   └── style.css                   # Unified blush pink, ivory, gold & burgundy theme
├── backend/                        # Django REST Framework backend architecture
│   ├── manage.py
│   ├── .env.example
│   ├── requirements/
│   │   ├── base.txt
│   │   └── local.txt
│   └── wedease_api/
│       └── settings/
├── .gitignore
├── README.md
└── venv/                           # Preserved Python virtual environment
```

---

## 👥 Branch Workflow

- **Working Branch**: `feature/backend-abhi-dev`
- **Shared Integration Branch**: `dev`
- **Production / Deployment Branch**: `main`
