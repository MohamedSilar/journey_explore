import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileData {
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  joinDate: Date;
}

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (updates: Partial<ProfileData>) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>({
    name: 'Journey Explorer',
    email: 'explorer@journey.com',
    avatar: '',
    bio: 'Travel Enthusiast & Adventure Seeker',
    location: 'India',
    joinDate: new Date('2024-01-01')
  });

  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};