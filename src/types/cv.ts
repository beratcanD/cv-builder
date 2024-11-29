export interface CVData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    location: string;
    linkedin: string;
    profileImage: string;
    summary: string;
  };
  skills: string[];
  education: {
    degree: string;
    institution: string;
  };
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
  interests: string[];
  workExperience: Array<{
    title: string;
    company: string;
    period: string;
    achievements: string[];
  }>;
  courses: string[];
}