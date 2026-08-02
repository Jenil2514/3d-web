import { ProjectItem } from '../types';

export const PROJECTS_LIST: ProjectItem[] = [
  {
    id: 'mountain-house-alta',
    title: 'MOUNTAIN HOUSE – ALTA, UTAH',
    location: 'Alta, Utah',
    mainCategory: 'architecture',
    subCategory: 'residential',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'A striking minimalist residence carved into alpine topography. Monolithic dark stone facades framed by floor-to-ceiling panoramic glass overlooking snowscapes.',
    year: '2024',
    area: '6,400 sq ft',
    architect: 'København Architecture',
    featuredFurnitureIds: ['bergamo-sofa', 'kuta-floor-lamp']
  },
  {
    id: 'flatiron-triplex',
    title: 'FLATIRON TRIPLEX',
    location: 'Flatiron District, New York',
    mainCategory: 'architecture',
    subCategory: 'residential',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Triple-height penthouse in Manhattan featuring sculptural dining pavilion, venetian plaster finishes, and curated Danish furniture compositions.',
    year: '2023',
    area: '4,800 sq ft',
    architect: 'Henrik Pedersen',
    featuredFurnitureIds: ['kingston-dining-table', 'ottawa-dining-chair']
  },
  {
    id: 'north-moore-loft',
    title: 'NORTH MOORE LOFT',
    location: 'Tribeca, New York',
    mainCategory: 'interiors',
    subCategory: 'lofts',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Converted historic brick warehouse loft with expansive light wells, chevron oak flooring, and custom modular seating arrangements.',
    year: '2023',
    area: '3,200 sq ft',
    architect: 'Morten Georgsen',
    featuredFurnitureIds: ['imola-chair', 'bordeaux-shelving-unit']
  },
  {
    id: 'dower-house',
    title: 'DOWER HOUSE',
    location: 'Berkshires, Massachusetts',
    mainCategory: 'architecture',
    subCategory: 'residential',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Cedar-clad woodland retreat integrating indoor living spaces seamlessly into dense forested surroundings with sustainable solar envelope design.',
    year: '2024',
    area: '5,100 sq ft',
    architect: 'København Studio',
    featuredFurnitureIds: ['elba-outdoor-lounge']
  },
  {
    id: 'hamptons-beach-house',
    title: 'HAMPTONS BEACH HOUSE',
    location: 'Amagansett, NY',
    mainCategory: 'interiors',
    subCategory: 'houses',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Luminous oceanfront sanctuary specified with tactile raw linens, bleached white oak, and open fire hearths facing sand dunes.',
    year: '2022',
    area: '4,200 sq ft',
    architect: 'Karim Rashid',
    featuredFurnitureIds: ['carmo-sofa', 'kuta-floor-lamp']
  },
  {
    id: 'newport-coast-house',
    title: 'NEWPORT COAST HOUSE',
    location: 'Newport Beach, CA',
    mainCategory: 'architecture',
    subCategory: 'residential',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Coastal mid-century evolution featuring custom steel pocket doors, sun-washed quartz counters, and open dining terraces.',
    year: '2023',
    area: '5,800 sq ft',
    architect: 'BoConcept Design Team',
    featuredFurnitureIds: ['kingston-dining-table']
  },
  {
    id: 'n-moore-loft',
    title: 'N. MOORE LOFT',
    location: 'New York, NY',
    mainCategory: 'interiors',
    subCategory: 'lofts',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Monochromatic urban kitchen & lounge renovation with matte black framing, warm ambient indirect lighting, and bouclé seating.',
    year: '2023',
    area: '2,900 sq ft',
    architect: 'Henrik Pedersen'
  },
  {
    id: 'sullivan-street-residence',
    title: 'SULLIVAN STREET RESIDENCE',
    location: 'SoHo, New York',
    mainCategory: 'interiors',
    subCategory: 'apartments',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Refined SoHo apartment with floor-to-ceiling sash windows, sculptural illumination, and organic curved sofas.',
    year: '2024',
    area: '2,600 sq ft',
    architect: 'Morten Georgsen',
    featuredFurnitureIds: ['bergamo-sofa']
  },
  {
    id: 'montgomery-place-townhouse',
    title: 'MONTGOMERY PLACE TOWNHOUSE',
    location: 'Brooklyn, New York',
    mainCategory: 'interiors',
    subCategory: 'townhouses',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: '5-story landmark brownstone restoration blending original moldings with crisp minimalist Danish built-in furnishings.',
    year: '2023',
    area: '5,500 sq ft',
    architect: 'København Studio'
  },
  {
    id: 'bleecker-street-loft',
    title: 'BLEECKER STREET LOFT',
    location: 'Greenwich Village, NY',
    mainCategory: 'interiors',
    subCategory: 'lofts',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Light-filled sanctuary with floating steel shelving, warm wood accent walls, and custom cognac leather upholstery.',
    year: '2024',
    area: '3,100 sq ft',
    architect: 'Karim Rashid'
  },
  {
    id: 'laight-street-loft',
    title: 'LAIGHT STREET LOFT',
    location: 'Tribeca, New York',
    mainCategory: 'interiors',
    subCategory: 'lofts',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Soaring 14-foot ceilings paired with steel framed glass partitions and curated sculptural lighting pieces.',
    year: '2023',
    area: '3,800 sq ft',
    architect: 'BoConcept Design Team'
  },
  {
    id: 'crosby-street-loft',
    title: 'CROSBY STREET LOFT',
    location: 'SoHo, New York',
    mainCategory: 'interiors',
    subCategory: 'lofts',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'A rich tactile palette featuring dark timber, fluted stone accents, and soft Scandinavian wool textiles.',
    year: '2024',
    area: '2,800 sq ft',
    architect: 'Morten Georgsen'
  },
  {
    id: 'nordic-commercial-headquarters',
    title: 'NORDIC DESIGN HEADQUARTERS',
    location: 'Copenhagen, Denmark',
    mainCategory: 'architecture',
    subCategory: 'commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Flagship commercial workspace with soaring central atrium, oak acoustic baffling, and sustainable timber construction.',
    year: '2024',
    area: '18,500 sq ft',
    architect: 'København Architecture'
  },
  {
    id: 'helsinki-flagship-store',
    title: 'HELSINKI CONCEPT SHOWROOM',
    location: 'Helsinki, Finland',
    mainCategory: 'architecture',
    subCategory: 'retail-hospitality',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Retail flagship venue combining interactive material libraries with intimate lounge spaces.',
    year: '2023',
    area: '8,200 sq ft',
    architect: 'Henrik Pedersen'
  },
  {
    id: 'fjord-new-building',
    title: 'FJORD CULTURAL COMPLEX',
    location: 'Oslo, Norway',
    mainCategory: 'architecture',
    subCategory: 'new-buildings',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'New waterfront public architecture utilizing recycled slate cladding and solar-integrated glass facades.',
    year: '2024',
    area: '22,000 sq ft',
    architect: 'København Studio'
  }
];
