/**
 * WedEase - Wedding Planning & Service Booking Platform
 * Client-Side Application Logic (GitHub Pages Compatible)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initVendorShowcase();
  initCuratedPackages();
  initCustomPackageBuilder();
  initBudgetEstimator();
  initBookingEnquiry();
  initDialogPolyfills();
});

/* ==========================================================================
   1. Sample Vendor Data (7 Categories)
   ========================================================================== */
const VENDORS_DATA = [
  {
    id: 'v1',
    name: 'The Royal Grand Convention Palace',
    category: 'venue',
    categoryLabel: 'Marriage Halls & Auditoriums',
    city: 'Bangalore',
    rating: 4.9,
    reviewsCount: 142,
    startingPrice: 180000,
    priceDisplay: '₹1,80,000 / day',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    description: 'Magnificent air-conditioned convention palace with grand crystal chandeliers, pillarless banquet hall, and lush green outdoor lawn.',
    amenities: ['Capacity: 1500 Guests', 'Central AC', '2 Bridal Dressing Suites', 'Valet Parking (300 Cars)', 'In-house Generator Backup'],
    fullDetails: 'The Royal Grand Convention Palace provides a majestic backdrop for royal celebrations. Featuring state-of-the-art acoustic design, luxurious bridal suites, fully equipped catering kitchens, and dedicated event management staff on site.'
  },
  {
    id: 'v2',
    name: 'ITC Sea-Breeze Heritage Lawns',
    category: 'venue',
    categoryLabel: 'Marriage Halls & Auditoriums',
    city: 'Mumbai',
    rating: 4.8,
    reviewsCount: 119,
    startingPrice: 250000,
    priceDisplay: '₹2,50,000 / day',
    image: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
    description: 'Premier seaside lawn and banquet facility offering panoramic sunset views, private beach access, and royal colonial architecture.',
    amenities: ['Capacity: 1000 Guests', 'Seaside View', 'Beachfront Mandap Area', '5-Star Hospitality Support', 'Valet Parking'],
    fullDetails: 'Celebrate your union beside the tranquil Arabian Sea. Ideal for sunset pheras, lavish cocktail receptions, and destination weddings with complete guest accommodation support.'
  },
  {
    id: 'v3',
    name: 'Rasoi Parampara Royal Catering',
    category: 'catering',
    categoryLabel: 'Catering',
    city: 'Bangalore',
    rating: 4.9,
    reviewsCount: 186,
    startingPrice: 220000,
    priceDisplay: '₹850 / plate (Starts ₹2.2L)',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    description: 'Award-winning catering enterprise delivering traditional multi-course royal feasts, live chaat bazaars, and gourmet dessert parlours.',
    amenities: ['Pure Veg & Non-Veg Menus', 'Live Tandoor & Chaat Counters', 'Traditional Banana Leaf Service', '70+ Signature Dishes', 'Trained Uniformed Waitstaff'],
    fullDetails: 'Rasoi Parampara combines generational culinary heritage with modern presentation. We specialize in North Indian, South Indian Sadhya, Awadhi, and Continental wedding menus with hygienic preparation standards.'
  },
  {
    id: 'v4',
    name: 'Dawat-e-Khaas Mughlai & Continental Feasts',
    category: 'catering',
    categoryLabel: 'Catering',
    city: 'Delhi NCR',
    rating: 4.9,
    reviewsCount: 205,
    startingPrice: 280000,
    priceDisplay: '₹1,100 / plate (Starts ₹2.8L)',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    description: 'Celebrated culinary artisans known for authentic dum biryanis, galouti kebabs, live artisanal pasta stations, and handcrafted mocktails.',
    amenities: ['Royal Mughlai & Pan-Asian', 'Artisanal Dessert Buffet', 'Live Mocktail Bar', 'Copperware Presentation', 'FSSAI Certified Hygiene'],
    fullDetails: 'Dawat-e-Khaas transforms wedding dinners into unforgettable gastronomic journeys. Our master chefs prepare exquisite spreads from royal slow-cooked delicacies to contemporary fusion counters.'
  },
  {
    id: 'v5',
    name: 'Lumière Wedding Cinematography & Films',
    category: 'photography',
    categoryLabel: 'Photography & Videography',
    city: 'Bangalore',
    rating: 4.9,
    reviewsCount: 164,
    startingPrice: 85000,
    priceDisplay: '₹85,000 / complete package',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    description: 'Creative candid storytellers capturing genuine wedding emotions with 4K cinema cameras, aerial drones, and heirloom photo albums.',
    amenities: ['2 Candid Photographers', '1 Traditional Videographer', '4K Drone Aerial Coverage', '3-Minute Cinematic Trailer', 'Premium Leather Photobook'],
    fullDetails: 'We preserve your most cherished memories with fine-art aesthetics. Lumière specializes in candid, documentary-style photography that lets you relive the warmth, laughter, and tears of joy for decades to come.'
  },
  {
    id: 'v6',
    name: 'The Wedding Chronicle Stories',
    category: 'photography',
    categoryLabel: 'Photography & Videography',
    city: 'Mumbai',
    rating: 4.8,
    reviewsCount: 98,
    startingPrice: 110000,
    priceDisplay: '₹1,10,000 / complete package',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
    description: 'High-fashion wedding photography team known for breathtaking pre-wedding portraiture, editorial lighting, and same-day edit teasers.',
    amenities: ['Pre-Wedding Conceptual Shoot', 'Full Day Multi-Camera Crew', 'Same-Day Reel Delivery', 'Raw 4K Footage Delivery', 'Online Cloud Gallery'],
    fullDetails: 'From romantic pre-wedding shoots at scenic getaways to the grand baraat procession, our team utilizes cinematic framing and color grading inspired by classic cinema.'
  },
  {
    id: 'v7',
    name: 'Vriksh Floral Art & Mandap Stylists',
    category: 'decoration',
    categoryLabel: 'Decoration',
    city: 'Bangalore',
    rating: 4.8,
    reviewsCount: 130,
    startingPrice: 95000,
    priceDisplay: '₹95,000 / event setup',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    description: 'Master florists and theme decorators crafting enchanting fresh flower mandaps, fairy light tunnels, and floral aisle walkways.',
    amenities: ['Custom Fresh Flower Mandap', 'Grand Entrance Archway', 'LED & Chandelier Lighting', 'Stage Backdrop Design', 'Dining Area Table Decor'],
    fullDetails: 'Vriksh transforms ordinary venues into fairytale settings. We curate imported orchids, marigolds, roses, and ambient mood illumination to reflect your personal wedding theme.'
  },
  {
    id: 'v8',
    name: 'Utsav Heritage & Royal Set Designers',
    category: 'decoration',
    categoryLabel: 'Decoration',
    city: 'Jaipur',
    rating: 4.9,
    reviewsCount: 112,
    startingPrice: 140000,
    priceDisplay: '₹1,40,000 / royal setup',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    description: 'Spectacular palace-themed decor, antique brass lanterns, hand-carved jharokhas, and majestic royal drapes for royal celebrations.',
    amenities: ['Rajasthani Mahal Theme', 'Antique Brass Diya Setup', 'Sangeet Stage with LED Wall', 'Haldi & Mehendi Photobooths', 'Acoustic Sound Truss'],
    fullDetails: 'Specializing in destination and royal heritage setups across Rajasthan and North India. Our set designers craft magnificent physical architecture that elevates every photo and guest experience.'
  },
  {
    id: 'v9',
    name: 'Glamour By Shruti Bridal Studio',
    category: 'makeup',
    categoryLabel: 'Makeup & Beauty',
    city: 'Mumbai',
    rating: 4.9,
    reviewsCount: 220,
    startingPrice: 35000,
    priceDisplay: '₹35,000 / bridal session',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    description: 'Renowned celebrity bridal artist delivering long-lasting HD Airbrush makeup, bespoke hair artistry, and luxury saree/lehenga draping.',
    amenities: ['HD Airbrush Makeup', 'International Luxury Brands', 'Intricate Hair Art & Real Florals', 'Pre-Bridal Trial Session', 'Groom Touchup Included'],
    fullDetails: 'Look radiant and camera-ready from morning rituals to midnight reception. We use premium non-comedogenic cosmetics (Huda Beauty, MAC, Charlotte Tilbury) tailored to your skin tone.'
  },
  {
    id: 'v10',
    name: 'Royal Vintage Wheels & Luxury Fleet',
    category: 'vehicle',
    categoryLabel: 'Vehicle Rental',
    city: 'Bangalore',
    rating: 4.8,
    reviewsCount: 75,
    startingPrice: 25000,
    priceDisplay: '₹25,000 / 8-hour rental',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    description: 'Classic 1954 vintage convertibles, Mercedes-Benz, and Audi luxury sedans elegantly decorated with fresh floral ribbons for the bridal couple.',
    amenities: ['Decorated Vintage Convertible', 'Chauffeur in Formal Attire', 'Fuel & Toll Charges Included', 'Red Carpet Arrival Experience', 'Photo-Op Assistance'],
    fullDetails: 'Make a grand and unforgettable entrance. Our fleet of pristine vintage and luxury luxury vehicles adds timeless elegance and aristocratic flair to your wedding procession.'
  },
  {
    id: 'v11',
    name: 'Shubh Aarambh Wedding Planners & Concierge',
    category: 'event-management',
    categoryLabel: 'Event Management',
    city: 'Bangalore',
    rating: 5.0,
    reviewsCount: 94,
    startingPrice: 60000,
    priceDisplay: '₹60,000 / full wedding day',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    description: 'Full-service wedding planning team handling vendor coordination, timeline orchestration, guest hospitality, and ritual logistics seamlessly.',
    amenities: ['3 Dedicated Day-of Coordinators', 'Master Timeline Scheduling', 'RSVP & Guest Hotel Check-in', 'Crisis & Contingency Management', 'Vendor Payment Oversight'],
    fullDetails: 'Enjoy your wedding day like a guest of honor while our seasoned coordinators manage vendors, schedule ceremonies, guide photographers, and ensure every detail runs like clockwork.'
  },
  {
    id: 'v12',
    name: 'Taal Rhythm Live DJ & Folk Ensemble',
    category: 'event-management',
    categoryLabel: 'Event Management',
    city: 'Delhi NCR',
    rating: 4.9,
    reviewsCount: 88,
    startingPrice: 45000,
    priceDisplay: '₹45,000 / evening performance',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    description: 'High-energy DJ setups, Punjabi Dhol drummers, Shehnai maestros, and acoustic Sufi bands creating an electrifying Sangeet atmosphere.',
    amenities: ['Professional Concert Sound Truss', 'Intelligent Moving-Head Lasers', 'Live Punjabi Dhol Artists', 'Curated Bollywood & Regional Sets', 'Smoke & Sparkler Cold Pyro'],
    fullDetails: 'Turn your Sangeet and Baraat into an unforgettable celebration. We provide top-tier audio-visual equipment, wireless microphones, and versatile musicians who keep the dance floor packed all night.'
  }
];

/* ==========================================================================
   2. Modular Service Components for Custom Package Builder
   ========================================================================== */
const BUILDER_SERVICES = [
  { id: 'b1', title: 'Grand AC Convention Hall', category: 'Venue', price: 150000, icon: '🏛️', desc: 'Central AC, capacity up to 1000 guests, bridal suites, and generator backup.' },
  { id: 'b2', title: 'Multi-Cuisine Royal Catering', category: 'Catering', price: 220000, icon: '🍽️', desc: 'Buffet spread for 500 guests with 60+ dishes, live chaat and dessert bars.' },
  { id: 'b3', title: 'Candid Photography & 4K Teaser', category: 'Photography', price: 85000, icon: '📸', desc: '2 candid photographers, 4K video teaser, and premium photobook album.' },
  { id: 'b4', title: 'Theme Floral Mandap & Stage', category: 'Decoration', price: 95000, icon: '🌸', desc: 'Fresh orchid & marigold floral mandap, entrance arch, and fairy light canopy.' },
  { id: 'b5', title: 'Bridal & Groom Luxury Makeup', category: 'Makeup', price: 40000, icon: '💄', desc: 'HD airbrush makeup, hair styling, saree draping, and trial session.' },
  { id: 'b6', title: 'Decorated Luxury Wedding Car', category: 'Vehicle', price: 25000, icon: '🚘', desc: 'Chauffeured Mercedes or decorated vintage car for bride & groom arrival.' },
  { id: 'b7', title: 'On-Site Wedding Event Management', category: 'Coordination', price: 60000, icon: '📋', desc: 'Full-day wedding coordinators managing vendor timings, guests, and cues.' },
  { id: 'b8', title: 'Live Music, Dhol & DJ Setup', category: 'Entertainment', price: 45000, icon: '🎵', desc: 'Professional sound system, intelligent dance lighting, and live dhol team.' },
  { id: 'b9', title: 'Pre-Wedding Shoot & Drone Flight', category: 'Photography', price: 35000, icon: '🚁', desc: 'Scenic half-day pre-wedding couple shoot with cinematic 4K drone video.' },
  { id: 'b10', title: 'Invitations & Guest Hospitality', category: 'Logistics', price: 20000, icon: '💌', desc: 'Digital wedding website, RSVP tracking, and hotel check-in concierge.' }
];

/* ==========================================================================
   3. Budget Estimator Default Categories
   ========================================================================== */
const BUDGET_CATEGORIES = [
  { id: 'cat_venue', name: 'Marriage Hall & Venue', icon: '🏛️', defaultAmount: 200000, recommendedPercent: '25%' },
  { id: 'cat_catering', name: 'Catering & Beverages', icon: '🍽️', defaultAmount: 250000, recommendedPercent: '30%' },
  { id: 'cat_photo', name: 'Photography & Videography', icon: '📸', defaultAmount: 90000, recommendedPercent: '12%' },
  { id: 'cat_decor', name: 'Floral Stage & Lighting Decor', icon: '🌸', defaultAmount: 110000, recommendedPercent: '15%' },
  { id: 'cat_makeup', name: 'Bridal Makeup & Groom Styling', icon: '💄', defaultAmount: 45000, recommendedPercent: '6%' },
  { id: 'cat_music', name: 'Live Music, DJ & Entertainment', icon: '🎵', defaultAmount: 40000, recommendedPercent: '5%' },
  { id: 'cat_transport', name: 'Transport, Fleet & Miscellaneous', icon: '🚘', defaultAmount: 65000, recommendedPercent: '7%' }
];

/* ==========================================================================
   Navigation & Mobile Drawer
   ========================================================================== */
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile nav when link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   Vendor Discovery Showcase & Filtering
   ========================================================================== */
function initVendorShowcase() {
  const vendorGrid = document.getElementById('vendorGrid');
  const categoryPills = document.querySelectorAll('#categoryFilter .pill-btn');
  const searchInput = document.getElementById('vendorSearchInput');
  const citySelect = document.getElementById('cityFilterSelect');
  const resultsCount = document.getElementById('resultsCount');
  const filterIndicator = document.getElementById('filterIndicator');

  let activeCategory = 'all';
  let searchQuery = '';
  let activeCity = 'all';

  function renderVendors() {
    if (!vendorGrid) return;

    const filtered = VENDORS_DATA.filter(vendor => {
      const matchesCategory = (activeCategory === 'all' || vendor.category === activeCategory);
      const matchesCity = (activeCity === 'all' || vendor.city === activeCity);
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        vendor.name.toLowerCase().includes(query) ||
        vendor.description.toLowerCase().includes(query) ||
        vendor.city.toLowerCase().includes(query) ||
        vendor.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesCity && matchesSearch;
    });

    // Update Results Meta
    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} of ${VENDORS_DATA.length} verified vendors`;
    }
    if (filterIndicator) {
      const parts = [];
      if (activeCategory !== 'all') parts.push(`Category: ${activeCategory}`);
      if (activeCity !== 'all') parts.push(`City: ${activeCity}`);
      if (searchQuery) parts.push(`"${searchQuery}"`);
      filterIndicator.textContent = parts.length ? `(Filtered by ${parts.join(', ')})` : '';
    }

    if (filtered.length === 0) {
      vendorGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔍</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--burgundy-deep); margin-bottom: 0.5rem;">No matching vendors found</h3>
          <p>Try selecting a different category or clearing your search keywords.</p>
        </div>
      `;
      return;
    }

    vendorGrid.innerHTML = filtered.map(v => `
      <article class="vendor-card" data-vendor-id="${v.id}">
        <div class="vendor-img-wrap">
          <img src="${v.image}" alt="${v.name}" class="vendor-img" loading="lazy">
          <span class="vendor-category-badge">${v.categoryLabel}</span>
          <span class="vendor-rating-badge">★ ${v.rating} (${v.reviewsCount})</span>
        </div>
        <div class="vendor-content">
          <h3 class="vendor-name">${v.name}</h3>
          <div class="vendor-location">📍 ${v.city}, India</div>
          <p class="vendor-desc">${v.description}</p>
          <div class="vendor-tags">
            ${v.amenities.slice(0, 3).map(a => `<span class="v-tag">${a}</span>`).join('')}
          </div>
          <div class="vendor-footer">
            <div class="vendor-pricing">
              <span class="v-price-label">Starting Price</span>
              <span class="v-price-amount">${v.priceDisplay}</span>
            </div>
            <button type="button" class="btn btn-outline view-vendor-btn" data-id="${v.id}">
              View Details
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Attach click listeners to "View Details" buttons
    document.querySelectorAll('.view-vendor-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const vendorId = e.currentTarget.getAttribute('data-id');
        openVendorModal(vendorId);
      });
    });
  }

  // Category Pill Filter Clicks
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-selected', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-selected', 'true');
      activeCategory = pill.getAttribute('data-category');
      renderVendors();
    });
  });

  // Footer Category Link clicks delegation
  document.querySelectorAll('a[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetCat = link.getAttribute('data-filter');
      const targetPill = document.querySelector(`#categoryFilter .pill-btn[data-category="${targetCat}"]`);
      if (targetPill) {
        targetPill.click();
      }
    });
  });

  // Search Input Filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderVendors();
    });
  }

  // City Select Filter
  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      activeCity = e.target.value;
      renderVendors();
    });
  }

  // Initial Render
  renderVendors();
}

/* ==========================================================================
   Vendor Details Modal
   ========================================================================== */
function openVendorModal(vendorId) {
  const vendor = VENDORS_DATA.find(v => v.id === vendorId);
  const modal = document.getElementById('vendorModal');
  const modalBody = document.getElementById('vendorModalBody');
  const closeBtn = document.getElementById('closeVendorModalBtn');

  if (!vendor || !modal || !modalBody) return;

  modalBody.innerHTML = `
    <div class="vendor-modal-header">
      <span class="v-modal-category">${vendor.categoryLabel}</span>
      <h2 id="vendorModalTitle" class="v-modal-title">${vendor.name}</h2>
      <div class="v-modal-meta">
        <span>📍 ${vendor.city}, India</span>
        <span>★ ${vendor.rating} (${vendor.reviewsCount} verified reviews)</span>
      </div>
    </div>

    <div class="v-modal-gallery">
      <img src="${vendor.image}" alt="${vendor.name}">
    </div>

    <div class="v-modal-section">
      <h4>About this Service Provider</h4>
      <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">${vendor.fullDetails}</p>
    </div>

    <div class="v-modal-section">
      <h4>Key Highlights & Inclusions</h4>
      <div class="v-modal-amenities">
        ${vendor.amenities.map(a => `<span class="amenity-pill">✓ ${a}</span>`).join('')}
      </div>
    </div>

    <div class="v-modal-pricing-box">
      <div>
        <span style="font-size: 0.8rem; color: var(--text-light); text-transform: uppercase;">Estimated Starting Price</span>
        <div class="v-modal-price-val">${vendor.priceDisplay}</div>
      </div>
      <button type="button" class="btn btn-primary" id="modalSelectVendorBtn">
        Book Enquiry for This Vendor
      </button>
    </div>
  `;

  // Attach Select for Enquiry action
  const selectVendorBtn = document.getElementById('modalSelectVendorBtn');
  if (selectVendorBtn) {
    selectVendorBtn.addEventListener('click', () => {
      modal.close();
      const serviceSelect = document.getElementById('selectedPackageOrService');
      const specialNotes = document.getElementById('specialNotes');
      const locationSelect = document.getElementById('eventLocation');

      if (serviceSelect) {
        serviceSelect.value = `${vendor.categoryLabel} Only`;
        if (!serviceSelect.value) {
          serviceSelect.selectedIndex = 1;
        }
      }
      if (specialNotes) {
        specialNotes.value = `Enquiry specifically for vendor: "${vendor.name}" (${vendor.categoryLabel}, ${vendor.city}). Please check date availability.`;
      }
      if (locationSelect && vendor.city) {
        locationSelect.value = vendor.city;
      }

      showToast(`Selected "${vendor.name}"! Directing to booking enquiry.`);
      document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  closeBtn?.addEventListener('click', () => modal.close(), { once: true });
  modal.showModal();
}

/* ==========================================================================
   Curated Wedding Packages Interaction
   ========================================================================== */
function initCuratedPackages() {
  const packageBtns = document.querySelectorAll('.select-package-btn');

  packageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const packageName = btn.getAttribute('data-package-name');
      const packagePrice = btn.getAttribute('data-package-price');
      const serviceSelect = document.getElementById('selectedPackageOrService');
      const specialNotes = document.getElementById('specialNotes');

      if (serviceSelect) {
        // Find matching option or set value
        let found = false;
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.includes(packageName)) {
            serviceSelect.selectedIndex = i;
            found = true;
            break;
          }
        }
        if (!found) {
          serviceSelect.value = 'Custom Built Package (From Builder)';
        }
      }

      if (specialNotes) {
        specialNotes.value = `Selected Pre-Curated Tier: ${packageName} (Approx. ₹${Number(packagePrice).toLocaleString('en-IN')}).`;
      }

      showToast(`Selected ${packageName}! Directing to enquiry form.`);
      document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ==========================================================================
   Custom Package Builder
   ========================================================================== */
function initCustomPackageBuilder() {
  const grid = document.getElementById('builderItemsGrid');
  const list = document.getElementById('selectedItemsList');
  const subtotalEl = document.getElementById('builderSubtotal');
  const totalEl = document.getElementById('builderTotal');
  const countBadge = document.getElementById('customSelectedCount');
  const transferBtn = document.getElementById('transferToEnquiryBtn');
  const resetBtn = document.getElementById('resetBuilderBtn');

  // Load saved state or empty
  let selectedIds = new Set();
  try {
    const saved = localStorage.getItem('wedease_custom_package');
    if (saved) {
      selectedIds = new Set(JSON.parse(saved));
    }
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }

  function renderBuilder() {
    if (!grid || !list) return;

    // Render left-side items grid
    grid.innerHTML = BUILDER_SERVICES.map(item => {
      const isSelected = selectedIds.has(item.id);
      return `
        <div class="builder-item-card ${isSelected ? 'selected' : ''}" data-id="${item.id}" role="checkbox" aria-checked="${isSelected}">
          <div class="item-card-top">
            <span class="item-icon">${item.icon}</span>
            <input type="checkbox" class="item-checkbox" ${isSelected ? 'checked' : ''} aria-label="Select ${item.title}">
          </div>
          <h4 class="item-title">${item.title}</h4>
          <p class="item-desc">${item.desc}</p>
          <div class="item-price">₹${item.price.toLocaleString('en-IN')}</div>
        </div>
      `;
    }).join('');

    // Attach click handlers to items
    document.querySelectorAll('.builder-item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.getAttribute('data-id');
        if (selectedIds.has(id)) {
          selectedIds.delete(id);
        } else {
          selectedIds.add(id);
        }
        persistAndSync();
      });
    });

    // Render right-side selected list
    const selectedItems = BUILDER_SERVICES.filter(item => selectedIds.has(item.id));
    const totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);

    if (selectedItems.length === 0) {
      list.innerHTML = `
        <div class="empty-state-notice">
          <span class="empty-icon">💍</span>
          <p>No services selected yet. Click any service on the left to start customizing your package!</p>
        </div>
      `;
      if (transferBtn) transferBtn.disabled = true;
    } else {
      list.innerHTML = selectedItems.map(item => `
        <div class="selected-item-row">
          <div class="selected-item-info">
            <span class="selected-item-title">${item.icon} ${item.title}</span>
            <span class="selected-item-price">₹${item.price.toLocaleString('en-IN')}</span>
          </div>
          <button type="button" class="remove-item-btn" data-remove-id="${item.id}" title="Remove this service" aria-label="Remove ${item.title}">
            &times;
          </button>
        </div>
      `).join('');

      document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const removeId = btn.getAttribute('data-remove-id');
          selectedIds.delete(removeId);
          persistAndSync();
        });
      });

      if (transferBtn) transferBtn.disabled = false;
    }

    if (countBadge) countBadge.textContent = `${selectedItems.length} items selected`;
    if (subtotalEl) subtotalEl.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
    if (totalEl) totalEl.textContent = `₹${totalAmount.toLocaleString('en-IN')}`;
  }

  function persistAndSync() {
    try {
      localStorage.setItem('wedease_custom_package', JSON.stringify(Array.from(selectedIds)));
    } catch (e) {}
    renderBuilder();
  }

  // Transfer to Enquiry Form
  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      const selectedItems = BUILDER_SERVICES.filter(item => selectedIds.has(item.id));
      const totalAmount = selectedItems.reduce((sum, item) => sum + item.price, 0);

      const serviceSelect = document.getElementById('selectedPackageOrService');
      const specialNotes = document.getElementById('specialNotes');

      if (serviceSelect) {
        serviceSelect.value = 'Custom Built Package (From Builder)';
      }

      if (specialNotes) {
        const itemsListStr = selectedItems.map(i => `• ${i.title} (₹${i.price.toLocaleString('en-IN')})`).join('\n');
        specialNotes.value = `Custom Package Selection:\n${itemsListStr}\nTotal Package Estimate: ₹${totalAmount.toLocaleString('en-IN')}`;
      }

      showToast(`Custom package transferred to enquiry form!`);
      document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Reset Builder
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      selectedIds.clear();
      persistAndSync();
      showToast('Custom package builder reset.');
    });
  }

  renderBuilder();
}

/* ==========================================================================
   Smart Budget Estimator
   ========================================================================== */
function initBudgetEstimator() {
  const budgetInput = document.getElementById('plannedBudgetInput');
  const presetBtns = document.querySelectorAll('.preset-btn');
  const displayPlanned = document.getElementById('displayPlannedBudget');
  const displayExpenses = document.getElementById('displayEstimatedExpenses');
  const displayBalance = document.getElementById('displayRemainingBalance');
  const progressFill = document.getElementById('budgetProgressFill');
  const percentLabel = document.getElementById('budgetPercentLabel');
  const statusAlert = document.getElementById('budgetStatusAlert');
  const rowsContainer = document.getElementById('budgetRowsContainer');

  let plannedBudget = Number(budgetInput?.value) || 800000;
  
  // Load saved amounts or defaults
  let categoryAmounts = {};
  BUDGET_CATEGORIES.forEach(cat => {
    categoryAmounts[cat.id] = cat.defaultAmount;
  });

  try {
    const savedAmounts = localStorage.getItem('wedease_budget_amounts');
    if (savedAmounts) {
      Object.assign(categoryAmounts, JSON.parse(savedAmounts));
    }
    const savedBudget = localStorage.getItem('wedease_planned_budget');
    if (savedBudget) {
      plannedBudget = Number(savedBudget);
      if (budgetInput) budgetInput.value = plannedBudget;
    }
  } catch (err) {}

  function renderCategoryRows() {
    if (!rowsContainer) return;

    rowsContainer.innerHTML = BUDGET_CATEGORIES.map(cat => {
      const amount = categoryAmounts[cat.id] || 0;
      return `
        <div class="budget-cat-row">
          <div class="cat-info-col">
            <span class="cat-icon">${cat.icon}</span>
            <div>
              <span class="cat-name">${cat.name}</span>
              <span class="cat-recommended">Recommended ~${cat.recommendedPercent} of budget</span>
            </div>
          </div>
          <div class="cat-input-col">
            <span style="font-size: 0.9rem; color: var(--text-light);">₹</span>
            <input type="number" step="5000" min="0" class="cat-budget-input" data-cat-id="${cat.id}" value="${amount}">
          </div>
        </div>
      `;
    }).join('');

    // Attach input listeners
    document.querySelectorAll('.cat-budget-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const catId = input.getAttribute('data-cat-id');
        categoryAmounts[catId] = Math.max(0, Number(input.value) || 0);
        updateCalculations();
      });
    });
  }

  function updateCalculations() {
    plannedBudget = Math.max(1000, Number(budgetInput?.value) || 0);

    const totalExpenses = Object.values(categoryAmounts).reduce((sum, val) => sum + val, 0);
    const balance = plannedBudget - totalExpenses;
    const percentUsed = Math.min(200, Math.round((totalExpenses / plannedBudget) * 100)) || 0;

    // Display numbers
    if (displayPlanned) displayPlanned.textContent = `₹${plannedBudget.toLocaleString('en-IN')}`;
    if (displayExpenses) displayExpenses.textContent = `₹${totalExpenses.toLocaleString('en-IN')}`;
    
    if (displayBalance) {
      if (balance >= 0) {
        displayBalance.textContent = `₹${balance.toLocaleString('en-IN')}`;
        displayBalance.className = 'metric-value balance positive';
      } else {
        displayBalance.textContent = `-₹${Math.abs(balance).toLocaleString('en-IN')}`;
        displayBalance.className = 'metric-value balance negative';
      }
    }

    // Progress Bar
    if (percentLabel) percentLabel.textContent = `${percentUsed}% used`;
    if (progressFill) {
      progressFill.style.width = `${Math.min(100, percentUsed)}%`;
      progressFill.className = 'progress-bar-fill';
      if (percentUsed > 100) {
        progressFill.classList.add('danger');
      } else if (percentUsed > 85) {
        progressFill.classList.add('warning');
      }
    }

    // Status Alert Box
    if (statusAlert) {
      if (balance >= 0) {
        statusAlert.className = 'budget-status-alert safe';
        statusAlert.innerHTML = `
          <span>✓</span>
          <span><strong>Within Budget:</strong> You have <strong>₹${balance.toLocaleString('en-IN')}</strong> remaining for buffer or unexpected wedding expenses.</span>
        `;
      } else {
        const overBudget = Math.abs(balance);
        statusAlert.className = 'budget-status-alert danger';
        statusAlert.innerHTML = `
          <span>⚠️</span>
          <span><strong>Budget Exceeded by ₹${overBudget.toLocaleString('en-IN')}!</strong> Consider choosing an Economical catering tier or modifying venue decorations to stay on track.</span>
        `;
      }
    }

    // Persist
    try {
      localStorage.setItem('wedease_budget_amounts', JSON.stringify(categoryAmounts));
      localStorage.setItem('wedease_planned_budget', String(plannedBudget));
    } catch (e) {}
  }

  // Budget Presets
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const presetVal = Number(btn.getAttribute('data-preset'));
      if (budgetInput) {
        budgetInput.value = presetVal;
      }
      updateCalculations();
    });
  });

  if (budgetInput) {
    budgetInput.addEventListener('input', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      updateCalculations();
    });
  }

  renderCategoryRows();
  updateCalculations();
}

/* ==========================================================================
   Booking Enquiry Form Validation & Submission
   ========================================================================== */
function initBookingEnquiry() {
  const form = document.getElementById('bookingEnquiryForm');
  const submitBtn = document.getElementById('submitEnquiryBtn');
  const weddingDateInput = document.getElementById('weddingDate');
  const successModal = document.getElementById('enquirySuccessModal');
  const closeSuccessBtn = document.getElementById('closeSuccessModalBtn');
  const successOkBtn = document.getElementById('successOkBtn');
  const receiptContainer = document.getElementById('enquiryReceiptContent');

  // Prevent past dates in wedding date picker
  if (weddingDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    weddingDateInput.min = tomorrow.toISOString().split('T')[0];
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Field: Customer Name
    const nameInput = document.getElementById('custName');
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
    }

    // Field: Email
    const emailInput = document.getElementById('custEmail');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
    }

    // Field: Phone (10 digits)
    const phoneInput = document.getElementById('custPhone');
    const phoneClean = phoneInput.value.replace(/[^0-9]/g, '');
    if (phoneClean.length < 10) {
      phoneInput.classList.add('is-invalid');
      isValid = false;
    } else {
      phoneInput.classList.remove('is-invalid');
    }

    // Field: Wedding Date
    if (!weddingDateInput.value) {
      weddingDateInput.classList.add('is-invalid');
      isValid = false;
    } else {
      weddingDateInput.classList.remove('is-invalid');
    }

    // Field: Event City
    const locationSelect = document.getElementById('eventLocation');
    if (!locationSelect.value) {
      locationSelect.classList.add('is-invalid');
      isValid = false;
    } else {
      locationSelect.classList.remove('is-invalid');
    }

    // Field: Selected Package / Service
    const serviceSelect = document.getElementById('selectedPackageOrService');
    if (!serviceSelect.value) {
      serviceSelect.classList.add('is-invalid');
      isValid = false;
    } else {
      serviceSelect.classList.remove('is-invalid');
    }

    if (!isValid) {
      showToast('Please fix the highlighted fields in the form.');
      return;
    }

    // Simulate submission state
    if (submitBtn) {
      submitBtn.disabled = true;
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');
      if (btnText) btnText.textContent = 'Submitting Enquiry...';
      if (btnSpinner) btnSpinner.style.display = 'inline-block';
    }

    setTimeout(() => {
      // Generate reference code
      const refCode = `WE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const guests = document.getElementById('guestCount')?.value || 'Classic (200 - 500 guests)';

      if (receiptContainer) {
        receiptContainer.innerHTML = `
          <div class="receipt-row">
            <span class="receipt-label">Reference ID:</span>
            <span class="receipt-value ref-code-badge">${refCode}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Client Name:</span>
            <span class="receipt-value">${escapeHtml(nameInput.value)}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Contact Details:</span>
            <span class="receipt-value">${escapeHtml(phoneInput.value)} | ${escapeHtml(emailInput.value)}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Celebration Date:</span>
            <span class="receipt-value">${weddingDateInput.value}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Location:</span>
            <span class="receipt-value">${escapeHtml(locationSelect.value)}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Chosen Service / Package:</span>
            <span class="receipt-value">${escapeHtml(serviceSelect.value)}</span>
          </div>
          <div class="receipt-row">
            <span class="receipt-label">Guest Scale:</span>
            <span class="receipt-value">${escapeHtml(guests)}</span>
          </div>
        `;
      }

      // Save enquiry into AuthManager bookings store
      if (window.AuthManager) {
        AuthManager.addBookingEnquiry({
          id: 'bk_' + Date.now(),
          referenceCode: refCode,
          customerName: nameInput.value.trim(),
          customerEmail: emailInput.value.trim(),
          customerPhone: phoneInput.value.trim(),
          vendorName: 'The Royal Grand Convention Palace',
          serviceName: serviceSelect.value,
          eventDate: weddingDateInput.value,
          location: locationSelect.value,
          guests: guests,
          totalAmount: 'Quote Requested',
          status: 'Pending',
          notes: document.getElementById('specialNotes')?.value || '',
          createdAt: new Date().toISOString().split('T')[0]
        });
      }

      // Reset button state
      if (submitBtn) {
        submitBtn.disabled = false;
        const btnText = submitBtn.querySelector('.btn-text');
        const btnSpinner = submitBtn.querySelector('.btn-spinner');
        if (btnText) btnText.textContent = 'Send Booking Enquiry';
        if (btnSpinner) btnSpinner.style.display = 'none';
      }

      // Reset form
      form.reset();

      // Open Success Modal
      if (successModal) {
        successModal.showModal();
      }

      showToast(`Enquiry submitted! Reference code: ${refCode}`);
    }, 800);
  });

  // Modal close handlers
  closeSuccessBtn?.addEventListener('click', () => successModal?.close());
  successOkBtn?.addEventListener('click', () => {
    successModal?.close();
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ==========================================================================
   Modern Web Guidance Dialog Fallback
   ========================================================================== */
function initDialogPolyfills() {
  // Fallback for browsers lacking native closedby="any"
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    const dialogs = document.querySelectorAll('dialog[closedby="any"]');
    dialogs.forEach(dialog => {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent = (
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width
        );
        if (!isDialogContent) {
          dialog.close();
        }
      });
    });
  }
}

/* ==========================================================================
   Helper Utilities
   ========================================================================== */
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

function escapeHtml(string) {
  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return String(string).replace(/[&<>"']/g, s => entityMap[s]);
}
