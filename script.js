// ========== PROPERTY DATA ==========
const properties = [
    {
        id: 1,
        title: 'Marine Drive Waterfront Apartment',
        location: 'Marine Drive, Kochi',
        price: '₹1.2 Cr',
        beds: 3,
        baths: 2,
        type: 'apartment',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop&auto=format',
        description: 'Luxury 3BHK with panoramic backwater views.'
    },
    {
        id: 2,
        title: 'Kakkanad Premium Villa',
        location: 'Kakkanad, Kochi',
        price: '₹2.8 Cr',
        beds: 4,
        baths: 3,
        type: 'villa',
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop&auto=format',
        description: 'Gated community villa with private garden and pool.'
    },
    {
        id: 3,
        title: 'Commercial Space – MG Road',
        location: 'MG Road, Kochi',
        price: '₹3.5 Cr',
        beds: 0,
        baths: 0,
        type: 'commercial',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format',
        description: 'Prime retail space in the heart of the city.'
    },
    {
        id: 4,
        title: 'Panampilly Nagar 2BHK',
        location: 'Panampilly Nagar, Kochi',
        price: '₹75 L',
        beds: 2,
        baths: 2,
        type: 'apartment',
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop&auto=format',
        description: 'Modern apartment in a quiet, premium neighborhood.'
    },
    {
        id: 5,
        title: 'Edappally Land Parcel',
        location: 'Edappally, Kochi',
        price: '₹1.8 Cr',
        beds: 0,
        baths: 0,
        type: 'land',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&auto=format',
        description: 'Prime residential land plot with all approvals.'
    },
    {
        id: 6,
        title: 'Vytilla Luxury Penthouse',
        location: 'Vytilla, Kochi',
        price: '₹2.2 Cr',
        beds: 4,
        baths: 3,
        type: 'apartment',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&auto=format',
        description: 'Sky-high penthouse with 360° city views.'
    }
];

// ========== TESTIMONIAL DATA ==========
const testimonials = [
    {
        name: 'Anita Sharma',
        role: 'Home Buyer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format',
        text: 'Urban Estate Rentals made our dream of owning a home in Kochi a reality. Their local expertise and transparent process gave us total confidence.'
    },
    {
        name: 'Vikram Menon',
        role: 'Landlord',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
        text: 'I\'ve been using their property management services for 3 years. They handle everything professionally and keep my tenants happy.'
    },
    {
        name: 'Sneha Nair',
        role: 'First-time Buyer',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format',
        text: 'As a first-time buyer, I was nervous. The team guided me through every step, from paperwork to final registration. Highly recommended!'
    }
];

// ========== RENDER PROPERTIES ==========
function renderProperties(filterType = 'all', searchTerm = '', priceFilter = 'all') {
    const grid = document.getElementById('propertyGrid');
    const filtered = properties.filter(p => {
        const matchType = filterType === 'all' || p.type === filterType;
        const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.location.toLowerCase().includes(searchTerm.toLowerCase());
        let matchPrice = true;
        if (priceFilter === 'low') matchPrice = parsePrice(p.price) < 50;
        else if (priceFilter === 'mid') matchPrice = parsePrice(p.price) >= 50 && parsePrice(p.price) <= 150;
        else if (priceFilter === 'high') matchPrice = parsePrice(p.price) > 150;
        return matchType && matchSearch && matchPrice;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--text-muted); padding:40px;">No properties match your criteria.</p>`;
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <div class="property-card reveal">
            <div class="property-image">
                <img src="${p.image}" alt="${p.title}" loading="lazy" />
            </div>
            <div class="property-body">
                <h3>${p.title}</h3>
                <div class="property-location"><i class="fas fa-map-pin"></i> ${p.location}</div>
                <div class="property-price">${p.price}</div>
                <div class="property-meta">
                    ${p.beds > 0 ? `<span><i class="fas fa-bed"></i> ${p.beds} Beds</span>` : ''}
                    ${p.baths > 0 ? `<span><i class="fas fa-bath"></i> ${p.baths} Baths</span>` : ''}
                    <span><i class="fas fa-tag"></i> ${p.type.charAt(0).toUpperCase() + p.type.slice(1)}</span>
                </div>
                <a href="#contact" class="btn btn-primary btn-sm">Inquire Now</a>
            </div>
        </div>
    `).join('');

    observeReveals();
}

function parsePrice(priceStr) {
    const num = parseFloat(priceStr.replace(/[₹, CrL]/g, '').trim());
    if (priceStr.includes('Cr')) return num * 100;
    if (priceStr.includes('L')) return num;
    return num;
}

// ========== RENDER TESTIMONIALS ==========
function renderTestimonials() {
    const grid = document.getElementById('testimonialGrid');
    if (!grid) return;
    grid.innerHTML = testimonials.map(t => `
        <div class="testimonial-card reveal">
            <div class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
            <p>"${t.text}"</p>
            <div class="testimonial-author">
                <img src="${t.image}" alt="${t.name}" />
                <div>
                    <strong>${t.name}</strong>
                    <span>${t.role}</span>
                </div>
            </div>
        </div>
    `).join('');
    observeReveals();
}

// ========== SCROLL REVEAL ==========
function observeReveals() {
    const reveals = document.querySelectorAll('.reveal:not(.visible)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });
    reveals.forEach(el => observer.observe(el));
}

// ========== FILTER EVENT LISTENERS ==========
const searchInput = document.getElementById('searchInput');
const filterType = document.getElementById('filterType');
const filterPrice = document.getElementById('filterPrice');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        renderProperties(filterType.value, e.target.value, filterPrice.value);
    });
}

if (filterType) {
    filterType.addEventListener('change', (e) => {
        renderProperties(e.target.value, searchInput.value, filterPrice.value);
    });
}

if (filterPrice) {
    filterPrice.addEventListener('change', (e) => {
        renderProperties(filterType.value, searchInput.value, e.target.value);
    });
}

// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// ========== STICKY NAVBAR ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== STATS COUNTER ANIMATION ==========
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'));
            let current = 0;
            const increment = Math.ceil(target / 60);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target + (target === 98 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    el.textContent = current + (target === 98 ? '%' : '+');
                }
            }, 25);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const msg = document.getElementById('message').value.trim();
        if (name && email && msg) {
            alert(`Thank you, ${name}! Your inquiry has been sent. We'll get back to you shortly.`);
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// ========== NEWSLETTER FORM ==========
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input[type="email"]');
        if (input.value.trim()) {
            alert('Thanks for subscribing! We\'ll keep you updated.');
            input.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// ========== INITIAL RENDER ==========
renderProperties();
renderTestimonials();

// Observe initial reveals after a small delay
setTimeout(observeReveals, 150);