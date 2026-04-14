export interface PollResponse {
  id: string;
  timestamp: string;
  ageGroup: '18-24' | '25-34' | '35-44' | '45-54' | '55+';
  gender: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
  preferredTool: string;
  satisfaction: number; // 1-5
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  feedback: string;
}

export interface PollSummary {
  totalVotes: number;
  averageSatisfaction: number;
  topTool: string;
  participationByRegion: { name: string; value: number }[];
  toolDistribution: { name: string; value: number }[];
  satisfactionDistribution: { name: string; value: number }[];
  ageGroupDistribution: { name: string; value: number }[];
}
