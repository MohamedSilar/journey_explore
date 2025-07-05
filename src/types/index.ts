export interface TripData {
  id: string;
  destination: string;
  days: number;
  budget: 'cheap' | 'moderate' | 'luxury';
  travelType: 'solo' | 'couple' | 'family' | 'friends';
  createdAt: Date;
  userId: string;
}

export interface TripPlan {
  id: string;
  destination: string;
  days: number;
  budget: string;
  travelType: string;
  itinerary: DayPlan[];
  hotels: Hotel[];
  totalCost: number;
  createdAt: Date;
}

export interface DayPlan {
  day: number;
  activities: Activity[];
  meals: Meal[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: string;
  cost: number;
  location: string;
  category: string;
  image?: string;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  cost: number;
  location: string;
  cuisine: string;
}

export interface Hotel {
  id: string;
  name: string;
  rating: number;
  pricePerNight: number;
  location: string;
  amenities: string[];
  image?: string;
}