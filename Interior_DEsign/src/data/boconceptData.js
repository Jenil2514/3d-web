export const SWATCH_LIBRARY = [
    {
        id: 'swatch-boucle-sand',
        name: 'Sand Wellington Bouclé',
        category: 'Fabric',
        texture: '#EAE3D9',
        description: 'Ultra-soft textured bouclé with high durability and warm Scandinavian tone.',
        priceMultiplier: 1.0
    },
    {
        id: 'swatch-velvet-forest',
        name: 'Deep Forest Velvet',
        category: 'Fabric',
        texture: '#2D3E35',
        description: 'Lustrous, silky velvet woven from premium European cotton yarns.',
        priceMultiplier: 1.15
    },
    {
        id: 'swatch-leather-cognac',
        name: 'Chester Cognac Aniline Leather',
        category: 'Leather',
        texture: '#9E5B32',
        description: 'Full-grain Danish aniline leather that acquires a rich vintage patina over time.',
        priceMultiplier: 1.35
    },
    {
        id: 'swatch-leather-charcoal',
        name: 'Espresso Black Aniline Leather',
        category: 'Leather',
        texture: '#23201F',
        description: 'Sleek matte finish leather with subtle natural grain texture.',
        priceMultiplier: 1.35
    },
    {
        id: 'swatch-linen-oat',
        name: 'Nordic Oat Raw Linen',
        category: 'Fabric',
        texture: '#D8CDC0',
        description: 'Breathable 100% natural linen blend with serene, textured aesthetic.',
        priceMultiplier: 1.05
    },
    {
        id: 'swatch-velvet-terracotta',
        name: 'Warm Terracotta Velvet',
        category: 'Fabric',
        texture: '#B85B43',
        description: 'Rich earthy terracotta velvet designed to create inviting focus spaces.',
        priceMultiplier: 1.15
    }
];
export const LEG_FINISHES = [
    {
        id: 'leg-brass',
        name: 'Brushed Brass',
        finish: 'Brass',
        hex: '#D4AF37',
        price: 150
    },
    {
        id: 'leg-black-steel',
        name: 'Matte Black Steel',
        finish: 'Metal',
        hex: '#1E1E1E',
        price: 0
    },
    {
        id: 'leg-smoked-oak',
        name: 'Smoked Danish Oak',
        finish: 'Wood',
        hex: '#4A3B32',
        price: 120
    },
    {
        id: 'leg-chrome',
        name: 'Polished Chrome',
        finish: 'Metal',
        hex: '#E0E0E0',
        price: 90
    }
];
export const PRODUCTS_CATALOG = [
    {
        id: 'bergamo-sofa',
        name: 'Bergamo Modular Sofa',
        tagline: 'Organic comfort meets contemporary Danish minimalism',
        category: 'sofas',
        basePrice: 3499,
        description: 'Designed by Morten Georgsen, Bergamo combines rounded organic curves with deep plush comfort. Fully modular to fit grand open-plan living rooms or compact modern suites.',
        dimensions: 'W312 x D160 x H74 cm',
        designer: 'Morten Georgsen',
        featured: true,
        bestseller: true,
        images: [
            'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80'
        ],
        swatches: SWATCH_LIBRARY,
        legs: LEG_FINISHES
    },
    {
        id: 'imola-chair',
        name: 'Imola Armchair with Swivel Base',
        tagline: 'An iconic silhouette inspired by the curves of a tennis ball',
        category: 'armchairs',
        basePrice: 2899,
        description: 'Designed by Henrik Pedersen, the Imola chair is a true design icon. Striking curves and cocooning comfort make it the ultimate centerpiece for living rooms and private libraries.',
        dimensions: 'W95 x D99 x H110 cm',
        designer: 'Henrik Pedersen',
        featured: true,
        bestseller: true,
        images: [
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=80'
        ],
        swatches: SWATCH_LIBRARY,
        legs: LEG_FINISHES
    },
    {
        id: 'carmo-sofa',
        name: 'Carmo Sectional Sofa',
        tagline: 'Distinctive piping and deep modular versatility',
        category: 'sofas',
        basePrice: 4199,
        description: 'Carmo is an eye-catching sofa with a fully upholstered modular concept. Sharp lines contrast with comfortable cushioning, accentuating bold Scandinavian architecture.',
        dimensions: 'W340 x D173 x H70 cm',
        designer: 'BoConcept Design Team',
        featured: false,
        bestseller: true,
        images: [
            'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1600&q=80'
        ],
        swatches: SWATCH_LIBRARY,
        legs: LEG_FINISHES
    },
    {
        id: 'kingston-dining-table',
        name: 'Kingston Extendable Dining Table',
        tagline: 'Seamless Danish craftsmanship with hidden extension leaf',
        category: 'tables',
        basePrice: 2199,
        description: 'Kingston combines beauty and functionality. Tapered metal legs support an organic oval tabletop with a built-in butterfly extension mechanism.',
        dimensions: 'L200-280 x W99 x H74 cm',
        designer: 'Morten Georgsen',
        featured: true,
        bestseller: false,
        images: [
            'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&w=1600&q=80'
        ],
        swatches: SWATCH_LIBRARY.filter(s => s.category === 'Wood' || s.category === 'Fabric'),
        legs: LEG_FINISHES
    },
    {
        id: 'ottawa-dining-chair',
        name: 'Ottawa Sculptural Dining Chair',
        tagline: 'Nature-inspired leaf silhouette designed by Karim Rashid',
        category: 'armchairs',
        basePrice: 649,
        description: 'Karim Rashid created Ottawa as a homage to nature. The leaf-shaped seat cradles the spine while slender twig-like legs provide lightweight elegance.',
        dimensions: 'W51 x D57 x H88 cm',
        designer: 'Karim Rashid',
        featured: false,
        bestseller: true,
        images: [
            'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1600&q=80'
        ],
        swatches: SWATCH_LIBRARY,
        legs: LEG_FINISHES
    },
    {
        id: 'bordeaux-shelving-unit',
        name: 'Bordeaux Architectural Wall System',
        tagline: 'Minimalist vertical storage for modern architectural homes',
        category: 'storage',
        basePrice: 1549,
        description: 'Clean horizontal grid lines and matte powder-coated steel give Bordeaux a weightless appearance while providing ample display space for art and literature.',
        dimensions: 'W125 x D32 x H205 cm',
        designer: 'Morten Georgsen',
        featured: true,
        bestseller: false,
        images: [
            'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=1600&q=80'
        ],
        swatches: SWATCH_LIBRARY.filter(s => s.category === 'Wood'),
        legs: LEG_FINISHES
    },
    {
        id: 'kuta-floor-lamp',
        name: 'Kuta Sculptural Floor Lamp',
        tagline: 'Soft diffused glow from a dramatic oversized circular shade',
        category: 'lighting',
        basePrice: 899,
        description: 'A statement lighting piece with an arching slender stem and brass disc reflector that casts a warm ambient backlight across interior walls.',
        dimensions: 'Dia40 x H200 cm',
        designer: 'BoConcept Studio',
        featured: false,
        bestseller: false,
        images: [
            'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80'
        ],
        swatches: SWATCH_LIBRARY.slice(0, 3)
    },
    {
        id: 'elba-outdoor-lounge',
        name: 'Elba All-Weather Outdoor Set',
        tagline: 'Resilient outdoor luxury with woven cord details',
        category: 'outdoor',
        basePrice: 1899,
        description: 'UV-resistant hydrophobic materials engineered to withstand all seasons while retaining signature Danish indoor refinement.',
        dimensions: 'W160 x D82 x H72 cm',
        designer: 'Henrik Pedersen',
        featured: false,
        bestseller: false,
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
            'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1600&q=80'
        ],
        swatches: SWATCH_LIBRARY.slice(0, 4)
    }
];
export const ROOM_SCENES = [
    {
        id: 'penthouse-living',
        title: 'The Copenhagen Penthouse',
        subtitle: 'Warm minimalist living with organic textures and natural light',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80',
        hotspots: [
            {
                id: 'hs-sofa',
                x: 78,
                y: 68,
                productId: 'bergamo-sofa',
                title: 'Bergamo Leather Sofa',
                price: 3499,
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
                description: 'Chester Cognac Aniline Leather sofa with plush modular seating.'
            },
            {
                id: 'hs-chair',
                x: 20,
                y: 62,
                productId: 'imola-chair',
                title: 'Imola Armchair',
                price: 2899,
                image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
                description: 'Nordic Scandinavian lounge armchair with matte black steel base.'
            },
            {
                id: 'hs-table',
                x: 44,
                y: 69,
                productId: 'kingston-dining-table',
                title: 'Kingston Coffee Table',
                price: 1899,
                image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
                description: 'Organic oval solid oak tabletop with tapered Danish wood legs.'
            },
            {
                id: 'hs-lamp',
                x: 21.6,
                y: 31.8,
                productId: 'kuta-floor-lamp',
                title: 'Kuta Sculptural Wall Lamp',
                price: 899,
                image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
                description: 'Brushed brass reflector casting soft ambient glow across gallery wall.'
            }
        ]
    },
    {
        id: 'nordic-dining',
        title: 'The Modernist Dining Room',
        subtitle: 'Sculptural dining tables built for unforgettable gatherings',
        image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2000&q=80',
        hotspots: [
            {
                id: 'hs-4',
                x: 50,
                y: 58,
                productId: 'kingston-dining-table',
                title: 'Kingston Dining Table',
                price: 2199,
                image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
                description: 'Smoked Danish Oak tabletop with butterfly leaf extension.'
            },
            {
                id: 'hs-5',
                x: 35,
                y: 62,
                productId: 'ottawa-dining-chair',
                title: 'Ottawa Dining Chair',
                price: 649,
                image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
                description: 'Leaf silhouette in Warm Terracotta Velvet.'
            }
        ]
    }
];
export const STORES_LOCATIONS = [
    { city: 'Toronto Flagship', address: '488 King Street West, Toronto, ON', phone: '+1 (416) 504-6299', hours: 'Mon-Sat: 10am-7pm, Sun: 11am-6pm', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
    { city: 'Vancouver Showroom', address: '1275 West 6th Avenue, Vancouver, BC', phone: '+1 (604) 683-8228', hours: 'Mon-Sat: 10am-6pm, Sun: 12pm-5pm', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80' },
    { city: 'Montreal Design District', address: '485 Richmond St, Montreal, QC', phone: '+1 (514) 788-0660', hours: 'Mon-Sat: 10am-6pm, Sun: 12pm-5pm', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80' },
    { city: 'Calgary Downtown', address: '701 11th Ave SW, Calgary, AB', phone: '+1 (403) 265-6677', hours: 'Mon-Sat: 10am-6pm, Sun: 12pm-5pm', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80' }
];
