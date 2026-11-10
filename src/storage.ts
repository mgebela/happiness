import type { PlannerState } from "./types";

const KEY = "happiness-planner-v1";

export const defaultState: PlannerState = {
  details: {
    partnerOne: "Maya",
    partnerTwo: "Elias",
    date: "2027-06-19",
    time: "16:00",
    venue: "Villa Luce",
    city: "Lake Como, Italy",
    dressCode: "Garden formal",
  },
  tasks: [
    { id: "t1", group: "Twelve months out", title: "Set a date and draft the guest list", done: true },
    { id: "t2", group: "Twelve months out", title: "Book the ceremony and reception venue", done: true },
    { id: "t3", group: "Twelve months out", title: "Choose a photographer and videographer", done: false },
    { id: "t4", group: "Six months out", title: "Order invitations and paper suite", done: false },
    { id: "t5", group: "Six months out", title: "Meet the florist and lock a palette", done: false },
    { id: "t6", group: "Six months out", title: "Taste the menu and cake", done: false },
    { id: "t7", group: "Three months out", title: "Send invitations", done: false },
    { id: "t8", group: "Three months out", title: "Book hair, makeup, and fittings", done: false },
    { id: "t9", group: "One month out", title: "Confirm final headcount with vendors", done: false },
    { id: "t10", group: "One month out", title: "Write vows and prepare speeches", done: false },
    { id: "t11", group: "The week of", title: "Deliver timeline to the wedding party", done: false },
    { id: "t12", group: "The week of", title: "Pack vows, rings, and emergency kit", done: false },
  ],
  budget: [
    { id: "b1", name: "Venue", planned: 18000, spent: 9000 },
    { id: "b2", name: "Catering", planned: 12000, spent: 2000 },
    { id: "b3", name: "Attire", planned: 4500, spent: 1200 },
    { id: "b4", name: "Flowers", planned: 3500, spent: 0 },
    { id: "b5", name: "Photo & film", planned: 5000, spent: 1500 },
    { id: "b6", name: "Music", planned: 2800, spent: 800 },
    { id: "b7", name: "Stationery", planned: 900, spent: 0 },
    { id: "b8", name: "Other", planned: 2500, spent: 400 },
  ],
  guests: [
    { id: "g1", name: "Nora Hale", party: 2, status: "yes", side: "partnerOne" },
    { id: "g2", name: "The Okafors", party: 3, status: "invited", side: "partnerTwo" },
    { id: "g3", name: "Samir & Leila", party: 2, status: "maybe", side: "shared" },
    { id: "g4", name: "Aunt Josephine", party: 1, status: "yes", side: "partnerOne" },
  ],
  rsvps: [],
};

export function loadState(): PlannerState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

export function saveState(state: PlannerState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
