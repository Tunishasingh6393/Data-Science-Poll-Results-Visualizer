import { PollResponse } from '../types';

const TOOLS = ['Python', 'R', 'Excel', 'SQL', 'Tableau', 'Power BI', 'JavaScript'];
const REGIONS: PollResponse['region'][] = ['North', 'South', 'East', 'West', 'Central'];
const AGE_GROUPS: PollResponse['ageGroup'][] = ['18-24', '25-34', '35-44', '45-54', '55+'];
const GENDERS: PollResponse['gender'][] = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

const FEEDBACK_SAMPLES = [
  "Great tool, very useful for my daily tasks.",
  "Needs improvement in the UI department.",
  "Super helpful! I use it every day.",
  "A bit complex for beginners, but powerful.",
  "The best in its class, highly recommended.",
  "I prefer other alternatives for data visualization.",
  "Excellent documentation and community support.",
  "Could be faster when handling large datasets.",
  "Intuitive and easy to learn.",
  "Essential for any data analyst."
];

export function generateMockData(count: number): PollResponse[] {
  return Array.from({ length: count }, (_, i) => {
    const satisfaction = Math.floor(Math.random() * 5) + 1;
    return {
      id: `resp-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
      ageGroup: AGE_GROUPS[Math.floor(Math.random() * AGE_GROUPS.length)],
      gender: GENDERS[Math.floor(Math.random() * GENDERS.length)],
      preferredTool: TOOLS[Math.floor(Math.random() * TOOLS.length)],
      satisfaction,
      region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
      feedback: FEEDBACK_SAMPLES[Math.floor(Math.random() * FEEDBACK_SAMPLES.length)]
    };
  });
}

export const mockResponses = generateMockData(150);
