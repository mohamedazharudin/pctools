import { useState } from 'react';

export default function ResumeBuilder() {
  const [personal, setPersonal] = useState({
    name: 'Jane Doe',
    title: 'Full Stack Developer',
    email: 'jane@example.com',
    phone: '+1 234 567 890',
    summary: 'Passionate developer skilled in building scalable web applications.'
  });

  const [skills, setSkills] = useState(['React', 'JavaScript', 'Node.js', 'CSS']);
  const [skillInput, setSkillInput] = useState('');

  const [experiences, setExperiences] = useState([
    { company: 'Tech Corp', role: 'Frontend Developer', duration: '2023 - Present', details: 'Built responsive web applications and managed API integrations.' }
  ]);

  const [educations, setEducations] = useState([
    { school: 'State University', degree: 'B.S. Computer Science', year: '2019 - 2023' }
  ]);

  const addSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (index) => setSkills(skills.filter((_, i) => i !== index));

  const addExperience = () => setExperiences([...experiences, { company: '', role: '', duration: '', details: '' }]);
  const removeExperience = (index) => setExperiences(experiences.filter((_, i) => i !== index));

  const addEducation = () => setEducations([...educations, { school: '', degree: '', year: '' }]);
  const removeEducation = (index) => setEducations(educations.filter((_, i) => i !== index));

  return (
    <div className="max-w-6xl mx-auto text-left">
      <div className="flex flex-wrap gap-5">
        
        {/* FORM CONTROLS */}
        <div className="flex-1 min-w-[320px] bg-white p-5 rounded-lg shadow border border-slate-100">
          <h2 className="text-slate-800 text-xl font-bold mt-0">📄 Resume Builder</h2>
          <p className="text-slate-500 text-sm mb-4">Fill out your details to generate your resume instantly.</p>
          <hr className="border-t border-slate-200 my-4" />

          <h3 className="font-semibold text-slate-800 my-2">Personal Information</h3>
          <input className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} placeholder="Full Name" />
          <input className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={personal.title} onChange={(e) => setPersonal({ ...personal, title: e.target.value })} placeholder="Job Title" />
          <input className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} placeholder="Email" />
          <input className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} placeholder="Phone" />
          <textarea className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={personal.summary} onChange={(e) => setPersonal({ ...personal, summary: e.target.value })} placeholder="Summary" rows="3" />

          <h3 className="font-semibold text-slate-800 my-2">Skills</h3>
          <div className="flex gap-1.5 mb-2.5">
            <input className="flex-1 p-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill" />
            <button className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700" onClick={addSkill}>Add</button>
          </div>

          <h3 className="font-semibold text-slate-800 my-2">Experience</h3>
          {experiences.map((exp, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-2.5 mb-2.5">
              <input className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={exp.company} onChange={(e) => { const newExp = [...experiences]; newExp[idx].company = e.target.value; setExperiences(newExp); }} placeholder="Company" />
              <input className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={exp.role} onChange={(e) => { const newExp = [...experiences]; newExp[idx].role = e.target.value; setExperiences(newExp); }} placeholder="Role" />
              <input className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={exp.duration} onChange={(e) => { const newExp = [...experiences]; newExp[idx].duration = e.target.value; setExperiences(newExp); }} placeholder="Duration" />
              <textarea className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={exp.details} onChange={(e) => { const newExp = [...experiences]; newExp[idx].details = e.target.value; setExperiences(newExp); }} placeholder="Details" />
              <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600" onClick={() => removeExperience(idx)}>Remove</button>
            </div>
          ))}
          <button className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 my-1" onClick={addExperience}>+ Add Experience</button>

          <h3 className="font-semibold text-slate-800 my-2">Education</h3>
          {educations.map((edu, idx) => (
            <div key={idx} className="border-b border-gray-200 pb-2.5 mb-2.5">
              <input className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={edu.school} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].school = e.target.value; setEducations(newEdu); }} placeholder="School" />
              <input className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={edu.degree} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].degree = e.target.value; setEducations(newEdu); }} placeholder="Degree" />
              <input className="w-full p-2 mb-2 rounded border border-gray-300 text-sm focus:outline-blue-500" value={edu.year} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].year = e.target.value; setEducations(newEdu); }} placeholder="Year" />
              <button className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600" onClick={() => removeEducation(idx)}>Remove</button>
            </div>
          ))}
          <button className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 my-1" onClick={addEducation}>+ Add Education</button>

          <br /><br />
          <button className="w-full p-3 bg-emerald-500 text-white rounded text-base font-bold hover:bg-emerald-600 transition-colors" onClick={() => window.print()}>
            🖨️ Download / Print PDF
          </button>
        </div>

        {/* PRINTABLE RESUME PREVIEW */}
        <div className="flex-1 min-w-[320px]">
          <div id="printable-resume" className="bg-white p-10 rounded-lg shadow border border-slate-200 min-h-[650px]">
            
            {/* Header Section */}
            <div className="mb-6">
              <h1 className="m-0 mb-2 text-slate-900 text-3xl font-bold">{personal.name || 'Your Name'}</h1>
              <h3 className="text-blue-600 m-0 mb-2 text-lg font-semibold">{personal.title || 'Job Title'}</h3>
              <p className="text-sm text-slate-500 m-0">{personal.email} | {personal.phone}</p>
              {personal.summary && <p className="text-sm text-slate-700 mt-3 leading-relaxed">{personal.summary}</p>}
            </div>

            <hr className="border-t-2 border-slate-200 my-6" />

            {/* Skills Section */}
            <div className="mb-8">
              <h3 className="text-slate-800 mb-3 uppercase text-base tracking-wider font-semibold">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded text-xs border border-slate-200 flex items-center">
                    {skill} <b className="remove-btn text-red-500 ml-1.5 cursor-pointer" onClick={() => removeSkill(i)}>×</b>
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-8">
              <h3 className="text-slate-800 mb-4 uppercase text-base tracking-wider font-semibold">Work Experience</h3>
              {experiences.map((exp, i) => (
                <div key={i} className="mb-5">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-sm text-slate-900 font-bold">{exp.role}</strong>
                    <small className="text-slate-500 font-bold text-xs">{exp.duration}</small>
                  </div>
                  <div className="text-blue-600 text-sm mb-1.5">{exp.company}</div>
                  <p className="text-sm m-0 text-slate-700 leading-relaxed">{exp.details}</p>
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div className="mb-5">
              <h3 className="text-slate-800 mb-4 uppercase text-base tracking-wider font-semibold">Education</h3>
              {educations.map((edu, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <strong className="text-sm text-slate-900 font-bold">{edu.degree}</strong>
                    <small className="text-slate-500 font-bold text-xs">{edu.year}</small>
                  </div>
                  <div className="text-slate-600 text-sm">{edu.school}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}