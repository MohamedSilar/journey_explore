import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, Calendar, Clock, ArrowRight, TrendingUp, Globe, Star } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Mock data for recent trips
  const recentTrips = [
    {
      id: '1',
      destination: 'Paris, France',
      days: 5,
      budget: 'moderate',
      travelType: 'couple',
      createdAt: new Date('2024-01-15'),
      image: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '2',
      destination: 'Tokyo, Japan',
      days: 7,
      budget: 'luxury',
      travelType: 'solo',
      createdAt: new Date('2024-01-10'),
      image: 'https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: '3',
      destination: 'Bali, Indonesia',
      days: 10,
      budget: 'cheap',
      travelType: 'friends',
      createdAt: new Date('2024-01-05'),
      image: 'https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const popularDestinations = [
    { name: 'Santorini, Greece', trips: 1247, image: 'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Kyoto, Japan', trips: 1156, image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Machu Picchu, Peru', trips: 987, image: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome to Journey_Explore!
            </h1>
            <p className="text-blue-100 text-lg">
              Ready to plan your next adventure? Let's create something amazing together.
            </p>
          </div>
          <div className="hidden md:block">
            <Globe className="w-16 h-16 text-blue-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/create-trip"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Create New Trip
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Plan a new adventure with AI-powered recommendations
          </p>
        </Link>

        <Link
          to="/profile"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            My Trips
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            View and manage your planned adventures
          </p>
        </Link>

        <Link
          to="/settings"
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Preferences
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your travel preferences and settings
          </p>
        </Link>
      </div>

      {/* Popular Destinations */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
            Popular Destinations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularDestinations.map((destination, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {destination.name}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>{destination.trips} trips planned</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span>Popular</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Sample Trip Plans
          </h2>
          <Link
            to="/create-trip"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            Create Your Own
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTrips.map((trip) => (
            <div
              key={trip.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={trip.image}
                  alt={trip.destination}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {trip.destination}
              </h3>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {trip.days} days
                </div>
                <div className="flex items-center">
                  <span className="capitalize">{trip.budget}</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{trip.travelType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
