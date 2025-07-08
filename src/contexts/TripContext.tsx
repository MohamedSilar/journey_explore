import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Trip {
  id: string;
  destination: string;
  days: number;
  budget: 'cheap' | 'moderate' | 'luxury';
  travelType: 'solo' | 'couple' | 'family' | 'friends';
  currency: string;
  totalCost: number;
  createdAt: Date;
  status: 'saved' | 'planning' | 'completed';
  image: string;
  itinerary?: any[];
  hotels?: any[];
}

interface TripContextType {
  savedTrips: Trip[];
  addTrip: (trip: Trip) => void;
  removeTrip: (tripId: string) => void;
  updateTripStatus: (tripId: string, status: string) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};

export const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedTrips, setSavedTrips] = useState<Trip[]>([
    {
      id: '1',
      destination: 'Goa, India',
      days: 5,
      budget: 'moderate',
      travelType: 'couple',
      totalCost: 25000,
      currency: 'INR',
      createdAt: new Date('2024-01-15'),
      status: 'saved',
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      destination: 'Kerala, India',
      days: 7,
      budget: 'luxury',
      travelType: 'solo',
      totalCost: 45000,
      currency: 'INR',
      createdAt: new Date('2024-01-10'),
      status: 'completed',
      image: 'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      destination: 'Tamil Nadu, India',
      days: 10,
      budget: 'cheap',
      travelType: 'friends',
      totalCost: 18000,
      currency: 'INR',
      createdAt: new Date('2024-01-05'),
      status: 'planning',
      image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]);

  const addTrip = (trip: Trip) => {
    setSavedTrips(prev => [trip, ...prev]);
  };

  const removeTrip = (tripId: string) => {
    setSavedTrips(prev => prev.filter(trip => trip.id !== tripId));
  };

  const updateTripStatus = (tripId: string, status: string) => {
    setSavedTrips(prev => 
      prev.map(trip => 
        trip.id === tripId ? { ...trip, status: status as any } : trip
      )
    );
  };

  return (
    <TripContext.Provider value={{ savedTrips, addTrip, removeTrip, updateTripStatus }}>
      {children}
    </TripContext.Provider>
  );
};
