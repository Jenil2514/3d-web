/* ==========================================================================
   JHG ARCHITECTURE & INTERIOR DESIGN - APP SCRIPT
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. DATASETS (PROJECTS & NEWS)
// --------------------------------------------------------------------------
const PROJECTS_DATA = [
    {
        id: 'p1',
        name: 'GLASS HARBOR HIDEAWAY',
        category: 'residential new-buildings houses',
        catLabel: 'RESIDENTIAL ARCHITECTURE',
        location: 'Sag Harbor, NY',
        year: '2025',
        architect: 'JHG Architecture Team',
        area: '8,400 sq. ft.',
        client: 'Private Art Collector',
        materials: 'Cantilevered Structural Steel, Triple-Glazed Low-E Glass, Reclaimed Teak, Basaltina Stone',
        mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Positioned on a dramatic coastal slope in Sag Harbor, Glass Harbor Hideaway is a study in transparent volume and landscape integration. The structure consists of two floating glass and steel pavilions connected by a central stone gallery void. Seamless floor-to-ceiling glass panels slide into concealed wall pockets, opening the main living spaces to saltwater breeze and water vistas.',
        blueprintText: 'Conceptual Grid: 12m cantilevered steel trusses with thermal break technology and subterranean geothermal heat exchangers.'
    },
    {
        id: 'p2',
        name: 'FLATIRON TRIPLEX',
        category: 'interiors lofts apartments',
        catLabel: 'LUXURY INTERIORS',
        location: 'Flatiron District, NYC',
        year: '2024',
        architect: 'JHG Interior Studio',
        area: '6,200 sq. ft.',
        client: 'Marcus & Elena Vance',
        materials: 'Calacatta Viola Marble, Fluted Oak Paneling, Bronze Hardware, Polished Concrete',
        mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1400&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Occupying the top three floors of a historic 19th-century cast-iron building, the Flatiron Triplex balances historic urban heritage with bespoke luxury. A sculptural bronzed steel spiral staircase unites all three levels, culminating in a private rooftop terrace garden overlooking the Madison Square Park canopy.',
        blueprintText: 'Structural Conversion: Reinforced floor plates and integrated acoustic dampening layers across 3 vertical penthouse zones.'
    },
    {
        id: 'p3',
        name: 'MOUNTAIN HOUSE – ALTA, UTAH',
        category: 'residential new-buildings houses',
        catLabel: 'ALPINE ARCHITECTURE',
        location: 'Alta, Utah',
        year: '2025',
        architect: 'JHG Mountain Studio',
        area: '10,500 sq. ft.',
        client: 'Private Residence',
        materials: 'Charred Cedar (Shou Sugi Ban), Board-Formed Concrete, Zinc Roofing, Heated Slate Floors',
        mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Engineered to withstand heavy alpine snowfall while offering unfiltered views of the Wasatch Range, Mountain House Alta emerges organically from the granite terrain. The building is anchored by a massive board-formed concrete hearth wall that provides thermal mass and spatial orientation.',
        blueprintText: 'Snow load design rating: 250 lbs/sq ft; integrated solar thermal roof skin and triple insulated glazing.'
    },
    {
        id: 'p4',
        name: 'HUDSON YARDS HEADQUARTERS',
        category: 'commercial retail-hospitality',
        catLabel: 'COMMERCIAL LANDMARK',
        location: 'Hudson Yards, NYC',
        year: '2024',
        architect: 'JHG Commercial Practice',
        area: '45,000 sq. ft.',
        client: 'Vantage Capital Group',
        materials: 'Low-Iron Curtainwall Glass, Brushed Titanium, Acoustical Felt Walls, Terrazzo Flooring',
        mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1400&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'A forward-thinking commercial environment designed around biophilic principles and flexible workspace zoning. The interior features a double-height atrium green wall, climate-controlled executive suites, and panoramic views of the Hudson River.',
        blueprintText: 'LEED Platinum certified workspace layout with dynamic automated louvers for optical glare reduction.'
    },
    {
        id: 'p5',
        name: 'CONCEALED COTTAGE',
        category: 'residential new-buildings houses',
        catLabel: 'BESPOKE GUESTHOUSE',
        location: 'Bridgehampton, NY',
        year: '2025',
        architect: 'JHG Architecture',
        area: '3,800 sq. ft.',
        client: 'Private Art Foundation',
        materials: 'Weathered Red Cedar, Sunken Earth Courtyards, Micro-topping Concrete',
        mainImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Tucked beneath a bermed wildflower garden, Concealed Cottage is an invisible modern retreat for visiting artists. Skylights carve through the green roof structure to drop pools of daylight into subterranean gallery rooms.',
        blueprintText: 'Subterranean hydro-isolation system with green roof soil depth of 45cm.'
    },
    {
        id: 'p6',
        name: 'NORTH MOORE LOFT',
        category: 'interiors lofts',
        catLabel: 'HISTORIC TRIBECA LOFT',
        location: 'Tribeca, NYC',
        year: '2023',
        architect: 'JHG Studio',
        area: '4,500 sq. ft.',
        client: 'Private Residence',
        materials: 'Original Exposed Brick, Reclaimed Pine Beams, Smoked Steel Partitions',
        mainImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1400&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'A refined preservation and transformation of a 19th-century industrial warehouse space into an light-filled urban sanctuary featuring custom steel glass partitions.',
        blueprintText: 'Acoustic decouple ceiling joists and custom concealed HVAC ductwork.'
    },
    {
        id: 'p7',
        name: 'NEWPORT COAST HOUSE',
        category: 'residential houses',
        catLabel: 'COASTAL RESIDENTIAL',
        location: 'Newport Coast, CA',
        year: '2024',
        architect: 'JHG West Coast Studio',
        area: '9,100 sq. ft.',
        client: 'Private Client',
        materials: 'Limestone Cladding, Floor-to-Ceiling Sliding Walls, Teak Decking',
        mainImage: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1400&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Perched on the cliffside of Newport Coast, this residence frames uninterrupted sunrise and sunset horizons with cantilevered limestone overhangs.',
        blueprintText: 'Seismic isolated foundation pads with salt-air resistant marine finish hardware.'
    },
    {
        id: 'p8',
        name: 'DOWER HOUSE',
        category: 'residential new-buildings',
        catLabel: 'COUNTRY ESTATE',
        location: 'Litchfield County, CT',
        year: '2023',
        architect: 'JHG Architecture',
        area: '7,200 sq. ft.',
        client: 'Private Family',
        materials: 'Hand-cut Connecticut Fieldstone, Slate Roof Shingles, Black Steel Framed Windows',
        mainImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1400&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'A modern reinterpretation of traditional New England farmstead vernacular, featuring fieldstone masonry walls and high-efficiency double envelope framing.',
        blueprintText: 'Thermal barrier exterior envelope with R-40 roof insulation rating.'
    },
    {
        id: 'p9',
        name: 'HAMPTONS BEACH HOUSE',
        category: 'residential houses',
        catLabel: 'BEACH RESIDENTIAL',
        location: 'East Hampton, NY',
        year: '2024',
        architect: 'JHG Architecture',
        area: '5,400 sq. ft.',
        client: 'Private Family',
        materials: 'Bleached Cypress Shingles, Polished Concrete, White Oak Cabinetry',
        mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1400&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Designed around dune protection guidelines, this beach residence rises on slender piers to allow natural dune grass growth and storm surge flow underneath.',
        blueprintText: 'Elevated timber pier construction with pile driving down to bed stability depth.'
    },
    {
        id: 'p10',
        name: 'SULLIVAN STREET RESIDENCE',
        category: 'interiors apartments',
        catLabel: 'SOHO APARTMENT',
        location: 'SoHo, NYC',
        year: '2023',
        architect: 'JHG Interior Design',
        area: '3,200 sq. ft.',
        client: 'Private Residence',
        materials: 'Travertine Marble, Italian Custom Joinery, Linen Drapery',
        mainImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1400&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'An elegant minimal sanctuary in the heart of historic SoHo, featuring customized curved plaster walls and subtle brass lighting accents.',
        blueprintText: 'Acoustic interior partitions and invisible lighting channels.'
    },
    {
        id: 'p11',
        name: 'BROOKLYN HEIGHTS TOWNHOUSE',
        category: 'interiors townhouses',
        catLabel: 'HISTORIC TOWNHOUSE',
        location: 'Brooklyn, NY',
        year: '2024',
        architect: 'JHG Architecture & Interiors',
        area: '5,800 sq. ft.',
        client: 'Private Client',
        materials: 'Restored Brownstone Façade, Walnut Millwork, Steel Garden Extension',
        mainImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1400&auto=format&fit=crop',
        gallery: [
            'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop'
        ],
        description: 'Complete 5-story historic brownstone renovation including a multi-level rear glass curtain wall opening onto a serene walled garden.',
        blueprintText: 'Landmark facade restoration and steel rear structural modification.'
    }
];

const NEWS_DATA = [
    {
        id: 'n1',
        tag: 'ARCHITECTURAL DIGEST',
        date: 'JULY 18, 2026',
        title: 'JHG Awarded 2026 Architectural Excellence Honor for Glass Harbor Pavilion',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
        content: `The American Institute of Architects (AIA) has officially awarded JHG Architecture its highest annual Honor Award for Design Excellence for the Glass Harbor Hideaway project in Sag Harbor, NY. 

        The jury commended JHG's radical integration of structural lightness, low-E energy performance, and harmonious coastal landscape adaptation. Lead partner stated: "Our goal was not to impose a structure upon the waterfront, but rather to create a lens through which coastal light and wind can pass uninterrupted."`
    },
    {
        id: 'n2',
        tag: 'ELLE DECOR',
        date: 'JUNE 04, 2026',
        title: 'Inside the Tribeca Loft Revolution: Crafting Vertical Gardens in Historic Voids',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop',
        content: `Featured in the June issue of ELLE Decor, JHG's Flatiron Triplex showcases how 19th-century industrial architecture can be re-imagined for 21st-century luxury living. 

        The article highlights JHG's custom sculptural staircase, marble detailing, and subterranean climate control systems that allow exotic indoor flora to thrive within urban lofts.`
    },
    {
        id: 'n3',
        tag: 'MONOCLE MAGAZINE',
        date: 'MAY 12, 2026',
        title: 'Alpine Modernism: JHG Releases New Monograph on High-Altitude Sanctuaries',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop',
        content: `Monocle Press has published JHG's latest architectural monograph, titled "Alpine Sanctuaries: Form & Resilience in High Altitude". 

        The 340-page hardcover volume features extensive architectural photography, blueprints, structural section drawings, and design essays exploring how modern timber and concrete architecture responds to severe climate realities.`
    }
];

// --------------------------------------------------------------------------
// 2. HERO AUTO-SLIDER LOGIC
// --------------------------------------------------------------------------
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.slider-dots .dot');
const slideCount = slides.length;
let sliderInterval = null;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slideCount) % slideCount;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSliderTimer() {
    stopSliderTimer();
    sliderInterval = setInterval(nextSlide, 5000);
}

function stopSliderTimer() {
    if (sliderInterval) clearInterval(sliderInterval);
}

// --------------------------------------------------------------------------
// 3. CATEGORY FILTERING & VIEW MORE (PROJECTS)
// --------------------------------------------------------------------------
function setupCategoryFilters() {
    const catButtons = document.querySelectorAll('.cat-btn');
    const projectCards = document.querySelectorAll('.project-card');

    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (filter === 'all' || (categories && categories.includes(filter))) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function setupViewMoreProjects() {
    const viewMoreBtn = document.getElementById('viewMoreProjectsBtn');
    const extraProjects = document.querySelectorAll('.extra-project');
    let expanded = false;

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            expanded = !expanded;
            extraProjects.forEach(card => {
                if (expanded) {
                    card.classList.add('visible');
                } else {
                    card.classList.remove('visible');
                }
            });

            const span = viewMoreBtn.querySelector('span');
            const icon = viewMoreBtn.querySelector('i');
            if (expanded) {
                if (span) span.textContent = 'SHOW LESS PROJECTS';
                if (icon) icon.className = 'fa-solid fa-minus';
            } else {
                if (span) span.textContent = 'VIEW MORE PROJECTS';
                if (icon) icon.className = 'fa-solid fa-plus';
            }
        });
    }
}

// --------------------------------------------------------------------------
// 4. PROJECT DETAIL MODAL SYSTEM
// --------------------------------------------------------------------------
function openProjectDetail(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('projectModalBody');

    const galleryHTML = project.gallery.map(imgUrl => `
        <img src="${imgUrl}" alt="${project.name} Gallery" loading="lazy">
    `).join('');

    modalBody.innerHTML = `
        <div class="project-detail-hero" style="background-image: url('${project.mainImage}');">
            <div class="overlay"></div>
            <div class="content">
                <span class="cat-badge">${project.catLabel}</span>
                <h2>${project.name}</h2>
                <p><i class="fa-solid fa-location-dot"></i> ${project.location} &bull; ${project.year}</p>
            </div>
        </div>
        
        <div class="project-detail-content">
            <div class="specs-grid">
                <div class="spec-box">
                    <span>LOCATION</span>
                    <strong>${project.location}</strong>
                </div>
                <div class="spec-box">
                    <span>TOTAL AREA</span>
                    <strong>${project.area}</strong>
                </div>
                <div class="spec-box">
                    <span>COMPLETION</span>
                    <strong>${project.year}</strong>
                </div>
                <div class="spec-box">
                    <span>LEAD ARCHITECT</span>
                    <strong>${project.architect}</strong>
                </div>
            </div>

            <div class="narrative-block">
                <h3>ARCHITECTURAL CONCEPT & VISION</h3>
                <p>${project.description}</p>
            </div>

            <div class="narrative-block">
                <h3>MATERIAL SPECIFICATIONS & ENGINEERING</h3>
                <p><strong>Primary Materials:</strong> ${project.materials}</p>
                <p style="margin-top: 0.5rem; font-style: italic; color: var(--accent-gold);">
                    <i class="fa-solid fa-compass-drafting"></i> ${project.blueprintText}
                </p>
            </div>

            <div class="gallery-block">
                <h3>PROJECT PHOTOGRAPHY</h3>
                <div class="project-gallery-grid">
                    ${galleryHTML}
                </div>
            </div>

            <div style="margin-top: 3rem; text-align: center;">
                <a href="#contact" class="info-btn" onclick="closeModal('projectModal')">INQUIRE ABOUT SIMILAR PROJECT</a>
            </div>
        </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// --------------------------------------------------------------------------
// 5. TESTIMONIAL SLIDER LOGIC
// --------------------------------------------------------------------------
let currentTIndex = 0;
const tCards = document.querySelectorAll('.testimonial-card');
const tDots = document.querySelectorAll('.t-dot');

function showTestimonial(index) {
    tCards.forEach(c => c.classList.remove('active'));
    tDots.forEach(d => d.classList.remove('active'));

    currentTIndex = (index + tCards.length) % tCards.length;
    if (tCards[currentTIndex]) tCards[currentTIndex].classList.add('active');
    if (tDots[currentTIndex]) tDots[currentTIndex].classList.add('active');
}

// --------------------------------------------------------------------------
// 6. NEWS MODAL SYSTEM
// --------------------------------------------------------------------------
function openNewsModal(newsId) {
    const news = NEWS_DATA.find(n => n.id === newsId);
    if (!news) return;

    const modal = document.getElementById('newsModal');
    const modalBody = document.getElementById('newsModalBody');

    modalBody.innerHTML = `
        <div style="padding: 3rem;">
            <span class="news-tag" style="position: static; display: inline-block; margin-bottom: 1rem;">${news.tag}</span>
            <span style="display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">${news.date}</span>
            <h2 style="font-family: var(--font-heading); font-size: 2.4rem; line-height: 1.2; margin-bottom: 1.5rem;">${news.title}</h2>
            <img src="${news.image}" alt="${news.title}" style="width: 100%; height: 400px; object-fit: cover; border-radius: 4px; margin-bottom: 2rem;">
            <div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); white-space: pre-line;">
                ${news.content}
            </div>
        </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// --------------------------------------------------------------------------
// 7. SEARCH MODAL SYSTEM
// --------------------------------------------------------------------------
function setupSearch() {
    const searchToggle = document.getElementById('searchToggle');
    const searchModal = document.getElementById('searchModal');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (searchToggle && searchModal) {
        searchToggle.addEventListener('click', () => {
            searchModal.classList.add('open');
            document.body.style.overflow = 'hidden';
            if (searchInput) searchInput.focus();
        });
    }

    if (closeSearchBtn && searchModal) {
        closeSearchBtn.addEventListener('click', () => {
            searchModal.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            searchResults.innerHTML = '';

            if (query.length === 0) return;

            const matchedProjects = PROJECTS_DATA.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.location.toLowerCase().includes(query) || 
                p.catLabel.toLowerCase().includes(query) ||
                p.materials.toLowerCase().includes(query)
            );

            if (matchedProjects.length === 0) {
                searchResults.innerHTML = `<p style="color: var(--text-light-muted); padding: 1rem;">No matching projects found.</p>`;
                return;
            }

            matchedProjects.forEach(p => {
                const div = document.createElement('div');
                div.className = 'search-item-result';
                div.innerHTML = `
                    <div>
                        <strong style="color: #fff; display: block; font-family: var(--font-heading); font-size: 1.2rem;">${p.name}</strong>
                        <span style="color: var(--accent-gold); font-size: 0.8rem;">${p.catLabel} &bull; ${p.location}</span>
                    </div>
                    <i class="fa-solid fa-arrow-right" style="color: var(--accent-gold);"></i>
                `;
                div.addEventListener('click', () => {
                    searchModal.classList.remove('open');
                    document.body.style.overflow = '';
                    openProjectDetail(p.id);
                });
                searchResults.appendChild(div);
            });
        });
    }
}

// --------------------------------------------------------------------------
// 8. MOBILE DRAWER NAVIGATION
// --------------------------------------------------------------------------
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add('open');
        if (mobileOverlay) mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });
}

// --------------------------------------------------------------------------
// 9. FORM SUBMISSION HANDLER
// --------------------------------------------------------------------------
function handleFormSubmit(e) {
    e.preventDefault();
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (toast) {
        if (toastMessage) toastMessage.textContent = 'Thank you! Your architectural inquiry has been sent to JHG.';
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    const form = document.getElementById('contactForm');
    if (form) form.reset();
}

// --------------------------------------------------------------------------
// 10. INITIALIZATION
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero slider triggers
    startSliderTimer();

    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    if (sliderPrev) sliderPrev.addEventListener('click', () => { prevSlide(); startSliderTimer(); });
    if (sliderNext) sliderNext.addEventListener('click', () => { nextSlide(); startSliderTimer(); });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
            startSliderTimer();
        });
    });

    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSliderTimer);
        heroSection.addEventListener('mouseleave', startSliderTimer);
    }

    // 2. Setup category filters & view more
    setupCategoryFilters();
    setupViewMoreProjects();

    // 3. Modals event listeners
    const closeProjectModal = document.getElementById('closeProjectModal');
    if (closeProjectModal) {
        closeProjectModal.addEventListener('click', () => closeModal('projectModal'));
    }

    const closeNewsModal = document.getElementById('closeNewsModal');
    if (closeNewsModal) {
        closeNewsModal.addEventListener('click', () => closeModal('newsModal'));
    }

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('project-modal')) closeModal('projectModal');
        if (e.target.classList.contains('news-modal')) closeModal('newsModal');
    });

    // 4. Testimonial slider controls
    const tPrev = document.getElementById('tPrev');
    const tNext = document.getElementById('tNext');
    if (tPrev) tPrev.addEventListener('click', () => showTestimonial(currentTIndex - 1));
    if (tNext) tNext.addEventListener('click', () => showTestimonial(currentTIndex + 1));

    tDots.forEach((dot, idx) => {
        dot.addEventListener('click', () => showTestimonial(idx));
    });

    setInterval(() => {
        showTestimonial(currentTIndex + 1);
    }, 7000);

    // 5. Mobile & Search setups
    setupMobileMenu();
    setupSearch();

    // 6. Header scroll class
    const mainHeader = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // 7. Setup 3D Scroll Animation
    setupScroll3dAnimation();
});

// --------------------------------------------------------------------------
// 11. SCROLL-LINKED 3D ANIMATION SYSTEM (GSAP + WebP Canvas Sequence)
// --------------------------------------------------------------------------
function setupScroll3dAnimation() {
    const canvas = document.getElementById('scroll3dCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const loader = document.getElementById('scroll3dLoader');
    
    // 1. Hide loader immediately so user is never blocked by a loading indicator
    if (loader) loader.style.display = 'none';

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Generate list of 130 WebP frame paths
    const frameFiles = [];
    for (let i = 1; i <= 131; i++) {
        if (i === 130) continue; // missing frame in source sequence
        const paddedNum = String(i).padStart(3, '0');
        frameFiles.push(`/frames_webp/frame_${paddedNum}.webp`);
    }

    const totalFrames = frameFiles.length;
    const images = new Array(totalFrames);
    const loadingStatus = new Uint8Array(totalFrames); // 0 = unrequested, 1 = loading, 2 = loaded
    const currentFrameObj = { frame: 0 };
    let hasRenderedFirstFrame = false;

    // High-DPI Canvas Cover Sizing for Ultra-Sharp Display
    function resizeCanvas() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        renderFrame(currentFrameObj.frame);
    }

    // Helper to get nearest available loaded image so canvas never flickers black
    function getBestAvailableImage(targetIndex) {
        if (images[targetIndex] && loadingStatus[targetIndex] === 2) {
            return images[targetIndex];
        }
        // Look backward for nearest loaded frame
        for (let i = targetIndex - 1; i >= 0; i--) {
            if (images[i] && loadingStatus[i] === 2) return images[i];
        }
        // Look forward for nearest loaded frame
        for (let i = targetIndex + 1; i < totalFrames; i++) {
            if (images[i] && loadingStatus[i] === 2) return images[i];
        }
        return null;
    }

    // Render Frame onto Canvas with High Quality & High-DPI Support
    function renderFrame(index) {
        const frameIndex = Math.min(Math.max(Math.floor(index), 0), totalFrames - 1);
        const img = getBestAvailableImage(frameIndex);
        if (!img) return;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const imgAspect = img.width / img.height;
        const canvasAspect = canvas.width / canvas.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspect > imgAspect) {
            drawWidth = canvas.width;
            drawHeight = canvas.width / imgAspect;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
        } else {
            drawWidth = canvas.height * imgAspect;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }

    // Fetch individual frame (caches to prevent repeat fetching)
    function fetchFrame(index) {
        if (index < 0 || index >= totalFrames) return;
        if (loadingStatus[index] !== 0) return; // Already fetching or loaded

        loadingStatus[index] = 1; // Mark as loading
        const img = new Image();
        img.onload = () => {
            loadingStatus[index] = 2; // Mark as loaded
            images[index] = img;

            if (!hasRenderedFirstFrame || index === currentFrameObj.frame) {
                hasRenderedFirstFrame = true;
                resizeCanvas();
            } else {
                renderFrame(currentFrameObj.frame);
            }
        };
        img.onerror = () => {
            loadingStatus[index] = 0; // Reset on error
        };
        img.src = frameFiles[index];
    }

    // Stage 1: Fetch initial 60 frames (0..59) immediately on page land without blocking
    const initialBatchSize = Math.min(60, totalFrames);
    for (let i = 0; i < initialBatchSize; i++) {
        fetchFrame(i);
    }

    // Stage 2: Fetch remaining frames (60..totalFrames-1) ONLY when user reaches section (happens once)
    let remainingFetched = false;
    function fetchRemainingFrames() {
        if (remainingFetched) return;
        remainingFetched = true;

        for (let i = initialBatchSize; i < totalFrames; i++) {
            fetchFrame(i);
        }
    }

    // IntersectionObserver to detect when user reaches section
    const section = document.getElementById('scroll-3d');
    if (section && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    fetchRemainingFrames();
                    observer.disconnect();
                }
            });
        }, { rootMargin: '300px 0px 300px 0px' });
        observer.observe(section);
    }

    window.addEventListener('resize', resizeCanvas);

    // Initialize ScrollTrigger immediately on DOM ready
    initScrollTrigger();

    // Setup ScrollTrigger Timeline
    function initScrollTrigger() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        const card1 = document.getElementById('storyCard1');
        const card2 = document.getElementById('storyCard2');
        const card3 = document.getElementById('storyCard3');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.3,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Backup trigger for fetching remaining frames when scrub starts
                    if (self.progress > 0) {
                        fetchRemainingFrames();
                    }

                    const progress = self.progress;
                    
                    if (card1) {
                        if (progress >= 0.08 && progress <= 0.32) card1.classList.add('active');
                        else card1.classList.remove('active');
                    }

                    if (card2) {
                        if (progress >= 0.38 && progress <= 0.62) card2.classList.add('active');
                        else card2.classList.remove('active');
                    }

                    if (card3) {
                        if (progress >= 0.68 && progress <= 0.92) card3.classList.add('active');
                        else card3.classList.remove('active');
                    }
                }
            }
        });

        tl.to(currentFrameObj, {
            frame: totalFrames - 1,
            ease: 'none',
            onUpdate: () => {
                renderFrame(currentFrameObj.frame);
            }
        });
    }
}

