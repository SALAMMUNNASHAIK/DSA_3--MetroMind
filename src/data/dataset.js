export const stations = [
    "Tenali", "Vijayawada", "Guntur", "Benz Circle", "Mangalagiri", 
    "Tadepalli", "Amaravati", "Namburu", "Nidubrolu", "Bapatla", 
    "Repalle", "Eluru", "Machilipatnam", "Gudivada", "Rajahmundry",
    "Gannavaram", "Kankipadu", "Vuyyuru", "Pamarru", "Avanigadda",
    "Bhattiprolu", "Tsunduru", "Chebrole", "Ponnur", "Chilakaluripet"
];

export const routes = [
    { id: "R001", description: "Tenali -> Vijayawada -> Guntur" },
    { id: "R002", description: "Tenali -> Vijayawada -> Benz Circle" },
    { id: "R003", description: "Vijayawada -> Mangalagiri -> Guntur" },
    { id: "R004", description: "Vijayawada -> Tadepalli -> Amaravati" },
    { id: "R005", description: "Guntur -> Namburu -> Mangalagiri -> Vijayawada" },
    { id: "R006", description: "Tenali -> Nidubrolu -> Bapatla" },
    { id: "R007", description: "Vijayawada -> Gannavaram -> Eluru" },
    { id: "R008", description: "Vijayawada -> Kankipadu -> Vuyyuru -> Machilipatnam" },
    { id: "R009", description: "Tenali -> Repalle -> Bhattiprolu" },
    { id: "R010", description: "Guntur -> Chilakaluripet" }
];

export const documents = [
    { id: "DOC-1", title: "Route Information", content: "The main route from Tenali to Vijayawada experiences heavy traffic. Secondary route through Mangalagiri is recommended." },
    { id: "DOC-2", title: "Service Guidelines", content: "All services must follow speed limits. Passengers must have valid ticket codes before boarding." },
    { id: "DOC-3", title: "Maintenance Report", content: "Platform change at Vijayawada due to track maintenance. Expect slight delay." },
    { id: "DOC-4", title: "Station Information", content: "Amaravati station has been upgraded with new waiting halls. Tadepalli station is currently crowded." },
    { id: "DOC-5", title: "Service Alerts", content: "Service R004 is cancelled for today due to heavy rain. We apologize for the inconvenience." }
];

export const serviceAlerts = [
    "Platform change at Vijayawada due to track maintenance. Expect slight delay.",
    "Service R004 is cancelled for today.",
    "Tadepalli station is currently crowded.",
    "Delay on route Tenali -> Guntur.",
    "General maintenance scheduled for Sunday."
];

export const destinationsCost = [
    { name: "Tenali", cost: 20 },
    { name: "Vijayawada", cost: 50 },
    { name: "Guntur", cost: 40 },
    { name: "Mangalagiri", cost: 30 },
    { name: "Amaravati", cost: 60 },
    { name: "Eluru", cost: 80 }
];

// For Matrix Chain demo
export const matrixDimensions = [10, 20, 30, 40, 30]; // Represents matrices sizes

// For Optimal BST demo
export const stationSearchFreq = [
    { station: "Vijayawada", freq: 34 },
    { station: "Tenali", freq: 8 },
    { station: "Guntur", freq: 50 }
];

export const dbStats = {
    totalStations: stations.length,
    totalRoutes: routes.length,
    totalServices: 45,
    totalDocs: documents.length,
    totalPassengers: 12500,
    alertsCount: serviceAlerts.length
};
