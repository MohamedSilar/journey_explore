import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun, User, Bell, Shield, Globe, MapPin, DollarSign } from 'lucide-react';

const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailUpdates: false,
    defaultBudget: 'moderate',
    defaultTravelType: 'solo',
    currency: 'INR',
    language: 'Tamil'
  });

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {preferences.language === 'Tamil' ? 'அமைப்புகள்' : 'Settings'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {preferences.language === 'Tamil' 
            ? 'உங்கள் Journey_Explore அனுபவத்தை தனிப்பயனாக்கவும்'
            : 'Customize your Journey_Explore experience'
          }
        </p>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          {isDarkMode ? (
            <Moon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          ) : (
            <Sun className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          )}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {preferences.language === 'Tamil' ? 'தோற்றம்' : 'Appearance'}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {preferences.language === 'Tamil' ? 'இருண்ட பயன்முறை' : 'Dark Mode'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {preferences.language === 'Tamil' 
                  ? 'வெளிச்சம் மற்றும் இருண்ட தீம்களுக்கு இடையில் மாறவும்'
                  : 'Switch between light and dark themes'
                }
              </p>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Travel Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {preferences.language === 'Tamil' ? 'பயண விருப்பத்தேர்வுகள்' : 'Travel Preferences'}
          </h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {preferences.language === 'Tamil' ? 'இயல்புநிலை பட்ஜெட் விருப்பம்' : 'Default Budget Preference'}
            </label>
            <select
              value={preferences.defaultBudget}
              onChange={(e) => handlePreferenceChange('defaultBudget', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="cheap">{preferences.language === 'Tamil' ? 'பட்ஜெட்' : 'Budget'}</option>
              <option value="moderate">{preferences.language === 'Tamil' ? 'மிதமான' : 'Moderate'}</option>
              <option value="luxury">{preferences.language === 'Tamil' ? 'ஆடம்பரம்' : 'Luxury'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {preferences.language === 'Tamil' ? 'இயல்புநிலை பயண வகை' : 'Default Travel Type'}
            </label>
            <select
              value={preferences.defaultTravelType}
              onChange={(e) => handlePreferenceChange('defaultTravelType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="solo">{preferences.language === 'Tamil' ? 'தனியாக' : 'Solo'}</option>
              <option value="couple">{preferences.language === 'Tamil' ? 'ஜோடி' : 'Couple'}</option>
              <option value="family">{preferences.language === 'Tamil' ? 'குடும்பம்' : 'Family'}</option>
              <option value="friends">{preferences.language === 'Tamil' ? 'நண்பர்கள்' : 'Friends'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {preferences.language === 'Tamil' ? 'விருப்பமான நாணயம்' : 'Preferred Currency'}
            </label>
            <select
              value={preferences.currency}
              onChange={(e) => handlePreferenceChange('currency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="INR">INR (₹) - {preferences.language === 'Tamil' ? 'இந்திய ரூபாய்' : 'Indian Rupee'}</option>
              <option value="USD">USD ($) - {preferences.language === 'Tamil' ? 'அமெரிக்க டாலர்' : 'US Dollar'}</option>
              <option value="EUR">EUR (€) - {preferences.language === 'Tamil' ? 'யூரோ' : 'Euro'}</option>
              <option value="GBP">GBP (£) - {preferences.language === 'Tamil' ? 'பிரிட்டிஷ் பவுண்ட்' : 'British Pound'}</option>
              <option value="JPY">JPY (¥) - {preferences.language === 'Tamil' ? 'ஜப்பானிய யென்' : 'Japanese Yen'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {preferences.language === 'Tamil' ? 'அறிவிப்புகள்' : 'Notifications'}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {preferences.language === 'Tamil' ? 'பயண நினைவூட்டல்கள்' : 'Trip Reminders'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {preferences.language === 'Tamil' 
                  ? 'வரவிருக்கும் பயணங்கள் மற்றும் முக்கிய புதுப்பிப்புகள் பற்றி அறிவிப்பு பெறுங்கள்'
                  : 'Get notified about upcoming trips and important updates'
                }
              </p>
            </div>
            <button
              onClick={() => handlePreferenceChange('notifications', !preferences.notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.notifications ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {preferences.language === 'Tamil' ? 'மின்னஞ்சல் புதுப்பிப்புகள்' : 'Email Updates'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {preferences.language === 'Tamil' 
                  ? 'பயண குறிப்புகள் மற்றும் இலக்கு பரிந்துரைகளைப் பெறுங்கள்'
                  : 'Receive travel tips and destination recommendations'
                }
              </p>
            </div>
            <button
              onClick={() => handlePreferenceChange('emailUpdates', !preferences.emailUpdates)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                preferences.emailUpdates ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  preferences.emailUpdates ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Language & Region */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {preferences.language === 'Tamil' ? 'மொழி மற்றும் பகுதி' : 'Language & Region'}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {preferences.language === 'Tamil' ? 'மொழி' : 'Language'}
            </label>
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange('language', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Tamil">தமிழ் (Tamil)</option>
              <option value="English">English</option>
              <option value="Hindi">हिन्दी (Hindi)</option>
              <option value="Spanish">Español</option>
              <option value="French">Français</option>
              <option value="German">Deutsch</option>
              <option value="Japanese">日本語</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {preferences.language === 'Tamil' ? 'தரவு மற்றும் தனியுரிமை' : 'Data & Privacy'}
          </h2>
        </div>
        
        <div className="space-y-4">
          <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {preferences.language === 'Tamil' ? 'தரவு ஏற்றுமதி' : 'Export Data'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {preferences.language === 'Tamil' 
                ? 'உங்கள் பயணத் திட்டங்கள் மற்றும் விருப்பத்தேர்வுகளைப் பதிவிறக்கவும்'
                : 'Download your travel plans and preferences'
              }
            </p>
          </button>
          
          <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {preferences.language === 'Tamil' ? 'தனியுரிமைக் கொள்கை' : 'Privacy Policy'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {preferences.language === 'Tamil' 
                ? 'உங்கள் தரவை நாங்கள் எவ்வாறு பாதுகாக்கிறோம் என்பதை அறியுங்கள்'
                : 'Learn how we protect your data'
              }
            </p>
          </button>
          
          <button className="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {preferences.language === 'Tamil' ? 'சேவை விதிமுறைகள்' : 'Terms of Service'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {preferences.language === 'Tamil' 
                ? 'எங்கள் விதிமுறைகள் மற்றும் நிபந்தனைகளைப் படியுங்கள்'
                : 'Read our terms and conditions'
              }
            </p>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
          {preferences.language === 'Tamil' ? 'விருப்பத்தேர்வுகளைச் சேமிக்கவும்' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
};

export default Settings;