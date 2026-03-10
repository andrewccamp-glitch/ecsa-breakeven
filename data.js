// ECSA East Breakeven Tool — Data Layer
// Generated 2026-03-06

const ECSA_DATA = {

  // ── Vessel Specifications (Baltic Exchange MR50 standard) ──
  vessel: {
    name: "MR50 (Baltic Standard)",
    dwt: 50000,
    cargoSAIndia: 40000,       // SA→India cargo (mt)
    cargoMRonLR1: 45000,       // MR on LR1 routes (mt)
    ladenSpeed: 13.0,          // knots (Baltic: 13kn on 23.3mt MFO)
    ballastSpeed: 12.0,        // knots (Baltic: 12kn on 17.0mt MFO)
    ladenCons: 23.3,           // mt/day VLSFO (Baltic MR50 laden)
    ballastCons: 17.0,         // mt/day VLSFO (Baltic MR50 ballast)
    portConsLoad: 5.0,         // mt/day at load port
    portConsDisch: 25.0,       // mt/day at discharge port (heating/pumping)
    portConsWait: 5.0,         // mt/day waiting
    commissionPct: 3.75,
    seaMargin: 1.05,           // 5% sea margin
    riverDays: 1.0,            // Paraná river transit each way (reduced speed)
    cleaningCost: 25000,       // per cleaning ($)
    cleaningDays: 1.0,         // per cleaning (days)
  },

  // ── Laytime (SA→India charterparty standard) ──
  laytime: {
    loadHours: 200,            // 200 hours loading
    dischHours: 200,           // 200 hours discharging
    get loadDays() { return this.loadHours / 24; },   // ~8.33 days
    get dischDays() { return this.dischHours / 24; },  // ~8.33 days
  },

  // ── TC Route Definitions ──
  routes: {
    TC2:  { desc: "Continent → USAC 37kt",         loadPort: "Rotterdam",  dischPort: "New York",      cargo: 37000,  vesselClass: "MR",  ballastBack: "Houston",    usesSuez: false },
    TC5:  { desc: "MEG → Japan 55kt (LR1)",         loadPort: "Ras Tanura", dischPort: "Yokohama",      cargo: 55000,  vesselClass: "LR1", ballastBack: "Ras Tanura", usesSuez: false },
    TC6:  { desc: "Algeria → Med 30kt (Handy)",     loadPort: "Skikda",     dischPort: "Lavera",        cargo: 30000,  vesselClass: "Small",ballastBack: "Skikda",    usesSuez: false },
    TC12: { desc: "WCI → Japan 55kt (LR1)",         loadPort: "Mundra",     dischPort: "Yokohama",      cargo: 55000,  vesselClass: "LR1", ballastBack: "Mundra",     usesSuez: false },
    TC14: { desc: "USG → Continent 38kt",           loadPort: "Houston",    dischPort: "Amsterdam",     cargo: 38000,  vesselClass: "MR",  ballastBack: "Rotterdam",  usesSuez: false },
    TC17: { desc: "AG → East Africa 35kt",          loadPort: "Ras Tanura", dischPort: "Dar es Salaam", cargo: 35000,  vesselClass: "MR",  ballastBack: "Ras Tanura", usesSuez: false },
  },

  // ── Opening Positions & Competition Mapping ──
  // competingRoutes: routes the MR could do instead of SA→India
  // nextVoyage: what the MR does after the competing route
  openingPositions: {
    // ECSA
    "Mejillones":  { region: "Chile",        competingRoutes: ["TC14"], nextVoyage: { TC14: "TC2" } },
    "Recalada":    { region: "Argentina",    competingRoutes: ["TC14"], nextVoyage: { TC14: "TC2" } },
    "Santos":      { region: "Brazil",       competingRoutes: ["TC14"], nextVoyage: { TC14: "TC2" } },
    "Aratu":       { region: "Brazil",       competingRoutes: ["TC14", "TC2", "TC6"], nextVoyage: { TC14: "TC2", TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    // WCSA
    "Callao":      { region: "Peru",         competingRoutes: ["TC14"], nextVoyage: { TC14: "TC2" } },
    "San Antonio": { region: "Chile",        competingRoutes: ["TC14"], nextVoyage: { TC14: "TC2" } },
    // WAF
    "Accra":       { region: "Ghana",        competingRoutes: ["TC14", "TC2", "TC6"], nextVoyage: { TC14: "TC2", TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    "Lagos":       { region: "Nigeria",      competingRoutes: ["TC14", "TC2", "TC6"], nextVoyage: { TC14: "TC2", TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    "Abidjan":     { region: "Ivory Coast",  competingRoutes: ["TC14", "TC2", "TC6"], nextVoyage: { TC14: "TC2", TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    "Dakar":       { region: "Senegal",      competingRoutes: ["TC14", "TC2", "TC6"], nextVoyage: { TC14: "TC2", TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    "Luanda":      { region: "Angola",       competingRoutes: ["TC14", "TC2", "TC6"], nextVoyage: { TC14: "TC2", TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    // Europe / Med
    "Las Palmas":  { region: "Canaries",     competingRoutes: ["TC2", "TC6"], nextVoyage: { TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    "Rotterdam":   { region: "NW Europe",    competingRoutes: ["TC2", "TC6"], nextVoyage: { TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    "Lavera":      { region: "Mediterranean",competingRoutes: ["TC6"], nextVoyage: { TC6: "BEST_TC6_TC2" } },
    // US
    "New Orleans": { region: "US Gulf",      competingRoutes: ["TC14"], nextVoyage: { TC14: "TC2" } },
    "New York":    { region: "US Atlantic",  competingRoutes: ["TC14", "TC2"], nextVoyage: { TC14: "TC2", TC2: "TC14" } },
    // South Africa
    "Durban":      { region: "South Africa", competingRoutes: ["TC17", "TC14"], nextVoyage: { TC17: "TC17", TC14: "TC2" } },
  },

  // ── SA→India voyage structure ──
  saIndiaVoyage: {
    loadPorts: [
      { name: "Timbues", cargo: 30000, isRiver: true },
      { name: "Paranagua", cargo: 10000, isRiver: false },
    ],
    dischOptions: {
      WCI: { ports: ["Mundra", "Kandla"], label: "West Coast India" },
      ECI: { ports: ["Chennai", "Haldia"], label: "East Coast India" },
    },
    ballastAfter: "Ras Tanura",  // always ballast to AG after discharge
    nextVoyageOptions: ["TC17", "TC5", "TC12"],  // pick best from AG
  },

  // ── Destination Regions (for "To Destination" range map mode) ──
  // Each region: 2 discharge ports, post-discharge ballast hub, next voyage options
  destinationRegions: {
    WCI:    { label: "West Coast India",  ports: ["Mundra", "Kandla"],        ballastAfter: "Ras Tanura", nextVoyageOptions: ["TC17", "TC5", "TC12"] },
    ECI:    { label: "East Coast India",  ports: ["Chennai", "Haldia"],       ballastAfter: "Ras Tanura", nextVoyageOptions: ["TC17", "TC5", "TC12"] },
    SChina: { label: "South China",       ports: ["Zhanjiang", "Huizhou"],    ballastAfter: "Ras Tanura", nextVoyageOptions: ["TC17", "TC5", "TC12"] },
    NChina: { label: "North China",       ports: ["Qingdao", "Tianjin"],      ballastAfter: "Ras Tanura", nextVoyageOptions: ["TC17", "TC5", "TC12"] },
    Peru:   { label: "Peru",              ports: ["Callao", "La Pampilla"],   ballastAfter: "Houston",    nextVoyageOptions: ["TC14"],                panamaBalAfter: true },
    USG:    { label: "US Gulf",           ports: ["Houston", "New Orleans"],   ballastAfter: "Houston",    nextVoyageOptions: ["TC14"] },
    NYH:    { label: "New York Harbor",   ports: ["New York", "Philadelphia"], ballastAfter: "Houston",    nextVoyageOptions: ["TC14"] },
    NLD:    { label: "Netherlands",       ports: ["Rotterdam", "Amsterdam"],   ballastAfter: "Rotterdam",  nextVoyageOptions: ["TC2"] },
    SSpain: { label: "South Spain",       ports: ["Algeciras", "Huelva"],     ballastAfter: "Skikda",     nextVoyageOptions: ["TC6", "TC2"] },
  },

  // ── Distance Matrix (nm) ──
  // Includes existing + new distances for ECSA tool
  distances: {
    // === Opening positions → Timbues (SA load port) ===
    // ECSA
    "Mejillones|Timbues":    6200,
    "Recalada|Timbues":      180,
    "Santos|Timbues":        1300,
    "Aratu|Timbues":         2500,
    // WCSA
    "Callao|Timbues":        6800,    // via Cape Horn
    "San Antonio|Timbues":   5600,    // via Cape Horn (closer than Mejillones)
    // WAF
    "Accra|Timbues":         4800,
    "Lagos|Timbues":         4300,
    "Abidjan|Timbues":       4500,
    "Dakar|Timbues":         5000,
    "Luanda|Timbues":        3900,
    // Europe / Med
    "Las Palmas|Timbues":    5300,
    "Rotterdam|Timbues":     6400,
    "Lavera|Timbues":        5900,
    // US
    "New Orleans|Timbues":   6500,
    "New York|Timbues":      5800,
    // South Africa
    "Durban|Timbues":        3600,    // via Cape of Good Hope

    // === Opening positions → Competition load ports ===
    // → Houston (TC14)
    "Mejillones|Houston":    4600,    // via Panama
    "Recalada|Houston":      6100,
    "Santos|Houston":        5200,
    "Aratu|Houston":         4500,
    "Callao|Houston":        3100,    // via Panama
    "San Antonio|Houston":   5000,    // via Panama
    "Accra|Houston":         5800,
    "Lagos|Houston":         5500,
    "Abidjan|Houston":       5100,
    "Dakar|Houston":         4500,
    "Luanda|Houston":        6100,
    "Las Palmas|Houston":    4100,
    "Rotterdam|Houston":     4890,
    "New Orleans|Houston":   360,
    "New York|Houston":      1610,
    "Lavera|Houston":        5200,
    "Durban|Houston":        7600,

    // → Rotterdam (TC2)
    "Mejillones|Rotterdam":  7400,
    "Recalada|Rotterdam":    6350,
    "Santos|Rotterdam":      5800,
    "Aratu|Rotterdam":       4600,
    "Callao|Rotterdam":      6200,    // via Panama
    "San Antonio|Rotterdam": 6800,    // via Cape Horn
    "Accra|Rotterdam":       3600,
    "Lagos|Rotterdam":       4100,
    "Abidjan|Rotterdam":     3900,
    "Dakar|Rotterdam":       2800,
    "Luanda|Rotterdam":      4800,
    "Las Palmas|Rotterdam":  1700,
    "New Orleans|Rotterdam": 4950,
    "New York|Rotterdam":    3460,
    "Lavera|Rotterdam":      2100,
    "Durban|Rotterdam":      6400,

    // → Skikda (TC6)
    "Mejillones|Skikda":     6800,
    "Recalada|Skikda":       5800,
    "Santos|Skikda":         5200,
    "Aratu|Skikda":          4000,
    "Callao|Skikda":         5800,    // via Panama
    "San Antonio|Skikda":    6200,    // via Cape Horn
    "Accra|Skikda":          3100,
    "Lagos|Skikda":          3300,
    "Abidjan|Skikda":        3200,
    "Dakar|Skikda":          2200,
    "Luanda|Skikda":         4300,
    "Las Palmas|Skikda":     1200,
    "Rotterdam|Skikda":      2250,
    "New Orleans|Skikda":    5400,
    "New York|Skikda":       3800,
    "Lavera|Skikda":         430,
    "Durban|Skikda":         5900,

    // → Ras Tanura (TC17) — for Durban
    "Durban|Ras Tanura":     3400,

    // === SA→India laden voyage ===
    "Timbues|Paranagua":     1100,    // coastal hop (downriver then south)
    "Paranagua|Mundra":      7800,    // via Cape of Good Hope
    "Paranagua|Kandla":      7900,    // via Cape of Good Hope
    "Paranagua|Chennai":     8400,    // via Cape of Good Hope
    "Paranagua|Haldia":      8900,    // via Cape of Good Hope
    "Mundra|Kandla":         150,     // coastal WCI
    "Chennai|Haldia":        700,     // coastal ECI

    // === SA→Destination laden (from Paranagua) ===
    "Paranagua|Zhanjiang":   9400,    // via Cape of Good Hope + Malacca
    "Paranagua|Huizhou":     9200,    // via Cape of Good Hope + SCS
    "Paranagua|Qingdao":     10600,   // via Cape of Good Hope + East China Sea
    "Paranagua|Tianjin":     11000,   // via Cape of Good Hope + Bohai Bay
    "Paranagua|Callao":      4400,    // via Cape Horn / Magellan
    "Paranagua|La Pampilla": 4400,    // same as Callao
    "Paranagua|Houston":     5400,    // via Caribbean
    "Paranagua|New Orleans": 5600,
    "Paranagua|New York":    5200,
    "Paranagua|Philadelphia":4950,
    "Paranagua|Rotterdam":   6000,
    "Paranagua|Amsterdam":   6050,
    "Paranagua|Algeciras":   5300,
    "Paranagua|Huelva":      5350,

    // === Between destination port pairs ===
    "Zhanjiang|Huizhou":     300,     // South China coastal
    "Qingdao|Tianjin":       400,     // North China coastal
    "Callao|La Pampilla":    5,       // same port complex
    "New York|Philadelphia": 80,
    "Algeciras|Huelva":      120,
    // Existing pairs: Mundra|Kandla 150, Chennai|Haldia 700, Houston|New Orleans 360, Amsterdam|Rotterdam 60

    // === Post-discharge ballast to hub ===
    "Mundra|Ras Tanura":     1200,
    "Kandla|Ras Tanura":     1250,
    "Chennai|Ras Tanura":    2800,
    "Haldia|Ras Tanura":     3500,
    "Huizhou|Ras Tanura":    3900,    // via Malacca + Indian Ocean
    "Tianjin|Ras Tanura":    5800,    // via SCS + Malacca + Indian Ocean
    "La Pampilla|Houston":   3100,    // via Panama Canal
    "Philadelphia|Houston":  1700,
    "Huelva|Skikda":         700,

    // === TC route laden distances ===
    "Houston|Amsterdam":     4850,
    "Rotterdam|New York":    3460,
    "Skikda|Lavera":         430,
    "Ras Tanura|Yokohama":   6570,
    "Ras Tanura|Dar es Salaam": 3100,
    "Mundra|Yokohama":       4500,

    // === TC route ballast-back distances ===
    "Amsterdam|Rotterdam":   60,
    "New York|Houston":      1610,
    "Lavera|Skikda":         430,
    "Lavera|Rotterdam":      2100,
    "Dar es Salaam|Ras Tanura": 3100,
    "Yokohama|Ras Tanura":   6570,
    "Yokohama|Mundra":       4500,
  },

  // ── Port Costs (USD per call) ──
  portCosts: {
    "Timbues":        158000,   // Argentina upriver — high
    "Paranagua":      55000,
    "Mundra":         50000,
    "Kandla":         50000,
    "Chennai":        55000,
    "Haldia":         55000,
    "Ras Tanura":     35000,
    "Houston":        37000,
    "Amsterdam":      60000,
    "Rotterdam":      44000,
    "New York":       41000,
    "Skikda":         25000,
    "Lavera":         30000,
    "Yokohama":       50000,
    "Dar es Salaam":  35000,
    "New Orleans":    37000,
    "Callao":         45000,
    "San Antonio":    40000,
    "Lagos":          55000,
    "Abidjan":        40000,
    "Dakar":          35000,
    "Luanda":         45000,
    "Las Palmas":     30000,
    "Durban":         45000,
    // Destination ports (new)
    "Algeciras":      35000,
    "Huelva":         35000,
    "Philadelphia":   42000,
    "Zhanjiang":      55000,
    "Huizhou":        55000,
    "Tianjin":        60000,
    "Qingdao":        55000,
    "La Pampilla":    45000,
  },

  // ── Canal Costs ──
  canalCosts: {
    suez_laden:   250000,
    suez_ballast: 200000,
    suez_days:    1.0,
    panama_ballast: 150000,  // MR ballast transit (~$100-150k for clean MR)
    panama_waitDays: 2.0,    // average wait + transit time
  },

  // ── Panama Canal Legs ──
  // Pairs where ballast routing goes via Panama Canal
  panamaLegs: {
    "Mejillones|Houston":    true,   // Chile → USG via Panama
    "Mejillones|Skikda":     true,   // Chile → Med via Panama
    "Mejillones|Rotterdam":  true,   // Chile → NW Europe via Panama
    "Callao|Houston":        true,   // Peru → USG via Panama
    "Callao|Rotterdam":      true,   // Peru → NW Europe via Panama
    "Callao|Skikda":         true,   // Peru → Med via Panama
    "San Antonio|Houston":   true,   // Chile → USG via Panama
    "San Antonio|Rotterdam": true,   // Chile → NW Europe via Panama
    "San Antonio|Skikda":    true,   // Chile → Med via Panama
  },
};
