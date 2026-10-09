export interface FoodAndCulturalSpot {
  name: string;
  type: string; // e.g. "Heritage Monument", "Iconic Irani Cafe", "Street Food Stall"
  budget: string; // e.g. "₹50 - ₹150", "Budget Friendly", "$$"
  vibe: string; // e.g. "Retro & Bustling", "Serene Morning", "High Energy"
  description?: string;
  bestTime?: string;
}

export interface ComparisonRecommended {
  name: string;
  reason: string;
  score: string | number; // e.g. "9.4/10" or 94
}

export interface ComparisonAvoid {
  name: string;
  reason: string;
  risk: string; // e.g. "Heavy Waterlogging & Gridlock", "Dimly lit post 10 PM"
}

export interface ComparisonMatrix {
  recommended: ComparisonRecommended[];
  avoidOrCaution: ComparisonAvoid[];
}

export interface SmartAlert {
  type: 'Traffic' | 'Weather' | 'Safety' | string;
  message: string;
  severity: 'High' | 'Medium' | 'Low' | string;
}

export interface TransitStep {
  step: number;
  mode: 'Metro' | 'Walk' | 'Cab' | 'Bus' | 'Auto' | string;
  title: string;
  instruction: string;
  eta: string;
  safetyTip?: string;
}

export interface CityPulseReport {
  city: string;
  timestamp?: string;
  summary: string;
  safetyScore: number; // 1-100
  safetyLevel: 'Safe' | 'Moderate Caution' | 'Unsafe';
  safeRoutes: string[];
  culturalAndFoodSpots: FoodAndCulturalSpot[];
  comparisonMatrix: ComparisonMatrix;
  smartAlerts: SmartAlert[];
  transitSteps?: TransitStep[];
  quickStats?: {
    chaosIndex: number; // 1-100
    peakHoursWarning: string;
    weatherCondition: string;
    emergencyHelpline: string;
  };
}

export interface DemoPreset {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  iconName: string;
  inputPrompt: string;
  sampleReport: CityPulseReport;
}
