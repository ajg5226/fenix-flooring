// Site-wide configuration
// Update these values with your actual business information

export const siteConfig = {
  // Business Information
  businessName: 'Fenix Flooring',
  legalName: 'Fenix Flooring LLC',
  domain: 'www.fenixflooring.com',
  url: 'https://www.fenixflooring.com',

  // Logo and default OG image (paths; full URLs built in schema/layout)
  logoUrl: '/logos/logo-color.svg',
  defaultOgImage: '/og-image.png',
  faviconPath: '/favicon.svg',
  appleTouchIconPath: '/apple-touch-icon.png',

  // Contact Information
  phone: '267-649-2883',
  phoneLink: 'tel:+12676492883',
  email: 'aaron@fenixflooring.com',

  // Address
  address: {
    street: '1200 E High St. Suite 202',
    city: 'Pottstown',
    state: 'PA',
    zip: '19464',
    country: 'US',
  },

  // Service Area (90-mile radius from Pottstown, PA; Delaware; New Jersey)
  serviceArea: 'Eastern PA, Delaware, and New Jersey',
  serviceAreaShort: 'Eastern PA, Delaware, and New Jersey',
  serviceAreaDescription: 'We serve commercial clients throughout Eastern Pennsylvania (including Philadelphia, Reading, Allentown, Lancaster), all of Delaware, New Jersey, and the surrounding region within a 90-mile radius of Pottstown.',
  serviceAreaGeo: { latitude: 40.2454, longitude: -75.6496, radiusMiles: 90 },
  
  // Business Hours
  hours: {
    weekdays: '7:00 AM - 6:00 PM',
    saturday: '8:00 AM - 2:00 PM',
    sunday: 'Closed',
    note: 'After-hours installations available by appointment',
  },
  
  // SEO Defaults
  defaultTitle: 'Professional Flooring Contractor | Fenix Flooring',
  defaultDescription: 'Turnkey commercial flooring services: demo, prep, and installation. Serving offices, healthcare, education, hospitality, and more. Licensed, insured, after-hours available.',
  
  // Social Links (update with real values)
  social: {
    linkedin: 'https://www.linkedin.com/company/fenix-flooring',
    // facebook: 'https://www.facebook.com/fenixflooring', // Disabled until page is ready
    instagram: 'https://www.instagram.com/fenixflooringpa?igsh=MTE0MWgyYzQyc2Q4MA==',
  },
  
  // Schema.org configuration
  schema: {
    organizationType: 'LocalBusiness',
    additionalType: 'https://schema.org/GeneralContractor',
    priceRange: '$$',
    foundingYear: '2020',
    numberOfEmployees: '10-50',
  },
  
  // Partners/Collaborators (update with actual partners)
  partners: [
    {
      name: 'Flooring Manufacturer Partner',
      logo: 'https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Partner+Logo',
    },
    {
      name: 'Commercial Supplier',
      logo: 'https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Partner+Logo',
    },
    {
      name: 'Industry Association',
      logo: 'https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Partner+Logo',
    },
    {
      name: 'Equipment Provider',
      logo: 'https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Partner+Logo',
    },
    {
      name: 'Material Supplier',
      logo: 'https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Partner+Logo',
    },
    {
      name: 'Certification Body',
      logo: 'https://via.placeholder.com/200x100/1a1a1a/ffffff?text=Partner+Logo',
    },
  ],
};

// Navigation configuration
export const navigation = {
  main: [
    { name: 'Services', href: '/services/' },
    { name: 'Flooring Types', href: '/flooring/' },
    { name: 'Industries', href: '/industries/' },
    { name: 'Residential', href: '/residential/' },
    { name: 'Resources', href: '/resources/' },
    { name: 'Case Studies', href: '/case-studies/' },
    { name: 'About', href: '/about/' },
    { name: 'Contact', href: '/contact/' },
  ],
  services: [
    { name: 'Commercial Installation', href: '/services/commercial-flooring-installation/' },
    { name: 'Flooring Replacement', href: '/services/commercial-flooring-replacement/' },
    { name: 'Removal & Demolition', href: '/services/flooring-removal-demolition/' },
    { name: 'Concrete Prep & Leveling', href: '/services/concrete-prep-leveling/' },
    { name: 'Moisture Mitigation', href: '/services/moisture-mitigation/' },
    { name: 'After-Hours Installation', href: '/services/after-hours-occupied-installation/' },
  ],
  flooring: [
    { name: 'LVT/LVP', href: '/flooring/lvt-lvp/' },
    { name: 'Sheet Vinyl', href: '/flooring/sheet-vinyl/' },
    { name: 'VCT', href: '/flooring/vct/' },
    { name: 'Hardwood', href: '/flooring/hardwood/' },
    { name: 'Engineered Hardwood', href: '/flooring/engineered-hardwood/' },
    { name: 'Rubber', href: '/flooring/rubber/' },
    { name: 'Tile (Ceramic/Porcelain)', href: '/flooring/tile-ceramic-porcelain/' },
    { name: 'Carpet', href: '/flooring/carpet/' },
    { name: 'Carpet Tile', href: '/flooring/carpet-tile/' },
  ],
  industries: [
    { name: 'Property Management', href: '/industries/property-management/' },
    { name: 'Office Buildings', href: '/industries/office-buildings/' },
    { name: 'Healthcare', href: '/industries/healthcare/' },
    { name: 'Education', href: '/industries/education/' },
    { name: 'Hospitality', href: '/industries/hospitality/' },
    { name: 'Retail', href: '/industries/retail/' },
    { name: 'Gyms & Fitness', href: '/industries/gyms-fitness/' },
    { name: 'Residential', href: '/residential/' },
    { name: 'Golf Courses & Banquet Halls', href: '/industries/golf-courses-banquet-halls/' },
  ],
  residential: [
    { name: 'LVT/LVP', href: '/residential/lvt-lvp/' },
    { name: 'Hardwood / Engineered Hardwood', href: '/residential/engineered-hardwood/' },
    { name: 'Carpet', href: '/residential/carpet/' },
    { name: 'Tile', href: '/residential/tile/' },
  ],
  footer: [
    { name: 'Privacy Policy', href: '/privacy/' },
    { name: 'Contact', href: '/contact/' },
  ],
};

// Form dropdown options (Project Type aligns with Industries page)
export const formOptions = {
  projectTypes: [
    'Property Management',
    'Office Buildings',
    'Healthcare',
    'Education',
    'Hospitality',
    'Retail',
    'Gyms & Fitness',
    'Residential',
    'Golf Courses & Banquet Halls',
    'Other',
  ],
  flooringTypes: [
    'LVT/LVP',
    'Sheet Vinyl',
    'VCT',
    'Hardwood',
    'Engineered Hardwood',
    'Rubber',
    'Tile',
    'Carpet',
    'Carpet Tile',
    'Other',
  ],
  timelines: [
    'ASAP',
    '1-2 weeks',
    '1 month',
    '2-3 months',
    'Planning',
  ],
};

export type SiteConfig = typeof siteConfig;
export type Navigation = typeof navigation;
export type FormOptions = typeof formOptions;
