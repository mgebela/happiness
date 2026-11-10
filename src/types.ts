export type View = "invitation" | "planner";

export type WeddingDetails = {
  partnerOne: string;
  partnerTwo: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  dressCode: string;
};

export type Task = {
  id: string;
  title: string;
  group: string;
  done: boolean;
};

export type BudgetItem = {
  id: string;
  name: string;
  planned: number;
  spent: number;
};

export type Guest = {
  id: string;
  name: string;
  party: number;
  status: "invited" | "yes" | "no" | "maybe";
  side: "partnerOne" | "partnerTwo" | "shared";
};

export type Rsvp = {
  name: string;
  attending: "yes" | "no";
  guests: number;
  note: string;
  createdAt: string;
};

export type PlannerState = {
  details: WeddingDetails;
  tasks: Task[];
  budget: BudgetItem[];
  guests: Guest[];
  rsvps: Rsvp[];
};
