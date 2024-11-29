import { create } from 'zustand';
import { CVData } from '../types/cv';

interface CVStore {
  cvData: CVData;
  updateCV: (data: Partial<CVData>) => void;
}

const defaultCV: CVData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    location: '',
    linkedin: '',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces',
    summary: '',
  },
  skills: [],
  education: {
    degree: '',
    institution: '',
  },
  languages: [],
  interests: [],
  workExperience: [],
  courses: [],
};

export const useCVStore = create<CVStore>((set) => ({
  cvData: defaultCV,
  updateCV: (data) => set((state) => ({
    cvData: { ...state.cvData, ...data },
  })),
}));