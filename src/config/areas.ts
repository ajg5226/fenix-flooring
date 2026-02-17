/**
 * Location data for SEO landing pages.
 * Each entry drives a dynamic page at /areas/[slug]/.
 */

export interface AreaTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface AreaProject {
  title: string;
  description: string;
}

export interface AreaLocation {
  slug: string;
  city: string;
  state: string;
  stateAbbr: string;
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  intro: string;
  localContext: string;
  whyChoose: string[];
  recentProjects: AreaProject[];
  testimonials: AreaTestimonial[];
  industries: string[];
}

export const areas: AreaLocation[] = [
  {
    slug: 'philadelphia',
    city: 'Philadelphia',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    metaTitle: 'Commercial Flooring Services in Philadelphia, PA | Fenix Flooring',
    metaDescription: 'Professional commercial flooring installation, removal, and prep in Philadelphia, PA. Serving healthcare, offices, education, and hospitality. Licensed, insured, after-hours available.',
    heroSubtitle: 'Turnkey commercial flooring for the Greater Philadelphia area — from Center City offices to university campuses and hospital systems.',
    intro: 'Philadelphia is a major hub for healthcare, technology, finance, and education, and each of these sectors demands flooring that performs under heavy daily traffic. Fenix Flooring serves businesses across the city with turnkey commercial flooring services including installation, removal, sub-floor preparation, and moisture mitigation. Whether you manage a high-rise office in Market East, a medical practice in University City, or a retail space on Walnut Street, our licensed and insured crews deliver durable, professional results with minimal disruption to your operations.',
    localContext: 'From the historic cobblestones near Independence Hall and the Liberty Bell to the modern towers along the Schuylkill, Philadelphia blends centuries of history with a fast-evolving commercial landscape. Major employers like Comcast, Aramark, and Independence Blue Cross anchor a business community that expects quality and reliability — values Fenix Flooring brings to every project in the region.',
    whyChoose: [
      'After-hours and weekend installations for occupied Center City offices and retail spaces',
      'Experience with Philadelphia healthcare facilities requiring strict infection-control flooring protocols',
      'OSHA-compliant crews familiar with Philadelphia building codes and union environments',
      'Fast turnaround for tenant improvements in the competitive Philadelphia commercial market',
    ],
    recentProjects: [
      { title: 'University City Medical Office — LVT Installation', description: 'Installed 8,000 sq ft of luxury vinyl tile in a multi-suite medical office building over two weekends, allowing patient care to continue uninterrupted during the week.' },
      { title: 'Old City Boutique Hotel — Hardwood Refinishing', description: 'Refinished 4,500 sq ft of hardwood flooring in a historic boutique hotel lobby and corridors, completing all work during overnight hours to avoid guest disruption.' },
    ],
    testimonials: [
      { quote: 'Fenix handled our office renovation flooring on a tight timeline — the after-hours crew was professional and the LVT looks fantastic. Zero disruption to our staff.', name: 'R. Kapoor', role: 'Facilities Director, Center City Financial Firm' },
      { quote: 'We needed flooring that met strict healthcare standards and could withstand heavy foot traffic. Fenix delivered exactly that, on time and within budget.', name: 'S. Mitchell', role: 'Practice Manager, University City Medical Group' },
    ],
    industries: ['Healthcare', 'Finance', 'Education', 'Hospitality', 'Retail', 'Technology'],
  },
  {
    slug: 'wilmington',
    city: 'Wilmington',
    state: 'Delaware',
    stateAbbr: 'DE',
    metaTitle: 'Commercial Flooring Services in Wilmington, DE | Fenix Flooring',
    metaDescription: 'Professional commercial flooring in Wilmington, DE. Serving corporate offices, healthcare, and retail in Delaware\'s business capital. Free estimates available.',
    heroSubtitle: 'Commercial flooring solutions for Delaware\'s corporate capital — from downtown high-rises to the revitalized Riverfront District.',
    intro: 'Wilmington attracts 65% of Fortune 500 companies thanks to Delaware\'s business-friendly Court of Chancery and favorable corporate tax structure. Fintech leaders like Chase, Capital One, and Barclays maintain major operations here, while healthcare is expanding rapidly with Christiana Care and Wilmington Hospital growing their footprints. Fenix Flooring provides turnkey commercial flooring services to Wilmington businesses — installation, removal, concrete prep, and moisture mitigation — all performed by licensed, insured, OSHA-compliant crews.',
    localContext: 'Wilmington\'s architectural heritage shines in landmarks like the DuPont/Nemours Building, a historic 1908 high-rise that now houses a hotel and theater. The revitalized Riverfront District — once a WWII shipyard — has been transformed into a vibrant mixed-use destination with markets, theaters, and Frawley Stadium. As these spaces evolve, they need flooring that matches their ambition.',
    whyChoose: [
      'Deep experience with corporate office environments — the backbone of Wilmington\'s economy',
      'Healthcare-grade flooring installations for expanding medical facilities across New Castle County',
      'Phased project planning that keeps financial services firms operational during renovations',
      'Convenient proximity to Wilmington with rapid response times for urgent projects',
    ],
    recentProjects: [
      { title: 'Downtown Corporate Tower — Carpet Tile Replacement', description: 'Replaced 12,000 sq ft of worn carpet tile across three floors of a Rodney Square office tower, completing each floor in a single weekend.' },
      { title: 'Riverfront Medical Clinic — Sheet Vinyl Installation', description: 'Installed seamless sheet vinyl in a 3,200 sq ft outpatient clinic, meeting strict hygiene requirements and passing inspection on the first walkthrough.' },
    ],
    testimonials: [
      { quote: 'Our tenants barely noticed the work was happening. Fenix phased the carpet tile replacement perfectly around our building schedule.', name: 'D. Pearson', role: 'Property Manager, Downtown Wilmington Office Complex' },
      { quote: 'The sheet vinyl installation in our clinic was flawless. Clean, seamless, and completed ahead of schedule.', name: 'J. Torres', role: 'Operations Director, Riverfront Healthcare Partners' },
    ],
    industries: ['Financial Services', 'Healthcare', 'Corporate Offices', 'Legal Services', 'Hospitality'],
  },
  {
    slug: 'allentown',
    city: 'Allentown',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    metaTitle: 'Commercial Flooring Services in Allentown, PA | Fenix Flooring',
    metaDescription: 'Commercial flooring installation and replacement in Allentown, PA. Serving the Lehigh Valley\'s offices, healthcare, and industrial facilities. Free site walks.',
    heroSubtitle: 'Professional commercial flooring for the Lehigh Valley — serving Allentown\'s growing business community with turnkey solutions.',
    intro: 'Allentown is home to the global headquarters of Air Products and PPL Corporation, and its largest employer — Lehigh Valley Health Network — anchors a thriving healthcare sector. As the Lehigh Valley continues to grow as a business and logistics hub, commercial properties need flooring that can handle the pace. Fenix Flooring delivers complete commercial flooring services to Allentown businesses: demolition, sub-floor prep, moisture mitigation, and installation of LVT, hardwood, tile, rubber, and more.',
    localContext: 'The Lehigh Valley\'s growth is reflected in venues like the PPL Center, an 8,500-seat arena that hosts concerts and hockey, and Coca-Cola Park, home to the Lehigh Valley IronPigs. Cultural anchors like the Allentown Art Museum and the Baum School of Art add to a community that values quality craftsmanship — the same standard Fenix brings to every flooring project.',
    whyChoose: [
      'Experience serving healthcare facilities in the Lehigh Valley Health Network ecosystem',
      'Industrial and logistics flooring solutions for the growing warehouse sector',
      'After-hours installation capability for occupied corporate headquarters',
      'Familiar with Lehigh Valley building codes and permitting requirements',
    ],
    recentProjects: [
      { title: 'Hamilton Street Office Building — LVT Renovation', description: 'Renovated 6,500 sq ft of flooring in a multi-tenant office building on Hamilton Street, switching from dated VCT to modern luxury vinyl tile with minimal tenant disruption.' },
      { title: 'Lehigh Valley Distribution Center — Epoxy Flooring', description: 'Applied industrial epoxy coating to 15,000 sq ft of warehouse floor, completing the project over a holiday weekend to avoid operational downtime.' },
    ],
    testimonials: [
      { quote: 'The new LVT flooring transformed our office building. Tenants are thrilled with the modern look, and Fenix completed the work without any complaints from occupants.', name: 'K. Weaver', role: 'Building Owner, Hamilton District' },
      { quote: 'Fenix understood our timeline constraints and delivered a perfect epoxy floor in our distribution center over a single weekend.', name: 'M. Santos', role: 'Warehouse Operations Manager, Lehigh Valley' },
    ],
    industries: ['Healthcare', 'Corporate Headquarters', 'Logistics & Warehousing', 'Manufacturing', 'Retail'],
  },
  {
    slug: 'lancaster',
    city: 'Lancaster',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    metaTitle: 'Commercial Flooring Services in Lancaster, PA | Fenix Flooring',
    metaDescription: 'Commercial flooring in Lancaster, PA. Flooring installation for hospitality, healthcare, education, and retail in Lancaster County. Licensed and insured.',
    heroSubtitle: 'Commercial flooring for Lancaster County\'s thriving tourism, healthcare, and agricultural economy.',
    intro: 'Lancaster County welcomed 10.2 million visitors in 2024, generating $2.7 billion in spending and supporting over 26,000 jobs — making tourism a cornerstone of the local economy. Healthcare and education have seen explosive growth since 2010 (up 66% and 99% respectively), while agriculture generates $1.85 billion in annual sales. This diverse economy creates demand for commercial flooring across hotels, medical offices, schools, and farm-to-table restaurants. Fenix Flooring provides professional installation, replacement, and preparation services throughout Lancaster County.',
    localContext: 'Lancaster is home to the Lancaster Central Market, America\'s oldest continuously operating farmers\' market, in operation since the 1730s. The city\'s blend of historic architecture and modern development means flooring projects range from preserving character in century-old buildings to installing cutting-edge materials in new construction.',
    whyChoose: [
      'Hospitality flooring expertise for Lancaster\'s booming tourism industry',
      'Healthcare facility installations supporting the county\'s rapidly growing medical sector',
      'Experience with historic building renovations requiring careful sub-floor preparation',
      'Agricultural and food-processing facility flooring that meets health department standards',
    ],
    recentProjects: [
      { title: 'Downtown Lancaster Boutique Inn — Hardwood Installation', description: 'Installed 3,800 sq ft of engineered hardwood in a renovated boutique inn near the Central Market, preserving the building\'s historic character while delivering modern durability.' },
      { title: 'Lancaster Medical Campus — VCT to LVT Upgrade', description: 'Replaced aging VCT with luxury vinyl tile in a 5,000 sq ft medical office suite, completing installation over two weekends to avoid disrupting patient appointments.' },
    ],
    testimonials: [
      { quote: 'Our guests consistently compliment the new hardwood floors. Fenix was respectful of the building\'s history while delivering a beautiful, durable result.', name: 'A. Hartman', role: 'Innkeeper, Downtown Lancaster' },
      { quote: 'Switching from VCT to LVT was the best decision we made. The new flooring is easier to maintain and looks far more professional.', name: 'L. Nguyen', role: 'Office Manager, Lancaster Medical Associates' },
    ],
    industries: ['Hospitality & Tourism', 'Healthcare', 'Education', 'Agriculture & Food Processing', 'Retail'],
  },
  {
    slug: 'reading',
    city: 'Reading',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    metaTitle: 'Commercial Flooring Services in Reading, PA | Fenix Flooring',
    metaDescription: 'Commercial flooring services in Reading, PA. Installation, removal, and prep for manufacturing, healthcare, and commercial spaces. Free estimates.',
    heroSubtitle: 'Commercial flooring for Reading\'s revitalizing business district and growing manufacturing sector.',
    intro: 'Reading is experiencing a renaissance driven by its City Revitalization and Improvement Zone designation, which is fueling investment in projects like the Reading Skatepark and GoggleWorks Art Park. Manufacturing remains the city\'s largest employment sector, and companies like Reitnouer are expanding — building a 468,000 sq ft facility that will create 200 new jobs. Fenix Flooring serves Reading\'s commercial properties with complete flooring services: demolition, concrete prep, moisture mitigation, and professional installation.',
    localContext: 'Rising 886 feet above the city, the Reading Pagoda is one of Pennsylvania\'s most distinctive landmarks. Built in 1906-1907 as a luxury resort that never opened, it now stands as a symbol of Reading\'s resilience and reinvention — qualities the city carries into its current wave of economic development.',
    whyChoose: [
      'Industrial and manufacturing flooring solutions for Reading\'s largest employment sector',
      'Experience with revitalization projects in the CRIZ zone',
      'Concrete prep and moisture mitigation expertise for older industrial buildings',
      'Cost-effective solutions that meet budget requirements without compromising quality',
    ],
    recentProjects: [
      { title: 'Penn Street Commercial Building — Polished Concrete', description: 'Prepared and polished 10,000 sq ft of concrete flooring in a renovated Penn Street commercial space, transforming a former warehouse into modern office and retail space.' },
      { title: 'Reading Manufacturing Facility — Rubber Flooring', description: 'Installed 7,500 sq ft of commercial rubber flooring in a manufacturing facility, providing slip-resistant, durable surfacing for heavy equipment areas.' },
    ],
    testimonials: [
      { quote: 'Fenix turned our raw warehouse space into a polished, professional environment. The concrete work exceeded our expectations.', name: 'T. Morales', role: 'Developer, Penn Street Revitalization Project' },
      { quote: 'The rubber flooring has held up perfectly under heavy use. Our workers appreciate the comfort and safety it provides.', name: 'B. Hoffman', role: 'Plant Manager, Reading Manufacturing Co.' },
    ],
    industries: ['Manufacturing', 'Healthcare', 'Retail', 'Mixed-Use Development', 'Education'],
  },
  {
    slug: 'west-chester',
    city: 'West Chester',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    metaTitle: 'Commercial Flooring Services in West Chester, PA | Fenix Flooring',
    metaDescription: 'Commercial flooring in West Chester, PA. Serving Chester County offices, universities, and corporate campuses. Licensed, insured, OSHA-compliant crews.',
    heroSubtitle: 'Commercial flooring for Chester County\'s corporate campuses, university facilities, and historic downtown.',
    intro: 'West Chester is the county seat of Chester County and home to a diverse mix of corporate operations, educational institutions, and government facilities. Major employers include CTDI, Mars Drinks, VWR International, Synthes, and Moody\'s Analytics\' Economy.com division. QVC\'s headquarters and studios sit nearby in West Goshen, occupying the former Commodore International buildings. West Chester University\'s expanding North Campus adds additional demand for commercial flooring services. Fenix Flooring provides turnkey solutions for West Chester\'s corporate campuses, office buildings, retail spaces, and institutional facilities.',
    localContext: 'West Chester\'s architectural character is anchored by the classical revival Chester County Courthouse, built in the 1840s, and the surrounding Downtown Historic District. This blend of historic preservation and modern corporate development creates unique flooring challenges — from matching period aesthetics in renovated buildings to installing cutting-edge materials in contemporary office campuses.',
    whyChoose: [
      'Corporate campus flooring expertise for West Chester\'s Fortune 500 and mid-market employers',
      'University and institutional flooring meeting strict durability and safety requirements',
      'Historic building renovation experience in the Downtown Historic District',
      'Convenient location with fast service to all of Chester County',
    ],
    recentProjects: [
      { title: 'Chester County Corporate Campus — Carpet Tile Installation', description: 'Installed 20,000 sq ft of carpet tile across two buildings on a corporate campus, phasing work by floor to keep all offices operational.' },
      { title: 'West Chester Borough Retail Space — LVT Flooring', description: 'Installed luxury vinyl tile in a 2,800 sq ft retail space on Gay Street, completing the project in three days to meet the tenant\'s opening deadline.' },
    ],
    testimonials: [
      { quote: 'Fenix managed the phased installation across our campus perfectly. Every floor was ready on schedule, and the carpet tile quality is excellent.', name: 'C. Reynolds', role: 'Facilities Manager, Chester County Corporate Campus' },
      { quote: 'They completed our retail flooring days ahead of our grand opening. Professional work and great communication throughout.', name: 'E. Whitfield', role: 'Store Owner, Gay Street, West Chester' },
    ],
    industries: ['Corporate Offices', 'Education', 'Government', 'Retail', 'Healthcare'],
  },
  {
    slug: 'king-of-prussia',
    city: 'King of Prussia',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    metaTitle: 'Commercial Flooring Services in King of Prussia, PA | Fenix Flooring',
    metaDescription: 'Commercial flooring in King of Prussia, PA. Serving Upper Merion\'s 65,000+ job market — retail, offices, healthcare, and hospitality. Free site walks.',
    heroSubtitle: 'Commercial flooring for Philadelphia\'s largest suburban business center — offices, retail, healthcare, and hospitality.',
    intro: 'Upper Merion Township and King of Prussia form the largest commercial center in Philadelphia\'s suburbs and the region\'s third-largest employment hub, supporting over 65,000 jobs across professional services, retail, finance, hospitality, healthcare, and more. Since 2010, over $9 billion in development has fueled projects spanning office, medical, manufacturing, logistics, life sciences, pharma, retail, hospitality, entertainment, and residential sectors. Fenix Flooring serves this dynamic market with comprehensive commercial flooring services — from demolition and sub-floor prep to installation of LVT, hardwood, tile, carpet tile, rubber, and polished concrete.',
    localContext: 'King of Prussia is defined by two landmarks: the King of Prussia Mall — the third-largest mall in America with over 450 stores, 2.9 million square feet of retail space, and 22 million annual visitors — and Valley Forge National Historical Park, preserving the 3,500 acres where Washington\'s army encamped during the winter of 1777-1778. This combination of world-class retail and historic significance makes KOP a destination for both commerce and culture.',
    whyChoose: [
      'Retail flooring expertise for high-traffic environments like the King of Prussia Mall corridor',
      'Corporate office flooring for the region\'s third-largest employment hub',
      'Healthcare and life sciences facility installations meeting strict regulatory standards',
      'Hospitality flooring for hotels and entertainment venues serving 22 million annual mall visitors',
    ],
    recentProjects: [
      { title: 'Route 202 Office Park — Full Floor Renovation', description: 'Demolished existing flooring and installed 15,000 sq ft of luxury vinyl tile across a three-story office building, completing each floor in under a week.' },
      { title: 'KOP Hotel — Lobby and Corridor Tile Installation', description: 'Installed porcelain tile throughout a hotel lobby and corridor (4,200 sq ft), coordinating with hotel management to work during low-occupancy periods.' },
    ],
    testimonials: [
      { quote: 'The LVT installation completely modernized our office park. Fenix worked floor by floor so our tenants could stay in place. Highly professional.', name: 'P. Gallagher', role: 'Property Manager, Route 202 Office Complex' },
      { quote: 'Fenix understood the hospitality standard we needed. The tile work in our lobby makes a great first impression on guests.', name: 'N. Vasquez', role: 'General Manager, King of Prussia Hotel' },
    ],
    industries: ['Retail', 'Corporate Offices', 'Healthcare & Life Sciences', 'Hospitality', 'Logistics'],
  },
  {
    slug: 'harrisburg',
    city: 'Harrisburg',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    metaTitle: 'Commercial Flooring Services in Harrisburg, PA | Fenix Flooring',
    metaDescription: 'Commercial flooring in Harrisburg, PA. Serving government, healthcare, and corporate facilities in the capital region. Licensed, insured, free estimates.',
    heroSubtitle: 'Commercial flooring for Pennsylvania\'s capital region — government facilities, healthcare campuses, and corporate offices.',
    intro: 'Harrisburg is the metro center for roughly 400 communities, hosting over 45,000 businesses in a diversified economy spanning healthcare, technology, biotech, and services. Major corporations including Ahold Delhaize, ArcelorMittal Steel, HP, IBM, Hershey Foods, Harsco, Ollie\'s, Rite Aid, Tyco Electronics, and Volvo Construction Equipment operate in the region. The Commonwealth of Pennsylvania and U.S. federal government are top employers, along with Penn State Hershey Medical Center. Fenix Flooring serves the Harrisburg metro with full-service commercial flooring — installation, replacement, demolition, prep, and moisture mitigation.',
    localContext: 'The Pennsylvania State Capitol is an American Renaissance masterpiece featuring a 272-foot dome inspired by St. Peter\'s Basilica — a fitting symbol of the region\'s institutional stature. Nearby, City Island Park offers 63 acres of recreation on a river island with trails, mini golf, riverboat cruises, and baseball games. Harrisburg\'s blend of government grandeur and community character creates a market that values reliability and professionalism above all.',
    whyChoose: [
      'Government facility flooring experience with compliance for state and federal building requirements',
      'Healthcare campus installations for the Penn State Hershey Medical Center ecosystem',
      'Corporate flooring solutions for Fortune 500 operations across the capital region',
      'Understanding of government procurement timelines and specifications',
    ],
    recentProjects: [
      { title: 'Capitol Complex Office Suite — VCT Replacement', description: 'Replaced 9,000 sq ft of aging VCT with modern luxury vinyl tile in a government office suite near the Capitol Complex, completing all work during off-hours per building security requirements.' },
      { title: 'Hershey Area Medical Office — Sheet Vinyl Installation', description: 'Installed hygienic sheet vinyl in a 4,000 sq ft medical office, meeting strict healthcare facility standards and passing inspection ahead of schedule.' },
    ],
    testimonials: [
      { quote: 'Working in government facilities requires extra coordination and security clearances. Fenix handled it all smoothly and delivered excellent results.', name: 'W. Collins', role: 'Building Superintendent, Capitol Region Office Complex' },
      { quote: 'Fenix provided competitive pricing and outstanding quality for our medical office renovation. They understood healthcare compliance from day one.', name: 'H. Patel', role: 'Administrator, Greater Harrisburg Medical Practice' },
    ],
    industries: ['Government', 'Healthcare', 'Technology', 'Manufacturing', 'Corporate Services'],
  },
  {
    slug: 'dover',
    city: 'Dover',
    state: 'Delaware',
    stateAbbr: 'DE',
    metaTitle: 'Commercial Flooring Services in Dover, DE | Fenix Flooring',
    metaDescription: 'Commercial flooring in Dover, DE. Serving healthcare, education, retail, and government facilities in Delaware\'s capital. Free site walks available.',
    heroSubtitle: 'Commercial flooring for Delaware\'s capital city — healthcare, education, retail, and government facilities.',
    intro: 'Dover is Delaware\'s capital and a city where healthcare, education, and retail drive the economy — representing 15.8%, 15.0%, and 15.3% of employment respectively. Dover Air Force Base remains a major employer and logistics hub, while the city\'s status as the state capital brings substantial government facility demand. The NASCAR Cup and Xfinity races at Dover Motor Speedway draw hundreds of thousands of visitors annually, supporting a hospitality sector that demands durable, attractive flooring. Fenix Flooring provides complete commercial flooring services to Dover businesses and institutions.',
    localContext: 'Dover\'s heritage is preserved in landmarks like the Old State House, a 1791 Georgian building offering free tours and historic artifacts. Silver Lake Park provides 74 hectares of recreation including beach, fishing, and boating, while the downtown Green — anchored by Caesar Rodney\'s cenotaph — remains the civic heart of Delaware\'s capital city.',
    whyChoose: [
      'Healthcare flooring expertise for Dover\'s largest employment sector',
      'Education facility flooring meeting safety and durability requirements',
      'Government building experience with compliance for state facility standards',
      'Retail and hospitality flooring serving Dover\'s NASCAR and tourism economy',
    ],
    recentProjects: [
      { title: 'Dover Medical Plaza — LVT Installation', description: 'Installed 5,500 sq ft of luxury vinyl tile in a medical plaza, coordinating installation around patient schedules to maintain uninterrupted clinic operations.' },
      { title: 'Downtown Dover Retail Center — Tile Flooring', description: 'Installed ceramic tile in a 3,000 sq ft retail space near the downtown Green, delivering a clean, professional finish that matches the historic district\'s character.' },
    ],
    testimonials: [
      { quote: 'Fenix coordinated around our clinic hours perfectly. The LVT is beautiful, easy to clean, and our patients notice the improvement immediately.', name: 'F. Williams', role: 'Practice Manager, Dover Medical Associates' },
      { quote: 'Professional, on time, and the tile work is outstanding. Fenix made the renovation process easy from start to finish.', name: 'G. Caruso', role: 'Retail Property Owner, Downtown Dover' },
    ],
    industries: ['Healthcare', 'Education', 'Government', 'Retail', 'Hospitality'],
  },
  {
    slug: 'westchester-county-ny',
    city: 'Westchester County',
    state: 'New York',
    stateAbbr: 'NY',
    metaTitle: 'Commercial Flooring Services in Westchester County, NY | Fenix Flooring',
    metaDescription: 'Commercial flooring in Westchester County, NY. Serving corporate campuses, healthcare, and biotech facilities. Professional installation with minimal disruption.',
    heroSubtitle: 'Commercial flooring for Westchester County\'s Fortune 500 campuses, biotech hubs, and premium commercial spaces.',
    intro: 'Westchester County sits just north of New York City and is home to Fortune 500 headquarters including MasterCard and PepsiCo in Purchase, IBM in Armonk, ITT Corporation and Universal American in White Plains, Jarden in Rye, and Regeneron Pharmaceuticals in Tarrytown. The county is developing a major biotechnology hub — a planned 3 million square foot campus adjacent to Westchester Medical Center in Valhalla, with $1.2 billion invested and 12,000 anticipated jobs. Fenix Flooring serves Westchester\'s premium commercial market with professional flooring installation, replacement, and preparation services.',
    localContext: 'Westchester\'s prestige is reflected in landmarks like Kykuit, the Rockefeller family estate overlooking the Hudson River, and Lyndhurst, a stunning Gothic Revival mansion in Tarrytown. The Old Dutch Church of Sleepy Hollow connects the county to its legendary literary heritage. With its high median income and demanding commercial standards, Westchester expects nothing less than exceptional quality — a standard Fenix is built to deliver.',
    whyChoose: [
      'Fortune 500 campus flooring experience meeting the highest corporate standards',
      'Biotech and pharmaceutical facility installations with cleanroom-adjacent capabilities',
      'Healthcare flooring for the expanding Westchester Medical Center ecosystem',
      'Premium materials and meticulous craftsmanship matching Westchester\'s quality expectations',
    ],
    recentProjects: [
      { title: 'White Plains Corporate Office — Carpet Tile Upgrade', description: 'Replaced 18,000 sq ft of carpet tile across four floors of a White Plains corporate headquarters, completing each floor over a weekend to avoid any business disruption.' },
      { title: 'Tarrytown Medical Research Facility — Specialty Flooring', description: 'Installed ESD-safe vinyl flooring in a 6,000 sq ft research laboratory, meeting strict anti-static requirements for sensitive medical equipment.' },
    ],
    testimonials: [
      { quote: 'We have exacting standards for our corporate spaces. Fenix met every one of them — the carpet tile installation was flawless across all four floors.', name: 'J. Brennan', role: 'VP of Facilities, White Plains Corporate HQ' },
      { quote: 'Finding a contractor who understands lab flooring requirements is rare. Fenix delivered exactly what we specified, on schedule.', name: 'Dr. L. Chen', role: 'Lab Director, Tarrytown Research Campus' },
    ],
    industries: ['Corporate Headquarters', 'Biotechnology', 'Pharmaceuticals', 'Healthcare', 'Financial Services'],
  },
  {
    slug: 'york',
    city: 'York',
    state: 'Pennsylvania',
    stateAbbr: 'PA',
    metaTitle: 'Commercial Flooring Services in York, PA | Fenix Flooring',
    metaDescription: 'Commercial flooring in York, PA. Serving manufacturing, healthcare, and education facilities in the White Rose City. Licensed, insured, free estimates.',
    heroSubtitle: 'Commercial flooring for the White Rose City — manufacturing floors, healthcare facilities, and historic renovations.',
    intro: 'York, known as the White Rose City, sits at the crossroads of I-83 and Route 30, connecting to Philadelphia, Baltimore, and Washington, D.C. With a population of approximately 44,000 and a median age of 31, York has a young, active workforce concentrated in manufacturing, healthcare, and education. Manufacturing leaders like Harley-Davidson, Dentsply Sirona, and York International (HVAC) maintain major operations here, while WellSpan York Hospital and York College anchor the healthcare and education sectors. Fenix Flooring provides complete commercial flooring services to York\'s diverse business community.',
    localContext: 'York holds a unique place in American history — it served as the U.S. capital for nine months during 1777-1778, and this heritage is preserved in the Colonial Complex featuring the Golden Plough Tavern (1741), the General Gates House, and the Colonial Courthouse. The city also boasts a high quality of life with parks and trails along the Susquehanna River and hosts the York Fair, one of the oldest fairs in the United States.',
    whyChoose: [
      'Manufacturing and industrial flooring expertise for York\'s largest employment sector',
      'Healthcare installations supporting the WellSpan Health network',
      'Education facility flooring for York College and area schools',
      'Strategic location providing efficient service from Pottstown to the York-Harrisburg corridor',
    ],
    recentProjects: [
      { title: 'York Industrial Park — Epoxy and Rubber Flooring', description: 'Installed a combination of epoxy and rubber flooring in a 12,000 sq ft manufacturing facility, providing chemical-resistant surfaces in production areas and slip-resistant rubber in walkways.' },
      { title: 'Downtown York Medical Office — LVT Renovation', description: 'Renovated a 3,500 sq ft medical office with luxury vinyl tile, replacing worn carpet with a hygienic, easy-to-maintain surface that meets healthcare standards.' },
    ],
    testimonials: [
      { quote: 'Our manufacturing floor takes a beating every day. The epoxy and rubber combination Fenix installed has held up perfectly — exactly what we needed.', name: 'R. Becker', role: 'Operations Manager, York Manufacturing Facility' },
      { quote: 'Fenix transformed our medical office. The LVT looks professional and is so much easier to keep clean than our old carpet.', name: 'K. Straub', role: 'Practice Owner, Downtown York Medical' },
    ],
    industries: ['Manufacturing', 'Healthcare', 'Education', 'Automotive', 'HVAC'],
  },
];

export function getAreaBySlug(slug: string): AreaLocation | undefined {
  return areas.find((a) => a.slug === slug);
}
