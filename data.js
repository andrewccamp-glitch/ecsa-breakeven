// ECSA East Breakeven Tool — Data Layer
// Generated 2026-03-06

const ECSA_DATA = {

  // ── Vessel Class Definitions ──
  vesselClasses: {
    HANDC37: {
      name: "HANDC37 (Baltic Clean Handy)", dwt: 37800, intake: 33000,
      cargoSAIndia: 33000,
      ladenSpeed: 13.0, ballastSpeed: 12.0,
      ladenCons: 21.3, ballastCons: 16.8,
      portConsLoad: 5.0, portConsDisch: 20.0, portConsWait: 5.0,
      commissionPct: 3.75, seaMargin: 1.05,
      riverDays: 1.0, cleaningCost: 25000, cleaningDays: 1.0,
    },
    MR50: {
      name: "MR50 (Baltic Standard MR)", dwt: 50000, intake: 44000,
      cargoSAIndia: 40000,        // draft-restricted at SA load ports
      ladenSpeed: 13.0, ballastSpeed: 12.0,
      ladenCons: 23.3, ballastCons: 17.0,
      portConsLoad: 5.0, portConsDisch: 25.0, portConsWait: 5.0,
      commissionPct: 3.75, seaMargin: 1.05,
      riverDays: 1.0, cleaningCost: 25000, cleaningDays: 1.0,
    },
    LR1_75: {
      name: "LR1-75 (Baltic Standard LR1)", dwt: 74000, intake: 65000,
      cargoSAIndia: 65000,        // wider beam allows more on same draft
      ladenSpeed: 13.0, ballastSpeed: 12.0,
      ladenCons: 30.5, ballastCons: 24.5,
      portConsLoad: 5.0, portConsDisch: 32.0, portConsWait: 5.0,
      commissionPct: 3.75, seaMargin: 1.05,
      riverDays: 1.0, cleaningCost: 25000, cleaningDays: 1.0,
    },
  },

  // ── Backward compat: default vessel points to MR50 ──
  get vessel() { return this.vesselClasses.MR50; },

  // ── Cargo matrix: how much each vessel class loads on each route ──
  // Varies by route draft/berth restrictions and vessel geometry
  cargoByRoute: {
    HANDC37: { TC2: 33000, TC5: 33000, TC6: 30000, TC8: 33000, TC12: 33000, TC14: 33000, TC15: 33000, TC17: 33000, TC18: 33000, TC20: 33000, TC23: 30000 },
    MR50:    { TC2: 37000, TC5: 44000, TC6: 44000, TC8: 44000, TC12: 35000, TC14: 38000, TC15: 44000, TC17: 35000, TC18: 38000, TC20: 44000, TC23: 44000 },
    LR1_75:  { TC2: 65000, TC5: 55000, TC6: 65000, TC8: 65000, TC12: 65000, TC14: 65000, TC15: 65000, TC17: 65000, TC18: 65000, TC20: 65000, TC23: 65000 },
  },

  // ── Terminal Pumping Rates (mt/hr) ──
  terminalRates: {
    TC2:  { load: 771, disch: 771 },
    TC5:  { load: 1146, disch: 1146 },
    TC6:  { load: 625, disch: 625 },
    TC12: { load: 729, disch: 729 },
    TC14: { load: 792, disch: 792 },
    TC17: { load: 729, disch: 729 },
    SA_LOAD:  200,
    SA_DISCH: 200,
  },

  // ── Laytime (SA→India charterparty standard for MR50 40k cargo) ──
  laytime: {
    loadHours: 200,
    dischHours: 200,
    get loadDays() { return this.loadHours / 24; },
    get dischDays() { return this.dischHours / 24; },
  },

  // ── TC Route Definitions ──
  // bunkerRef: 'asia' routes use Singapore VLSFO; all others use Rotterdam VLSFO
  routes: {
    TC2:  { desc: "Continent -> USAC",       loadPort: "Rotterdam",  dischPort: "New York",      ballastBack: "Houston",    usesSuez: false, bunkerRef: "atlantic" },
    TC5:  { desc: "MEG -> Japan (LR1)",      loadPort: "Ras Tanura", dischPort: "Yokohama",      ballastBack: "Ras Tanura", usesSuez: false, bunkerRef: "asia" },
    TC6:  { desc: "Algeria -> Med (Handy)",   loadPort: "Skikda",     dischPort: "Lavera",        ballastBack: "Skikda",    usesSuez: false, bunkerRef: "atlantic" },
    TC12: { desc: "WCI -> Japan (LR1)",       loadPort: "Mundra",     dischPort: "Yokohama",      ballastBack: "Mundra",     usesSuez: false, bunkerRef: "asia" },
    TC14: { desc: "USG -> Continent",         loadPort: "Houston",    dischPort: "Amsterdam",     ballastBack: "Rotterdam",  usesSuez: false, bunkerRef: "atlantic" },
    TC17: { desc: "AG -> East Africa",        loadPort: "Ras Tanura", dischPort: "Dar es Salaam", ballastBack: "Ras Tanura", usesSuez: false, bunkerRef: "asia" },
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
  // Each region: discharge port(s), post-discharge ballast hub, next voyage options
  // timbuesOnly: true → load only at Timbues (fixed cargo + laytime), no Paranaguá stop
  // cargo/loadHours/dischHours: route-specific (overrides vessel state for timbuesOnly routes)
  destinationRegions: {
    // ── Standard SA→region routes (Timbues + Paranaguá, vessel-dependent cargo) ──
    WCI:    { label: "West Coast India",  ports: ["Mundra", "Kandla"],        ballastAfter: "Ras Tanura", nextVoyageOptions: ["TC17", "TC5", "TC12"] },
    ECI:    { label: "East Coast India",  ports: ["Chennai", "Haldia"],       ballastAfter: "Ras Tanura", nextVoyageOptions: ["TC17", "TC5", "TC12"] },
    SChina: { label: "South China",       ports: ["Zhanjiang", "Huizhou"],    ballastAfter: "Ras Tanura", nextVoyageOptions: ["TC17", "TC5", "TC12"] },
    NChina: { label: "North China",       ports: ["Qingdao", "Tianjin"],      ballastAfter: "Ras Tanura", nextVoyageOptions: ["TC17", "TC5", "TC12"] },
    Peru:   { label: "Peru",              ports: ["Callao", "La Pampilla"],   ballastAfter: "Houston",    nextVoyageOptions: ["TC14"],                panamaBalAfter: true },
    USG:    { label: "US Gulf",           ports: ["Houston", "New Orleans"],  ballastAfter: "Houston",    nextVoyageOptions: ["TC14"] },
    NYH:    { label: "New York Harbor",   ports: ["New York", "Philadelphia"],ballastAfter: "Houston",    nextVoyageOptions: ["TC14"] },
    NLD:    { label: "Netherlands",       ports: ["Rotterdam", "Amsterdam"],  ballastAfter: "Rotterdam",  nextVoyageOptions: ["TC2"] },
    SSpain: { label: "South Spain",       ports: ["Algeciras", "Huelva"],     ballastAfter: "Skikda",     nextVoyageOptions: ["TC6", "TC2"] },
    // ── Timbues-only fixed-cargo routes ──
    // loadHours/dischHours = CP laytime; terminal rate = cargo/hours
    LAUSC:   { label: "Los Angeles",           ports: ["Los Angeles"],            cargo: 30000, loadHours: 200, dischHours: 200, timbuesOnly: true, panamaLaden: true, ballastAfter: "Houston",   nextVoyageOptions: ["TC14"] },
    AratuBR: { label: "Aratu (Brazil)",        ports: ["Aratu"],                  cargo: 18000, loadHours: 150, dischHours: 150, timbuesOnly: true,                    ballastAfter: "Rotterdam",  nextVoyageOptions: ["TC2", "TC6"] },
    WAF12:   { label: "Accra + Lagos",         ports: ["Accra", "Lagos"],         cargo: 12000, loadHours: 150, dischHours: 150, timbuesOnly: true,                    ballastAfter: "Rotterdam",  nextVoyageOptions: ["TC2", "TC6"] },
    Alex20:  { label: "Alexandria",            ports: ["Alexandria"],             cargo: 20000, loadHours: 200, dischHours: 200, timbuesOnly: true,                    ballastAfter: "Skikda",     nextVoyageOptions: ["TC6", "TC2"] },
    AlexDam: { label: "Alex + Damietta",       ports: ["Alexandria", "Damietta"], cargo: 32000, loadHours: 200, dischHours: 200, timbuesOnly: true,                    ballastAfter: "Skikda",     nextVoyageOptions: ["TC6", "TC2"] },
    Cart:    { label: "Cartagena (Colombia)",  ports: ["Cartagena"],              cargo: 12000, loadHours: 150, dischHours: 150, timbuesOnly: true,                    ballastAfter: "Houston",    nextVoyageOptions: ["TC14"] },
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
    // New timbuesOnly destination routes (from Paranaguá waypoint after river down)
    "Paranagua|Los Angeles": 5700,   // via Panama Canal (laden — panamaLaden flag applies)
    "Paranagua|Aratu":       1600,   // coastal north along Brazilian coast
    "Paranagua|Accra":       5200,   // Atlantic crossing to West Africa
    "Paranagua|Lagos":       5600,   // Atlantic crossing (further east)
    "Paranagua|Alexandria":  7500,   // Atlantic north + Gibraltar + Med
    "Paranagua|Damietta":    7600,   // Atlantic north + Gibraltar + Med (Nile Delta)
    "Paranagua|Cartagena":   3800,   // north along Brazilian coast + Caribbean (Colombia)

    // === Between destination port pairs ===
    "Zhanjiang|Huizhou":     300,     // South China coastal
    "Qingdao|Tianjin":       400,     // North China coastal
    "Callao|La Pampilla":    5,       // same port complex
    "New York|Philadelphia": 80,
    "Algeciras|Huelva":      120,
    "Alexandria|Damietta":   120,    // Med coastal (eastern Med)
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
    // New post-discharge ballast distances
    "Los Angeles|Houston":   4400,   // via Panama Canal (flagged in panamaLegs)
    "Aratu|Rotterdam":       4800,   // Atlantic northward
    "Alexandria|Skikda":     1300,   // western Med
    "Damietta|Skikda":       1450,   // Med westward
    "Cartagena|Houston":     1600,   // Caribbean to US Gulf (Colombia)

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
    "Los Angeles":    50000,
    "Alexandria":     55000,
    "Damietta":       55000,
    "Cartagena":      40000,   // Colombia
  },

  // ── Canal Costs (vessel-class specific for Suez) ──
  canalCosts: {
    suez_laden:   { HANDC37: 120000, MR50: 170000, LR1_75: 350000 },
    suez_ballast: { HANDC37: 100000, MR50: 140000, LR1_75: 280000 },
    suez_days:    1.0,
    panama_ballast:    150000,  // MR ballast transit (~$100-150k for clean MR)
    panama_waitDays:   2.0,     // average wait + transit time
    panama_laden:      150000,  // MR laden transit (clean product)
    panama_laden_days: 2.0,     // average wait + transit time laden
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
    // Post-discharge ballast via Panama (timbuesOnly destination routes)
    "Los Angeles|Houston":   true,   // USWC → USG after LA discharge
  },

  // ── Panama Canal Laden Legs ──
  // Timbues→destination routes that require Panama Canal on the laden voyage
  panamaLadenLegs: {
    "Paranagua|Los Angeles": true,   // Timbues load → USWC via Panama
  },
};
