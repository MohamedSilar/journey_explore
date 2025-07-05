import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Users, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { generateTripPlan, TripRequest } from '../../services/geminiService';

const CreateTrip: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    destination: '',
    days: 3,
    budget: 'moderate' as 'cheap' | 'moderate' | 'luxury',
    travelType: 'solo' as 'solo' | 'couple' | 'family' | 'friends',
    currency: 'INR' as 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError(null);
    
    try {
      const tripRequest: TripRequest = {
        destination: formData.destination,
        days: formData.days,
        budget: formData.budget,
        travelType: formData.travelType,
        currency: formData.currency
      };

      const generatedTrip = await generateTripPlan(tripRequest);
      
      navigate('/trip-results', { 
        state: { 
          tripData: formData,
          generatedTrip: generatedTrip
        } 
      });
    } catch (err) {
      console.error('Error generating trip:', err);
      setError('Failed to generate trip plan. Please try again.');
      setIsGenerating(false);
    }
  };

  const budgetOptions = [
    { value: 'cheap', label: 'Budget', description: 'Affordable options', icon: '💰', inr: '₹5,000-15,000' },
    { value: 'moderate', label: 'Moderate', description: 'Balance of cost and comfort', icon: '💰💰', inr: '₹15,000-40,000' },
    { value: 'luxury', label: 'Luxury', description: 'Premium experiences', icon: '💰💰💰', inr: '₹40,000+' },
  ];

  const travelTypeOptions = [
    { value: 'solo', label: 'Solo', description: 'Just me', icon: '🎒' },
    { value: 'couple', label: 'Couple', description: 'Two people', icon: '💑' },
    { value: 'family', label: 'Family', description: 'With kids', icon: '👨‍👩‍👧‍👦' },
    { value: 'friends', label: 'Friends', description: 'Group adventure', icon: '👥' },
  ];

  if (isGenerating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <Sparkles className="absolute inset-0 h-32 w-32 text-yellow-400 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🤖 AI is Creating Your Perfect Trip
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Our Gemini AI is analyzing your preferences and crafting a personalized itinerary...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This may take 10-30 seconds for the best results
          </p>
          <div className="mt-6 flex justify-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 max-w-md">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                ✨ Generating personalized recommendations<br/>
                🏨 Finding the best accommodations<br/>
                🗺️ Creating day-by-day itinerary<br/>
                💰 Calculating accurate costs
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Plan Your Perfect Trip with AI
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Powered by M Mohamed Silar 
          </p>
          <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            AI-Powered Trip Planning Active
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Destination */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <label className="text-xl font-semibold text-gray-900 dark:text-white">
                Where do you want to go?
              </label>
            </div>
            <input
              type="text"
              required
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="Enter destination (e.g., Goa, Kerala, Rajasthan, Paris, Tokyo, New York)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              💡 Be specific for better results (e.g., "Udaipur, Rajasthan" instead of just "Rajasthan")
            </p>
          </div>

          {/* Days */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <label className="text-xl font-semibold text-gray-900 dark:text-white">
                How many days?
              </label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="30"
                value={formData.days}
                onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 min-w-[3rem]">
                {formData.days}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              🎯 AI will optimize your itinerary based on the duration
            </p>
          </div>

          {/* Currency Selection */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <label className="text-xl font-semibold text-gray-900 dark:text-white">
                Preferred Currency
              </label>
            </div>
            <select
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value as any })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            >
              <option value="INR">₹ Indian Rupee (INR)</option>
              <option value="USD">$ US Dollar (USD)</option>
              <option value="EUR">€ Euro (EUR)</option>
              <option value="GBP">£ British Pound (GBP)</option>
              <option value="JPY">¥ Japanese Yen (JPY)</option>
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <label className="text-xl font-semibold text-gray-900 dark:text-white">
                What's your budget preference?
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {budgetOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, budget: option.value as any })}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    formData.budget === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {option.description}
                  </div>
                  {formData.currency === 'INR' && (
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {option.inr}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Type */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <label className="text-xl font-semibold text-gray-900 dark:text-white">
                Who's traveling?
              </label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {travelTypeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, travelType: option.value as any })}
                  className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                    formData.travelType === option.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className="text-2xl mb-2">{option.icon}</div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    {option.label}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
            >
              <Sparkles className="h-5 w-5" />
              <span>Generate AI-Powered Trip</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              🚀 Powered by Mohamed Silar
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrip;