export type InverterStatus =
  | "Operational"
  | "Minor Fault"
  | "Critical Fault";

export type PanelCondition =
  | "Good"
  | "Dusty"
  | "Damaged";

export type IssueType =
  | "None"
  | "Cleaning Required"
  | "Electrical Fault"
  | "Structural Issue";

export type Report = {
  id: string;
  siteId: string;
  siteName: string;
  date: string;
  energyGenerated: number;
  inverterStatus: InverterStatus;
  panelCondition: PanelCondition;
  issueType: IssueType;
  notes: string;
  locationVerified: boolean;
};