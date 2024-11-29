import React, { useState } from 'react';
import { useCVStore } from '../store/cvStore';
import { Plus, X } from 'lucide-react';

export function CVForm() {
  const { cvData, updateCV } = useCVStore();
  const [newAchievement, setNewAchievement] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: '' });
  const [newInterest, setNewInterest] = useState('');

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateCV({
      personalInfo: {
        ...cvData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCV({
      skills: e.target.value.split('\n').filter(skill => skill.trim()),
    });
  };

  const addWorkExperience = () => {
    updateCV({
      workExperience: [
        ...cvData.workExperience,
        { title: '', company: '', period: '', achievements: [] }
      ]
    });
  };

  const updateWorkExperience = (index: number, field: string, value: string) => {
    const updatedExperience = [...cvData.workExperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value
    };
    updateCV({ workExperience: updatedExperience });
  };

  const addAchievement = (experienceIndex: number) => {
    if (!newAchievement.trim()) return;
    
    const updatedExperience = [...cvData.workExperience];
    updatedExperience[experienceIndex] = {
      ...updatedExperience[experienceIndex],
      achievements: [...updatedExperience[experienceIndex].achievements, newAchievement]
    };
    updateCV({ workExperience: updatedExperience });
    setNewAchievement('');
  };

  const removeAchievement = (experienceIndex: number, achievementIndex: number) => {
    const updatedExperience = [...cvData.workExperience];
    updatedExperience[experienceIndex] = {
      ...updatedExperience[experienceIndex],
      achievements: updatedExperience[experienceIndex].achievements.filter((_, i) => i !== achievementIndex)
    };
    updateCV({ workExperience: updatedExperience });
  };

  const removeWorkExperience = (index: number) => {
    updateCV({
      workExperience: cvData.workExperience.filter((_, i) => i !== index)
    });
  };

  const addCourse = () => {
    if (!newCourse.trim()) return;
    updateCV({
      courses: [...cvData.courses, newCourse]
    });
    setNewCourse('');
  };

  const removeCourse = (index: number) => {
    updateCV({
      courses: cvData.courses.filter((_, i) => i !== index)
    });
  };

  const addLanguage = () => {
    if (!newLanguage.name.trim() || !newLanguage.proficiency.trim()) return;
    updateCV({
      languages: [...cvData.languages, newLanguage]
    });
    setNewLanguage({ name: '', proficiency: '' });
  };

  const removeLanguage = (index: number) => {
    updateCV({
      languages: cvData.languages.filter((_, i) => i !== index)
    });
  };

  const addInterest = () => {
    if (!newInterest.trim()) return;
    updateCV({
      interests: [...cvData.interests, newInterest]
    });
    setNewInterest('');
  };

  const removeInterest = (index: number) => {
    updateCV({
      interests: cvData.interests.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">CV Information</h2>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={cvData.personalInfo.fullName}
              onChange={handlePersonalInfoChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={cvData.personalInfo.title}
              onChange={handlePersonalInfoChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={cvData.personalInfo.email}
              onChange={handlePersonalInfoChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={cvData.personalInfo.location}
              onChange={handlePersonalInfoChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              value={cvData.personalInfo.linkedin}
              onChange={handlePersonalInfoChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Profile Image URL</label>
            <input
              type="text"
              name="profileImage"
              value={cvData.personalInfo.profileImage}
              onChange={handlePersonalInfoChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Professional Summary</label>
            <textarea
              name="summary"
              value={cvData.personalInfo.summary}
              onChange={handlePersonalInfoChange}
              className="w-full p-2 border rounded h-32"
            />
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        <div>
          <label className="block text-sm font-medium mb-1">Skills (one per line)</label>
          <textarea
            value={cvData.skills.join('\n')}
            onChange={handleSkillsChange}
            className="w-full p-2 border rounded h-32"
          />
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Education</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Degree</label>
            <input
              type="text"
              value={cvData.education.degree}
              onChange={(e) => updateCV({ education: { ...cvData.education, degree: e.target.value } })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Institution</label>
            <input
              type="text"
              value={cvData.education.institution}
              onChange={(e) => updateCV({ education: { ...cvData.education, institution: e.target.value } })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>

      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Languages</h3>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              className="flex-1 p-2 border rounded"
              placeholder="Language name"
            />
            <input
              type="text"
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
              className="flex-1 p-2 border rounded"
              placeholder="Proficiency level"
            />
            <button
              onClick={addLanguage}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {cvData.languages.map((lang, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <span className="flex-1">
                  {lang.name} - {lang.proficiency}
                </span>
                <button
                  onClick={() => removeLanguage(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Interests</h3>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Add an interest"
              onKeyPress={(e) => e.key === 'Enter' && addInterest()}
            />
            <button
              onClick={addInterest}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {cvData.interests.map((interest, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <span className="flex-1">{interest}</span>
                <button
                  onClick={() => removeInterest(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <button
            onClick={addWorkExperience}
            className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            <Plus size={16} /> Add Experience
          </button>
        </div>
        <div className="space-y-6">
          {cvData.workExperience.map((exp, index) => (
            <div key={index} className="p-4 border rounded-lg relative">
              <button
                onClick={() => removeWorkExperience(index)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                <X size={20} />
              </button>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job Title</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => updateWorkExperience(index, 'title', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Period</label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => updateWorkExperience(index, 'period', e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., Jan 2020 - Present"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Achievements</label>
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <div key={achievementIndex} className="flex items-center gap-2">
                        <span className="flex-1">{achievement}</span>
                        <button
                          onClick={() => removeAchievement(index, achievementIndex)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      className="flex-1 p-2 border rounded"
                      placeholder="Add an achievement"
                      onKeyPress={(e) => e.key === 'Enter' && addAchievement(index)}
                    />
                    <button
                      onClick={() => addAchievement(index)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Conferences & Courses</h3>
        </div>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Add a course or conference"
              onKeyPress={(e) => e.key === 'Enter' && addCourse()}
            />
            <button
              onClick={addCourse}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {cvData.courses.map((course, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="flex-1">{course}</span>
                <button
                  onClick={() => removeCourse(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-6">
        <button
          onClick={() => window.print()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
}