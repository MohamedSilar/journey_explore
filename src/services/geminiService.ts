import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Gemini API key is not configured');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface TripRequest {
  destination: string;
  days: number;
  budget: 'cheap' | 'moderate' | 'luxury';
  travelType: 'solo' | 'couple' | 'family' | 'friends';
  currency: string;
}

export interface GeneratedTrip {
  destination: string;
  days: number;
  budget: string;
  travelType: string;
  currency: string;
  totalCost: number;
  hotels: Hotel[];
  itinerary: DayPlan[];
  overview: string;
  bestTimeToVisit: string;
  localTips: string[];
}

export interface Hotel {
  id: string;
  name: string;
  rating: number;
  pricePerNight: number;
  location: string;
  amenities: string[];
  description: string;
  image: string;
}

export interface DayPlan {
  day: number;
  activities: Activity[];
  meals: Meal[];
  dailyCost: number;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: string;
  cost: number;
  location: string;
  category: string;
  image: string;
  tips: string;
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  cost: number;
  location: string;
  cuisine: string;
  description: string;
}

const getCurrencyMultiplier = (currency: string): number => {
  const multipliers = {
    'INR': 1,
    'USD': 0.012,
    'EUR': 0.011,
    'GBP': 0.0095,
    'JPY': 1.8
  };
  return multipliers[currency as keyof typeof multipliers] || 1;
};

const getCurrencySymbol = (currency: string): string => {
  const symbols = {
    'INR': '₹',
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥'
  };
  return symbols[currency as keyof typeof symbols] || '₹';
};

const getImageForCategory = (category: string): string => {
  const images = {
    'sightseeing': 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=300',
    'culture': 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=300',
    'adventure': 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=300',
    'nature': 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=300',
    'food': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
    'shopping': 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=300',
    'relaxation': 'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=300',
    'default': 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=300'
  };
  return images[category.toLowerCase() as keyof typeof images] || images.default;
};

export const generateTripPlan = async (request: TripRequest): Promise<GeneratedTrip> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const currencyMultiplier = getCurrencyMultiplier(request.currency);
    const currencySymbol = getCurrencySymbol(request.currency);

    const prompt = `
Create a detailed ${request.days}-day travel itinerary for ${request.destination} with the following requirements:

**Trip Details:**
- Destination: ${request.destination}
- Duration: ${request.days} days
- Budget: ${request.budget}
- Travel Type: ${request.travelType}
- Currency: ${request.currency}

**Requirements:**
1. Provide 2-3 hotel recommendations with realistic pricing in ${request.currency}
2. Create a day-by-day itinerary with 2-3 activities per day
3. Include meal recommendations (breakfast, lunch, dinner) for each day
4. Provide realistic cost estimates in ${request.currency}
5. Include local tips and best time to visit information
6. Consider the travel type (${request.travelType}) when suggesting activities

**Budget Guidelines:**
- Cheap: Budget-friendly options, local experiences, affordable accommodations
- Moderate: Mid-range options, mix of popular and local attractions
- Luxury: Premium experiences, high-end accommodations, exclusive activities

**Response Format (JSON):**
{
  "overview": "Brief overview of the destination and trip highlights",
  "bestTimeToVisit": "Best time to visit this destination",
  "localTips": ["tip1", "tip2", "tip3"],
  "hotels": [
    {
      "name": "Hotel Name",
      "rating": 4.5,
      "pricePerNight": 5000,
      "location": "Area name",
      "amenities": ["WiFi", "Pool", "Restaurant"],
      "description": "Brief hotel description"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "activities": [
        {
          "name": "Activity Name",
          "description": "Detailed description",
          "duration": "2-3 hours",
          "cost": 1000,
          "location": "Specific location",
          "category": "sightseeing",
          "tips": "Local tips for this activity"
        }
      ],
      "meals": [
        {
          "name": "Restaurant/Place Name",
          "type": "breakfast",
          "cost": 300,
          "location": "Area name",
          "cuisine": "Cuisine type",
          "description": "Brief description"
        }
      ]
    }
  ],
  "totalCost": 25000
}

Please ensure all costs are realistic for ${request.destination} and in ${request.currency}. Make the itinerary engaging and suitable for ${request.travelType} travelers with a ${request.budget} budget.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI');
    }

    const aiResponse = JSON.parse(jsonMatch[0]);

    // Process and enhance the response
    const processedTrip: GeneratedTrip = {
      destination: request.destination,
      days: request.days,
      budget: request.budget,
      travelType: request.travelType,
      currency: request.currency,
      overview: aiResponse.overview || `Discover the amazing ${request.destination} with this carefully crafted ${request.days}-day itinerary.`,
      bestTimeToVisit: aiResponse.bestTimeToVisit || 'Year-round destination with seasonal highlights',
      localTips: aiResponse.localTips || ['Try local cuisine', 'Learn basic local phrases', 'Respect local customs'],
      totalCost: aiResponse.totalCost || calculateEstimatedCost(request),
      hotels: (aiResponse.hotels || []).map((hotel: any, index: number) => ({
        id: `hotel-${index + 1}`,
        name: hotel.name || `Recommended Hotel ${index + 1}`,
        rating: hotel.rating || 4.0,
        pricePerNight: hotel.pricePerNight || getDefaultHotelPrice(request),
        location: hotel.location || 'City Center',
        amenities: hotel.amenities || ['WiFi', 'Restaurant', 'Room Service'],
        description: hotel.description || 'Comfortable accommodation with modern amenities',
        image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=300'
      })),
      itinerary: (aiResponse.itinerary || []).map((day: any) => ({
        day: day.day,
        dailyCost: day.activities?.reduce((sum: number, act: any) => sum + (act.cost || 0), 0) + 
                   day.meals?.reduce((sum: number, meal: any) => sum + (meal.cost || 0), 0) || 0,
        activities: (day.activities || []).map((activity: any, index: number) => ({
          id: `day-${day.day}-activity-${index + 1}`,
          name: activity.name || `Activity ${index + 1}`,
          description: activity.description || 'Exciting local experience',
          duration: activity.duration || '2-3 hours',
          cost: activity.cost || getDefaultActivityCost(request),
          location: activity.location || request.destination,
          category: activity.category || 'sightseeing',
          image: getImageForCategory(activity.category || 'sightseeing'),
          tips: activity.tips || 'Enjoy this amazing experience!'
        })),
        meals: (day.meals || []).map((meal: any, index: number) => ({
          id: `day-${day.day}-meal-${meal.type || index}`,
          name: meal.name || `Local ${meal.type || 'restaurant'}`,
          type: meal.type || (['breakfast', 'lunch', 'dinner'][index] as 'breakfast' | 'lunch' | 'dinner'),
          cost: meal.cost || getDefaultMealCost(request, meal.type),
          location: meal.location || 'Local area',
          cuisine: meal.cuisine || 'Local cuisine',
          description: meal.description || 'Delicious local food experience'
        }))
      }))
    };

    return processedTrip;

  } catch (error) {
    console.error('Error generating trip plan:', error);
    
    // Fallback to enhanced mock data if API fails
    return generateFallbackTrip(request);
  }
};

const calculateEstimatedCost = (request: TripRequest): number => {
  const baseCosts = {
    cheap: { daily: 2000, hotel: 1500 },
    moderate: { daily: 4000, hotel: 3500 },
    luxury: { daily: 8000, hotel: 7000 }
  };

  const costs = baseCosts[request.budget];
  const multiplier = getCurrencyMultiplier(request.currency);
  
  return Math.round((costs.daily * request.days + costs.hotel * request.days) * multiplier);
};

const getDefaultHotelPrice = (request: TripRequest): number => {
  const basePrices = { cheap: 1500, moderate: 3500, luxury: 7000 };
  return Math.round(basePrices[request.budget] * getCurrencyMultiplier(request.currency));
};

const getDefaultActivityCost = (request: TripRequest): number => {
  const baseCosts = { cheap: 500, moderate: 1000, luxury: 2000 };
  return Math.round(baseCosts[request.budget] * getCurrencyMultiplier(request.currency));
};

const getDefaultMealCost = (request: TripRequest, mealType: string): number => {
  const baseCosts = {
    cheap: { breakfast: 200, lunch: 400, dinner: 600 },
    moderate: { breakfast: 400, lunch: 800, dinner: 1200 },
    luxury: { breakfast: 800, lunch: 1500, dinner: 2500 }
  };
  
  const mealCosts = baseCosts[request.budget];
  const cost = mealCosts[mealType as keyof typeof mealCosts] || mealCosts.lunch;
  return Math.round(cost * getCurrencyMultiplier(request.currency));
};

const generateFallbackTrip = (request: TripRequest): GeneratedTrip => {
  const currencySymbol = getCurrencySymbol(request.currency);
  const totalCost = calculateEstimatedCost(request);

  return {
    destination: request.destination,
    days: request.days,
    budget: request.budget,
    travelType: request.travelType,
    currency: request.currency,
    totalCost,
    overview: `Explore the beautiful ${request.destination} with this ${request.days}-day adventure tailored for ${request.travelType} travelers on a ${request.budget} budget.`,
    bestTimeToVisit: 'Best visited during pleasant weather months for optimal experience.',
    localTips: [
      'Try authentic local cuisine for the best cultural experience',
      'Learn a few basic local phrases to connect with locals',
      'Respect local customs and dress codes at religious sites',
      'Keep important documents and emergency contacts handy'
    ],
    hotels: [{
      id: 'hotel-1',
      name: `${request.destination} Heritage Hotel`,
      rating: 4.2,
      pricePerNight: getDefaultHotelPrice(request),
      location: 'City Center',
      amenities: ['WiFi', 'Restaurant', 'Pool', 'Room Service', 'Parking'],
      description: 'Comfortable accommodation with modern amenities and traditional charm',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=300'
    }],
    itinerary: Array.from({ length: request.days }, (_, i) => ({
      day: i + 1,
      dailyCost: Math.round(totalCost / request.days * 0.6), // 60% of daily budget for activities and meals
      activities: [
        {
          id: `day-${i + 1}-activity-1`,
          name: `Day ${i + 1} Cultural Experience`,
          description: `Immerse yourself in the rich culture and heritage of ${request.destination}`,
          duration: '3-4 hours',
          cost: getDefaultActivityCost(request),
          location: `${request.destination} Cultural District`,
          category: 'culture',
          image: getImageForCategory('culture'),
          tips: 'Best experienced in the morning when sites are less crowded'
        },
        {
          id: `day-${i + 1}-activity-2`,
          name: `Day ${i + 1} Local Adventure`,
          description: `Discover hidden gems and local favorites in ${request.destination}`,
          duration: '2-3 hours',
          cost: Math.round(getDefaultActivityCost(request) * 0.7),
          location: `${request.destination} Local Area`,
          category: 'adventure',
          image: getImageForCategory('adventure'),
          tips: 'Perfect for afternoon exploration and photography'
        }
      ],
      meals: [
        {
          id: `day-${i + 1}-breakfast`,
          name: 'Local Breakfast Spot',
          type: 'breakfast' as const,
          cost: getDefaultMealCost(request, 'breakfast'),
          location: 'Near accommodation',
          cuisine: 'Local specialties',
          description: 'Start your day with authentic local breakfast'
        },
        {
          id: `day-${i + 1}-lunch`,
          name: 'Traditional Restaurant',
          type: 'lunch' as const,
          cost: getDefaultMealCost(request, 'lunch'),
          location: 'City center',
          cuisine: 'Regional cuisine',
          description: 'Enjoy traditional flavors and local ingredients'
        },
        {
          id: `day-${i + 1}-dinner`,
          name: 'Evening Dining Experience',
          type: 'dinner' as const,
          cost: getDefaultMealCost(request, 'dinner'),
          location: 'Popular dining district',
          cuisine: 'Multi-cuisine',
          description: 'End your day with a memorable dining experience'
        }
      ]
    }))
  };
};