import React from 'react';
import { Mail, MapPin, Linkedin, Award } from 'lucide-react';
import { useCVStore } from '../store/cvStore';

export function CVPreview() {
  const { cvData } = useCVStore();

  return (
    <div className="max-w-5xl w-full bg-white shadow-xl flex print:shadow-none print:text-[11px]">
      {/* Sidebar */}
      <div className="w-1/3 bg-[#2D2F3E] text-white p-6 print:p-4">
        <div className="flex flex-col items-center mb-6 print:mb-4">
          <img
            src={cvData.personalInfo.profileImage}
            alt="Profile"
            className="w-24 h-24 print:w-20 print:h-20 rounded-full border-4 border-[#3E97A7] mb-3"
          />
        </div>

        {/* Skills Section */}
        <div className="mb-6 print:mb-4">
          <h2 className="text-base font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-6 bg-[#3E97A7] rounded-full flex items-center justify-center text-sm">
              💡
            </span>
            SKILLS
          </h2>
          <div className="space-y-1">
            {cvData.skills.map((skill) => (
              <div key={skill} className="bg-[#363848] p-1.5 rounded text-xs">
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-6 print:mb-4">
          <h2 className="text-base font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-6 bg-[#3E97A7] rounded-full flex items-center justify-center text-sm">
              📚
            </span>
            EDUCATION
          </h2>
          <div className="text-xs">
            <h3 className="font-medium">{cvData.education.degree}</h3>
            <p className="text-gray-400">{cvData.education.institution}</p>
          </div>
        </div>

        {/* Languages Section */}
        <div className="mb-6 print:mb-4">
          <h2 className="text-base font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-6 bg-[#3E97A7] rounded-full flex items-center justify-center text-sm">
              🌎
            </span>
            LANGUAGES
          </h2>
          <div className="space-y-1 text-xs">
            {cvData.languages.map((lang) => (
              <p key={lang.name}>
                {lang.name} <span className="text-gray-400">({lang.proficiency})</span>
              </p>
            ))}
          </div>
        </div>

        {/* Interests Section */}
        <div>
          <h2 className="text-base font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-6 bg-[#3E97A7] rounded-full flex items-center justify-center text-sm">
              🎯
            </span>
            INTERESTS
          </h2>
          <div className="space-y-1 text-xs">
            {cvData.interests.map((interest) => (
              <p key={interest}>{interest}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-6 print:p-4">
        <div className="mb-4">
          <h1 className="text-2xl print:text-xl font-bold text-gray-800">{cvData.personalInfo.fullName}</h1>
          <p className="text-[#3E97A7] font-medium text-sm">{cvData.personalInfo.title}</p>
          <p className="text-gray-600 mt-2 text-sm print:text-xs">{cvData.personalInfo.summary}</p>
        </div>

        <div className="flex gap-3 mb-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Mail size={14} />
            <span>{cvData.personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>{cvData.personalInfo.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Linkedin size={14} />
            <span>{cvData.personalInfo.linkedin}</span>
          </div>
        </div>

        {/* Work Experience */}
        <div>
          <h2 className="text-lg print:text-base font-bold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-[#3E97A7] rounded-full flex items-center justify-center text-white">
              💼
            </span>
            WORK EXPERIENCE
          </h2>

          <div className="space-y-4">
            {cvData.workExperience.map((exp, index) => (
              <div key={index} className="relative pl-6 border-l-2 border-[#3E97A7]">
                <div className="absolute w-3 h-3 bg-[#3E97A7] rounded-full -left-[7px] top-0"></div>
                <h3 className="font-bold text-sm">{exp.title}</h3>
                <p className="text-[#3E97A7] text-xs">{exp.company}</p>
                <p className="text-xs text-gray-500">{exp.period}</p>
                <div className="mt-1 space-y-0.5 text-xs text-gray-600">
                  {exp.achievements.map((achievement, i) => (
                    <p key={i}>• {achievement}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div className="mt-4">
          <h2 className="text-lg print:text-base font-bold mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-[#3E97A7] rounded-full flex items-center justify-center text-white">
              <Award size={16} />
            </span>
            CONFERENCES & COURSES
          </h2>
          <div className="space-y-1 text-xs text-gray-600">
            {cvData.courses.map((course, index) => (
              <p key={index}>• {course}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}