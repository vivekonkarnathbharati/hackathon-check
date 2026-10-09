import { DemoPreset } from '../types';

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'pune-night-transit',
    title: 'Pune: Night Transit & Safe Routes',
    subtitle: 'Viman Nagar to Hinjawadi Phase 1 at 11:30 PM',
    tag: 'Night Transit & Safety',
    iconName: 'Moon',
    inputPrompt: `I am traveling from Viman Nagar to Hinjawadi IT Park Phase 1 tonight around 11:30 PM in Pune. Looking for the safest route, reliable cab pickup spots, active 24/7 food stops along the bypass, and areas with low lighting or highway construction bottlenecks to strictly avoid.`,
    sampleReport: {
      city: 'Pune, Maharashtra',
      timestamp: 'Today, 23:30 IST',
      summary: 'Late-night inter-corridor transit between Eastern suburbs and Western IT hub. Highway stretches (Katraj-Dehu Bypass) experience high truck density and spotty lighting near Bavdhan bridge, but expressway spine and Metro lines via Shivajinagar offer secure, high-visibility corridors.',
      safetyScore: 84,
      safetyLevel: 'Safe',
      safeRoutes: [
        'Prefer Viman Nagar -> Pune Metro Line 2 (Ruby Hall Clinic) -> Pune Station, then switch to verified Uber/Ola with active live-tracking.',
        'Take the University Flyover -> Baner High Street -> Wakad Bridge corridor. Baner High Street has active patrol and continuous 24/7 lighting.',
        'Avoid desolate service lanes under Bavdhan Flyover post midnight; stick strictly to the central elevated highway lanes.',
        'Use designated App Cab Pick-up Bay at Phoenix Marketcity or Hyatt junction for well-lit departures.'
      ],
      culturalAndFoodSpots: [
        {
          name: 'Nal Stop Poha & Chai Stalls',
          type: 'Late Night Street Food Hub',
          budget: '₹40 - ₹80 per person',
          vibe: 'Bustling, warm, student and night-shift crowd',
          description: 'Famous early-morning and late-night Tarri Poha and Masala Chai spot with steady police presence.',
          bestTime: '11:00 PM - 4:00 AM'
        },
        {
          name: 'The French Window Patisserie (Koregaon Park / Late Takeaway)',
          type: 'Boutique Bakery / Cafe',
          budget: '₹250 - ₹450',
          vibe: 'Cozy, artisanal, secure lane',
          description: 'Quiet enclave ideal for a relaxing stopover before the cross-city commute.',
          bestTime: '9:00 PM - 11:30 PM'
        },
        {
          name: 'Irani Cafe (Prabhat Road & Baner)',
          type: 'Iconic Iranian Cafe & Bun Maska',
          budget: '₹100 - ₹200',
          vibe: 'Nostalgic, vibrant, family & commuter friendly',
          description: 'Famous for Bun Maska, Irani Chai, and Keema Pav with high turnover and bright seating.',
          bestTime: '6:00 AM - 11:45 PM'
        },
        {
          name: 'Midnight Express Food Court (Hinjawadi Phase 1)',
          type: '24/7 IT Eatery Corridor',
          budget: '₹120 - ₹250',
          vibe: 'High-tech corporate night owls, well-lit cafeteria security',
          description: 'Safe haven for tech workers with continuous private security patrols.',
          bestTime: 'All Night (24 Hours)'
        }
      ],
      comparisonMatrix: {
        recommended: [
          {
            name: 'Baner Road -> Wakad Highway Link',
            reason: 'Bright street lighting, heavy civilian traffic until 1 AM, and prominent police checkpoints.',
            score: '9.2 / 10'
          },
          {
            name: 'Pune Metro + Verified Cab Intermodal',
            reason: 'CCTV covered stations, zero road risk during initial 14 km transit.',
            score: '8.8 / 10'
          },
          {
            name: 'Aundh DP Road Connector',
            reason: 'Smooth asphalt, multiple hospital emergency corridors with 24/7 activity.',
            score: '8.5 / 10'
          }
        ],
        avoidOrCaution: [
          {
            name: 'Pashan-Sus Dark Underpass',
            reason: 'Low illumination, non-functional CCTV nodes, and intermittent phone signal drops.',
            risk: 'Moderate crime risk & limited rescue access post midnight'
          },
          {
            name: 'Wakad Old Service Road (Peth Bypass)',
            reason: 'Unmarked speed breakers, heavy container truck parking blocking visibility.',
            risk: 'Road hazard & blind spots'
          },
          {
            name: 'Unregulated shared six-seater autos at Hinjawadi Chowk',
            reason: 'Lack of GPS tracking and overcrowding.',
            risk: 'Transit vulnerability & fare gouging'
          }
        ]
      },
      smartAlerts: [
        {
          type: 'Safety',
          message: 'Active Pune Police barricade and breathalyzer checks at University Circle and Wakad Octroi.',
          severity: 'Medium'
        },
        {
          type: 'Traffic',
          message: 'Heavy interstate goods vehicles congestion on NH48 between Chandani Chowk and Pashan exit.',
          severity: 'High'
        },
        {
          type: 'Weather',
          message: 'Cool breeze (21°C), clear visibility, dry road conditions across Western Pune.',
          severity: 'Low'
        }
      ],
      transitSteps: [
        {
          step: 1,
          mode: 'Cab',
          title: 'Board at Viman Nagar Main Arcade',
          instruction: 'Request cab inside the commercial lane, verify driver vehicle number and enable in-app ride share PIN.',
          eta: '10 mins'
        },
        {
          step: 2,
          mode: 'Metro',
          title: 'Shivajinagar Interchange (Optional rapid bypass)',
          instruction: 'Fast track past city center bottlenecks without traffic delay.',
          eta: '18 mins'
        },
        {
          step: 3,
          mode: 'Cab',
          title: 'University Circle -> Baner Arterial',
          instruction: 'Cruise through well-lit high-street artery; avoid narrow rural alleys behind Balewadi stadium.',
          eta: '25 mins'
        },
        {
          step: 4,
          mode: 'Walk',
          title: 'Hinjawadi Phase 1 Security Gate Arrival',
          instruction: 'Alight directly at campus turnstiles with company RFID badge ready.',
          eta: '5 mins'
        }
      ],
      quickStats: {
        chaosIndex: 28,
        peakHoursWarning: 'Low congestion post 22:45 PM',
        weatherCondition: '21°C Clear Skies',
        emergencyHelpline: 'Pune Police: 112 / Women Helpline: 1091'
      }
    }
  },
  {
    id: 'old-city-heritage-food',
    title: 'Old City: Heritage & Street Food on a Budget',
    subtitle: 'Wada Architecture, Historic Peths & Iconic Street Eats',
    tag: 'Culture & Budget Bites',
    iconName: 'Compass',
    inputPrompt: `Planning a walking exploration of the Historic Old City (Kasba Peth, Shanivar Wada, Tulshibaug) on a budget under ₹400. Want authentic Marathi street food, historic monuments, best photo vantage points, and guidance on how to navigate packed pedestrian alleys without getting lost in bazaar chaos.`,
    sampleReport: {
      city: 'Old Pune / Historic Peths',
      timestamp: 'Today, 09:30 IST',
      summary: 'A sensory whirlwind of centuries-old Maratha history, wooden wadas, vibrant brass markets, and irresistible aroma of piping hot Misal Pav. Alleys are narrow and vehicle access is restricted, making walking and electric feeder rickshaws the optimal navigation choice.',
      safetyScore: 92,
      safetyLevel: 'Safe',
      safeRoutes: [
        'Start at Shaniwar Wada North Gate, follow the heritage walkway toward Lal Mahal, then straight into Kasba Ganpati.',
        'Use Laxmi Road as your main orientation compass line — if disoriented in narrow gallis, walk south towards Laxmi Road.',
        'Pedestrianize through Tulshibaug between 10 AM and 1 PM before peak afternoon festival shopping crowds pack the lanes.',
        'Keep backpacks in front and use digital UPI payments for quick hassle-free transactions at street carts.'
      ],
      culturalAndFoodSpots: [
        {
          name: 'Shaniwar Wada & Lal Mahal',
          type: '18th-century Peshwa Fortification',
          budget: '₹25 entry ticket',
          vibe: 'Regal, historic, sprawling lawns and stone fortifications',
          description: 'The historic seat of the Peshwa rulers, featuring majestic fortified ramparts and fountain foundations.',
          bestTime: '9:00 AM - 11:30 AM'
        },
        {
          name: 'Katakirr / Vaidya Upahar Gruha',
          type: 'Legendary Misal Pav Institution',
          budget: '₹80 - ₹120',
          vibe: 'Spicy, fiery, communal seating, deep heritage',
          description: 'Serving traditional Puneri Misal with fiery Tarri, pohe base, and crisp farsan since 1910.',
          bestTime: '8:30 AM - 12:00 PM'
        },
        {
          name: 'Sujata Mastani (Sadashiv Peth)',
          type: 'Iconic Puneri Dessert Drink',
          budget: '₹90 - ₹140',
          vibe: 'Rich, celebratory, decadent mango & dry fruit ice-cream shake',
          description: 'A Pune original creation named after warrior queen Mastani; thick custard-like ice-cream drink.',
          bestTime: '1:00 PM - 5:00 PM'
        },
        {
          name: 'Vishrambaug Wada & Kasba Ganpati',
          type: 'Historic Mansion & Oldest City Temple',
          budget: 'Free entry',
          vibe: 'Intricate wood-carved Peshwa architecture & spiritual tranquility',
          description: 'Three-story wooden mansion built in 1807 featuring magnificent teak pillars and traditional courtyards.',
          bestTime: '10:00 AM - 2:00 PM'
        }
      ],
      comparisonMatrix: {
        recommended: [
          {
            name: 'Kasba Peth Artisan Walk',
            reason: 'Rich copper craftsmen (Tambat Ali) forging traditional vessels, deeply authentic cultural encounter.',
            score: '9.6 / 10'
          },
          {
            name: 'Vaidya Upahar Gruha',
            reason: 'Authentic green-chilli misal recipe preserved across 4 generations, incredible value.',
            score: '9.3 / 10'
          },
          {
            name: 'Pune Smart City Heritage Signage Circuit',
            reason: 'QR-coded historical markers with multi-lingual audio stories at every monument.',
            score: '8.9 / 10'
          }
        ],
        avoidOrCaution: [
          {
            name: 'Taking four-wheeler cars into Tulshibaug',
            reason: 'Extreme vehicle entrapment risk; streets narrow down to 6 feet with bumper-to-bumper pedestrian flow.',
            risk: 'Severe gridlock (1-2 hour stall) and towing penalties'
          },
          {
            name: 'Unregulated imitation sweets stalls outside main gates',
            reason: 'Stale mawa and synthetic syrup usage during warm afternoons.',
            risk: 'Food safety / upset stomach'
          },
          {
            name: 'Raviwar Peth wholesale lane during 5 PM loading hours',
            reason: 'Hand-pulled cargo carts and heavy loading tempo congestion.',
            risk: 'Crowd crush and pedestrian collision hazard'
          }
        ]
      },
      smartAlerts: [
        {
          type: 'Traffic',
          message: 'No-vehicle zone enforced inside Tulshibaug inner alleyways; park two-wheelers at Mandai multi-level parking.',
          severity: 'Medium'
        },
        {
          type: 'Safety',
          message: 'Watch out for pocket picking in dense shopping clusters around Laxmi Road jewelry quarter.',
          severity: 'Low'
        },
        {
          type: 'Weather',
          message: 'Sunny and warm (31°C) midday; carry hydration and wear breathable cotton clothing.',
          severity: 'Low'
        }
      ],
      transitSteps: [
        {
          step: 1,
          mode: 'Metro',
          title: 'Arrive via Mandai or Budhwar Peth Metro Station',
          instruction: 'De-board underground station and emerge directly onto the heritage pedestrian perimeter.',
          eta: 'Instant access'
        },
        {
          step: 2,
          mode: 'Walk',
          title: 'Shaniwar Wada Ramparts Tour',
          instruction: 'Enter through Delhi Darwaja, explore the fountain garden ruins, and visit Lal Mahal across the road.',
          eta: '45 mins'
        },
        {
          step: 3,
          mode: 'Walk',
          title: 'Tambat Ali Coppersmiths & Kasba Ganpati',
          instruction: 'Listen to the rhythmic hammering of coppersmiths crafting traditional brass water pots.',
          eta: '30 mins'
        },
        {
          step: 4,
          mode: 'Walk',
          title: 'Mandai Market & Sujata Mastani Finale',
          instruction: 'End your trail with refreshing Mastani drink and freshly roasted peanuts at iconic Phule Mandai.',
          eta: '40 mins'
        }
      ],
      quickStats: {
        chaosIndex: 64,
        peakHoursWarning: 'Crowd density peaks 5:00 PM - 8:30 PM',
        weatherCondition: '31°C Sunny',
        emergencyHelpline: 'Mandai Police Chowki: 020-24451200'
      }
    }
  },
  {
    id: 'monsoon-rush-hour',
    title: 'Monsoon Rush Hour: Traffic & Waterlogging Alert',
    subtitle: 'South Bridge & Tech Corridors during torrential cloudburst',
    tag: 'Emergency & Weather Alert',
    iconName: 'CloudRain',
    inputPrompt: `Heavy monsoon downpour just started in the city during peak 6 PM rush hour. Commuting from Yerawada tech park to Kothrud. Need real-time flood warning, waterlogged underpass alerts, bridge closures over Mula-Mutha river, and safe elevated bypass routes.`,
    sampleReport: {
      city: 'Pune Metropolitan Red-Alert Zone',
      timestamp: 'Today, 18:15 IST (Monsoon Flash Report)',
      summary: 'CRITICAL MONSOON COMMUTE ADVISORY: Cloudburst intensity 48mm/hr recorded over Central Pune. Mula-Mutha river discharge at Khadakwasla dam increased to 24,000 cusecs. Multiple railway underpasses and riverbed causeways are experiencing acute waterlogging up to 2.5 feet.',
      safetyScore: 48,
      safetyLevel: 'Moderate Caution',
      safeRoutes: [
        'Take elevated Karve Road Flyover and Pune Metro Line 2 directly into Kothrud instead of surface riverbed roads.',
        'STRICTLY AVOID Baba Bhide Bridge and Z-Bridge causeway; river swelling has triggered precautionary municipal barricades.',
        'Use Sangamwadi BRTS elevated corridor to bypass flooded low-lying bottlenecks at Bund Garden junction.',
        'If stranded in vehicle, do not crank engine if water level breaches exhaust pipe; seek shelter on upper floor commercial concourses.'
      ],
      culturalAndFoodSpots: [
        {
          name: 'Vaishali (FC Road)',
          type: 'Sheltered Iconic South Indian Cafe',
          budget: '₹120 - ₹220',
          vibe: 'Warm, cozy, filter coffee sanctuary in the rain',
          description: 'Elevated ground floor protects against flooding; world famous SPDP and hot steaming filter coffee.',
          bestTime: 'Safe haven during storm'
        },
        {
          name: 'Wadeshwar (FC Road & Law College Road)',
          type: 'Monsoon Chai & Ghee Poha',
          budget: '₹80 - ₹160',
          vibe: 'Sheltered veranda, rain patter, sizzling Ghee Roast Dosa',
          description: 'High elevation away from river basin, equipped with power backup and clean drinking water.',
          bestTime: 'Rain shelter & dinner'
        },
        {
          name: 'Chitale Bandhu (Deccan Gymkhana)',
          type: 'Packaged Comfort Snacks',
          budget: '₹60 - ₹200',
          vibe: 'Brisk, dry, legendary Bakarwadi and Mango Barfi',
          description: 'Pick up dry rations and snacks before heading into transit delays.',
          bestTime: 'Pre-journey supply stop'
        }
      ],
      comparisonMatrix: {
        recommended: [
          {
            name: 'Pune Metro Aqua Line (Ruby Hall -> Vanaz)',
            reason: '100% immune to road waterlogging, continuous 8-minute train frequency, fully operational power grid.',
            score: '9.8 / 10'
          },
          {
            name: 'Senapati Bapat Road -> Paud Road via Flyover',
            reason: 'Natural hill elevation, efficient storm-water drainage, zero standing pools.',
            score: '8.4 / 10'
          },
          {
            name: 'Law College Road Corridor',
            reason: 'High elevation at the base of ARAI Tekdi hill, bypasses city-center drains.',
            score: '8.0 / 10'
          }
        ],
        avoidOrCaution: [
          {
            name: 'Bhide Causeway & Deccan Riverbed Road',
            reason: 'River backflow water level exceeding 3 feet; submerged barriers and stranded motorbikes.',
            risk: 'Severe drowning hazard & total vehicle submersion'
          },
          {
            name: 'RTO Railway Underpass & Sangam Bridge Dip',
            reason: 'Faulty submersible pumps causing 2.5 feet water collection under rail tracks.',
            risk: 'Engine hydrostatic lock & dead electric systems'
          },
          {
            name: 'Nagar Road Shastri Nagar Dip',
            reason: 'Severe curb runoff and invisible open storm drains.',
            risk: 'Pedestrian falling hazard & bumper jams'
          }
        ]
      },
      smartAlerts: [
        {
          type: 'Weather',
          message: 'IMD Orange Alert: Rainfall forecast 65mm+ over next 3 hours with gusty winds and lightning.',
          severity: 'High'
        },
        {
          type: 'Traffic',
          message: 'Average vehicle speed reduced to 8 km/h on JM Road, FC Road, and Deccan Gymkhana circle.',
          severity: 'High'
        },
        {
          type: 'Safety',
          message: 'Fallen tree branches reported on Prabhat Road Lane 4; municipal tree-fall squads dispatched.',
          severity: 'Medium'
        }
      ],
      transitSteps: [
        {
          step: 1,
          mode: 'Walk',
          title: 'Shelter in Yerawada Metro Station',
          instruction: 'Proceed immediately up the escalator concourse out of ground-level street flooding.',
          eta: '4 mins'
        },
        {
          step: 2,
          mode: 'Metro',
          title: 'Metro Transit via Civil Court Interchange',
          instruction: 'Switch elevated tracks to Line 2 toward Vanaz; avoid all road bridge crossings.',
          eta: '22 mins'
        },
        {
          step: 3,
          mode: 'Metro',
          title: 'Alight at Ideal Colony or Vanaz Station',
          instruction: 'Arrive safely in Kothrud high-ground without touching waterlogged river causeways.',
          eta: 'Instant'
        },
        {
          step: 4,
          mode: 'Walk',
          title: 'Short elevated walk with umbrella',
          instruction: 'Stick to well-lit footpaths away from roadside electric transformer poles.',
          eta: '8 mins'
        }
      ],
      quickStats: {
        chaosIndex: 94,
        peakHoursWarning: 'Severe transit gridlock across all river crossings',
        weatherCondition: 'Torrential Rain (48mm/h)',
        emergencyHelpline: 'Disaster Cell: 020-25501269 / NDRF: 1077'
      }
    }
  }
];
