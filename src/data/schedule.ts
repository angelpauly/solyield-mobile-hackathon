import { Visit } from "../types/visit";


 
  const today = new Date().toISOString().split("T")[0];

export const visits = [
  {
    id: "1",
    siteId: "1",
    title: "Routine Inspection",
    date: today,
    status: "Pending",
  },
   {
    id: "visit_01",
    siteId: "site_01",
    date: today,
    title: "Preventive Maintenance",
  },
  {
    id: "visit_02",
    siteId: "site_02",
    date: today,
    title: "Inspection",
  },
  {
    id: "2",
    siteId: "2",
    title: "Performance Audit",
    date: today,
    status: "Pending",
  },
  {
    id: "3",
    siteId: "3",
    title: "Emergency Fault Check",
    date: today,
    status: "Completed",
  },
  {
    id: "4",
    siteId: "1",
    title: "Future Visit",
    date: "2026-03-01",
    status: "Pending",
  }

];