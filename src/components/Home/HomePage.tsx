import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, MapPin, Calendar, DollarSign, Users, Sparkles } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Compass className="h-20 w-20 text-blue-600 dark:text-blue-400 animate-pulse" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400 animate-bounce" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Journey_<span className="text-blue-600 dark:text-blue-400">Explore</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your AI-powered travel companion that creates personalized adventures tailored to your dreams, budget, and style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/create-trip"
                className="bg-black-600 hover:bg-black-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Plan Your Adventure
              </Link>
              <Link
                to="/dashboard"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Journey_Explore?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover the features that make your travel planning effortless and exciting
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 transform hover:scale-105 transition-transform duration-200">
              <MapPin className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smart Destinations
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                AI-powered recommendations based on your preferences and travel history
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 transform hover:scale-105 transition-transform duration-200">
              <Calendar className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Perfect Timing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Optimize your itinerary with real-time scheduling and weather insights
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 transform hover:scale-105 transition-transform duration-200">
              <DollarSign className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Budget Friendly
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get personalized plans that fit your budget, from budget to luxury
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 transform hover:scale-105 transition-transform duration-200">
              <Users className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Group Ready
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Plans tailored for solo trips, couples, families, or friend groups
              </p>
            </div>
          </div>
        </div>
      </div>

    {/* CTA Section */}
<div className="py-16 bg-black">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold text-white mb-4">
      Ready to Explore the World?
    </h2>
    <p className="text-xl text-gray-300 mb-8">
      Start planning your perfect adventure with AI-powered recommendations
    </p>
    <Link
      to="/create-trip"
      className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
    >
      Start Planning Now
    </Link>
  </div>
</div>

  );
};

export default HomePage;
