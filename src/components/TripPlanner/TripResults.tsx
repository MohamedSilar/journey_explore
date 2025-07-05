import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Users, Star, Clock, Bookmark, Share2, CheckCircle, Info, Lightbulb } from 'lucide-react';
import { useTripContext } from '../../contexts/TripContext';
import { useProfile } from '../../contexts/ProfileContext';
import { generateTripPDF } from '../../utils/pdfGenerator';
import { GeneratedTrip } from '../../services/geminiService';

const TripResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const tripData = location.state?.tripData;
  const generatedTrip: GeneratedTrip = location.state?.generatedTrip;
  const { addTrip } = useTripContext();
  const { profile } = useProfile();

  if (!tripData || !generatedTrip) {
    navigate('/create-trip');
    return null;
  }

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹'
  };

  const currency = generatedTrip.currency || 'INR';
  const symbol = currencySymbols[currency as keyof typeof currencySymbols];

  const handleSaveTrip = () => {
    const newTrip = {
      id: Date.now().toString(),
      destination: generatedTrip.destination,
      days: generatedTrip.days,
      budget: generatedTrip.budget as 'cheap' | 'moderate' | 'luxury',
      travelType: generatedTrip.travelType as 'solo' | 'couple' | 'family' | 'friends',
      currency: generatedTrip.currency,
      totalCost: generatedTrip.totalCost,
      createdAt: new Date(),
      status: 'saved' as const,
      image: generatedTrip.hotels[0]?.image || 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=400',
      itinerary: generatedTrip.itinerary,
      hotels: generatedTrip.hotels
    };

    addTrip(newTrip);
    
    // Show success message
    const button = document.querySelector('#save-trip-btn') as HTMLButtonElement;
    if (button) {
      const originalContent = button.innerHTML;
      button.innerHTML = '<svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Saved!';
      button.disabled = true;
      
      setTimeout(() => {
        button.innerHTML = originalContent;
        button.disabled = false;
      }, 2000);
    }
  };

  const handleShareTrip = async () => {
    try {
      await generateTripPDF(generatedTrip, profile.name);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* AI-Generated Badge */}
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 text-green-800 dark:text-green-200 text-sm font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          ✨ AI-Generated Personalized Itinerary by Google Gemini
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Your Perfect Trip to {generatedTrip.destination}</h1>
            <div className="flex items-center space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>{generatedTrip.days} days</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span className="capitalize">{generatedTrip.budget}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span className="capitalize">{generatedTrip.travelType}</span>
              </div>
            </div>
            <p className="text-blue-100 mt-3 text-lg">{generatedTrip.overview}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{symbol}{generatedTrip.totalCost.toLocaleString()}</div>
            <div className="text-blue-100">Total estimated cost</div>
            <div className="text-sm text-blue-200">in {currency}</div>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button 
            id="save-trip-btn"
            onClick={handleSaveTrip}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
          >
            <Bookmark className="h-5 w-5" />
            <span>Save Trip</span>
          </button>
          <button 
            onClick={handleShareTrip}
            className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <Share2 className="h-5 w-5" />
            <span>Share as PDF</span>
          </button>
        </div>
      </div>

      {/* Travel Info & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Best Time to Visit</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">{generatedTrip.bestTimeToVisit}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Local Tips</h3>
          </div>
          <ul className="space-y-2">
            {generatedTrip.localTips.map((tip, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-300 flex items-start">
                <span className="text-yellow-500 mr-2">💡</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hotels */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🏨 AI-Recommended Hotels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatedTrip.hotels.map((hotel) => (
            <div key={hotel.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">{hotel.name}</h3>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">{hotel.rating}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{hotel.location}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{hotel.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {symbol}{hotel.pricePerNight.toLocaleString()}/night
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itinerary */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🗓️ AI-Crafted Day-by-Day Itinerary</h2>
        <div className="space-y-6">
          {generatedTrip.itinerary.map((day) => (
            <div key={day.day} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Day {day.day}
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Daily Budget: {symbol}{day.dailyCost.toLocaleString()}
                </div>
              </div>
              
              <div className="space-y-4">
                {day.activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{activity.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{activity.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{symbol}{activity.cost.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          💡 <strong>AI Tip:</strong> {activity.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Meals for the day */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2">🍽️ AI-Recommended Meals</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {day.meals.map((meal) => (
                      <div key={meal.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {meal.type}
                          </span>
                          <span className="text-sm text-blue-600 dark:text-blue-400">
                            {symbol}{meal.cost.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">{meal.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{meal.cuisine}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{meal.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Attribution */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            🤖 Powered by Google Gemini AI
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            This personalized itinerary was generated using advanced AI technology to match your preferences, 
            budget, and travel style. Every recommendation is tailored specifically for your {generatedTrip.days}-day 
            {generatedTrip.travelType} trip to {generatedTrip.destination}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripResults;