export interface Report {
  id: string;
  siteId: string;
  siteName: string;
  date: string;
  energyGenerated: number;
  voltage: number; 
  inverterStatus: string;
  panelCondition: string;
  issueType: string;
  notes: string;
  photo?: string; // Optional site photo
  locationVerified: boolean;
}