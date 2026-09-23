import { useState } from 'react';
import html2pdf from 'html2pdf.js';

export default function ResumeBuilder() {
  const [template, setTemplate] = useState('canva-blue');

  const [personal, setPersonal] = useState({
    name: 'MARGARITA PEREZ, RN',
    title: 'REGISTERED NURSE',
    email: 'hello@reallygreatsite.com',
    phone: '+123-456-7890',
    address: '123 Anywhere St., Any City, ST 12345',
    linkedin: 'linkedin.com/in/margarita',
    github: 'github.com/margarita',
    portfolio: 'margaritaperez.com',
    summary: 'A passionate and dedicated registered nurse with expertise in medical-surgical nursing. Committed to providing quality healthcare and supporting patient recovery.'
  });

  const [skills, setSkills] = useState(['Patient Assessment', 'Electrocardiogram (ECG)', 'Clinical Research', 'Recording Patient History']);
  const [skillInput, setSkillInput] = useState('');

  const [experiences, setExperiences] = useState([
    { company: 'Stryde United Hospital', role: 'Staff Nurse', duration: 'June 2025 - Present', details: 'Provide clinical support to medical-surgical unit, recording patient health history and details.' }
  ]);

  const [projects, setProjects] = useState([
    { title: 'Community Outreach Program', tech: 'Healthcare Outreach', link: '', details: 'Organized health awareness campaigns and community outreach initiatives.' }
  ]);

  const [educations, setEducations] = useState([
    { school: 'Borcelle University', degree: 'Master of Science in Nursing', year: '2023' }
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

  const addProject = () => setProjects([...projects, { title: '', tech: '', link: '', details: '' }]);
  const removeProject = (index) => setProjects(projects.filter((_, i) => i !== index));

  const addEducation = () => setEducations([...educations, { school: '', degree: '', year: '' }]);
  const removeEducation = (index) => setEducations(educations.filter((_, i) => i !== index));

  const downloadPdf = () => {
    const element = document.getElementById('printable-resume');
    if (!element) return;

    const clone = element.cloneNode(true);
    clone.querySelectorAll('.remove-btn').forEach((btn) => btn.remove());

    const opt = {
      margin: 0,
      filename: `${personal.name || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(clone).save();
  };

  return (
    <div className="max-w-6xl mx-auto text-left space-y-6 sm:space-y-8">
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        
        {/* FORM CONTROLS */}
        <div className="w-full lg:flex-1 bg-slate-900 p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-800 text-white">
          <h2 className="text-white text-lg sm:text-xl font-bold mt-0">📄 Resume Builder</h2>
          
          <div className="my-4">
            <label className="text-xs text-slate-400 font-semibold block mb-1">Select Template Style:</label>
            <div className="grid grid-cols-3 gap-2">
              <button 
                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${template === 'canva-blue' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                onClick={() => setTemplate('canva-blue')}
              >
                💧 Blue & White
              </button>
              <button 
                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${template === 'modern' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                onClick={() => setTemplate('modern')}
              >
                🪟 Two-Column
              </button>
              <button 
                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${template === 'classic' ? 'bg-blue-600 text-white border-blue-500' : 'bg-slate-950 text-slate-400 border-slate-800'}`}
                onClick={() => setTemplate('classic')}
              >
                📜 Classic
              </button>
            </div>
          </div>

          <hr className="border-t border-slate-800 my-4" />

          {/* Personal Info */}
          <h3 className="font-semibold text-slate-200 my-2 text-sm sm:text-base">Personal Information</h3>
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} placeholder="Full Name" />
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.title} onChange={(e) => setPersonal({ ...personal, title: e.target.value })} placeholder="Job Title" />
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} placeholder="Email" />
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} placeholder="Phone" />
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.address || ''} onChange={(e) => setPersonal({ ...personal, address: e.target.value })} placeholder="Address / Location" />
          
          {/* Social Profiles */}
          <h3 className="font-semibold text-slate-200 my-2 text-sm sm:text-base">Social Profiles & Links</h3>
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.linkedin || ''} onChange={(e) => setPersonal({ ...personal, linkedin: e.target.value })} placeholder="LinkedIn Profile" />
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.github || ''} onChange={(e) => setPersonal({ ...personal, github: e.target.value })} placeholder="GitHub Profile" />
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.portfolio || ''} onChange={(e) => setPersonal({ ...personal, portfolio: e.target.value })} placeholder="Portfolio / Website" />

          <textarea className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 resize-none" value={personal.summary} onChange={(e) => setPersonal({ ...personal, summary: e.target.value })} placeholder="Summary" rows="3" />

          {/* Skills */}
          <h3 className="font-semibold text-slate-200 my-2 text-sm sm:text-base">Skills</h3>
          <div className="flex gap-2 mb-3">
            <input className="flex-1 min-w-0 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill" />
            <button className="px-3.5 sm:px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all cursor-pointer shrink-0" onClick={addSkill}>Add</button>
          </div>

          {/* Experience */}
          <h3 className="font-semibold text-slate-200 my-2 text-sm sm:text-base">Experience</h3>
          {experiences.map((exp, idx) => (
            <div key={idx} className="border-b border-slate-800 pb-3 mb-3">
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={exp.company} onChange={(e) => { const newExp = [...experiences]; newExp[idx].company = e.target.value; setExperiences(newExp); }} placeholder="Company" />
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={exp.role} onChange={(e) => { const newExp = [...experiences]; newExp[idx].role = e.target.value; setExperiences(newExp); }} placeholder="Role" />
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={exp.duration} onChange={(e) => { const newExp = [...experiences]; newExp[idx].duration = e.target.value; setExperiences(newExp); }} placeholder="Duration" />
              <textarea className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 resize-none" value={exp.details} onChange={(e) => { const newExp = [...experiences]; newExp[idx].details = e.target.value; setExperiences(newExp); }} placeholder="Details" rows="2" />
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-500 transition-all cursor-pointer" onClick={() => removeExperience(idx)}>Remove</button>
            </div>
          ))}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all cursor-pointer my-1" onClick={addExperience}>+ Add Experience</button>

          {/* Projects */}
          <h3 className="font-semibold text-slate-200 my-2 text-sm sm:text-base">Projects</h3>
          {projects.map((proj, idx) => (
            <div key={idx} className="border-b border-slate-800 pb-3 mb-3">
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={proj.title} onChange={(e) => { const newProj = [...projects]; newProj[idx].title = e.target.value; setProjects(newProj); }} placeholder="Project Title" />
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={proj.tech} onChange={(e) => { const newProj = [...projects]; newProj[idx].tech = e.target.value; setProjects(newProj); }} placeholder="Technologies Used" />
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={proj.link} onChange={(e) => { const newProj = [...projects]; newProj[idx].link = e.target.value; setProjects(newProj); }} placeholder="Project Link" />
              <textarea className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 resize-none" value={proj.details} onChange={(e) => { const newProj = [...projects]; newProj[idx].details = e.target.value; setProjects(newProj); }} placeholder="Details" rows="2" />
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-500 transition-all cursor-pointer" onClick={() => removeProject(idx)}>Remove</button>
            </div>
          ))}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all cursor-pointer my-1" onClick={addProject}>+ Add Project</button>

          {/* Education */}
          <h3 className="font-semibold text-slate-200 my-2 text-sm sm:text-base">Education</h3>
          {educations.map((edu, idx) => (
            <div key={idx} className="border-b border-slate-800 pb-3 mb-3">
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={edu.school} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].school = e.target.value; setEducations(newEdu); }} placeholder="School" />
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={edu.degree} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].degree = e.target.value; setEducations(newEdu); }} placeholder="Degree" />
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={edu.year} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].year = e.target.value; setEducations(newEdu); }} placeholder="Year" />
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-500 transition-all cursor-pointer" onClick={() => removeEducation(idx)}>Remove</button>
            </div>
          ))}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all cursor-pointer my-1" onClick={addEducation}>+ Add Education</button>

          <br /><br />
          <button className="w-full p-3 bg-emerald-600 text-white rounded-xl text-sm sm:text-base font-bold hover:bg-emerald-500 transition-all cursor-pointer" onClick={downloadPdf}>
            📥 Download PDF
          </button>
        </div>

        {/* PRINTABLE RESUME PREVIEW WITH LARGER FONTS & PADDING */}
        <div className="w-full lg:flex-1 lg:sticky lg:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div id="printable-resume" className="bg-white rounded-2xl shadow-xl border border-slate-200 text-slate-900 break-words overflow-hidden min-h-[1100px] flex flex-col justify-between">
            
            {/* TEMPLATE 1: BLUE & WHITE MODERN */}
            {template === 'canva-blue' ? (
              <div className="relative flex-1 flex flex-col justify-between">
                <div>
                  <div className="bg-sky-900 text-white p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase leading-tight">{personal.name || 'Your Name'}</h1>
                      <p className="text-sky-200 text-sm sm:text-base font-medium tracking-wide uppercase mt-1">{personal.title || 'Job Title'}</p>
                    </div>
                    <div className="text-xs sm:text-sm text-sky-100 space-y-1.5 sm:text-right border-t sm:border-t-0 border-sky-800 pt-3 sm:pt-0 w-full sm:w-auto">
                      <p className="m-0">📞 {personal.phone}</p>
                      <p className="m-0 break-all">✉️ {personal.email}</p>
                      {personal.address && <p className="m-0">📍 {personal.address}</p>}
                      {personal.linkedin && <p className="m-0 break-all">🔗 {personal.linkedin}</p>}
                      {personal.github && <p className="m-0 break-all">💻 {personal.github}</p>}
                      {personal.portfolio && <p className="m-0 break-all">🌐 {personal.portfolio}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 min-h-[850px]">
                    <div className="sm:col-span-1 bg-sky-50 p-6 sm:p-8 space-y-8 border-r border-sky-100">
                      {personal.summary && (
                        <div>
                          <h3 className="font-bold uppercase tracking-wider text-sky-900 text-sm border-b-2 border-sky-800 pb-1.5 mb-3">Personal Profile</h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{personal.summary}</p>
                        </div>
                      )}

                      {skills.length > 0 && (
                        <div>
                          <h3 className="font-bold uppercase tracking-wider text-sky-900 text-sm border-b-2 border-sky-800 pb-1.5 mb-3">Expert Skills</h3>
                          <ul className="list-disc list-inside text-xs sm:text-sm text-slate-700 space-y-2">
                            {skills.map((skill, i) => (
                              <li key={i} className="break-all">
                                {skill} <b className="remove-btn text-red-500 cursor-pointer ml-1" onClick={() => removeSkill(i)}>×</b>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {educations.length > 0 && (
                        <div>
                          <h3 className="font-bold uppercase tracking-wider text-sky-900 text-sm border-b-2 border-sky-800 pb-1.5 mb-3">Education</h3>
                          {educations.map((edu, i) => (
                            <div key={i} className="mb-4 text-xs sm:text-sm">
                              <strong className="block text-slate-900 font-bold">{edu.degree}</strong>
                              <span className="text-sky-700 font-medium">{edu.school}</span>
                              <small className="block text-slate-500 mt-1 text-xs">{edu.year}</small>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-2 p-6 sm:p-8 space-y-8">
                      {experiences.length > 0 && (
                        <div>
                          <h3 className="font-bold uppercase tracking-wider text-sky-900 text-sm border-b-2 border-sky-800 pb-1.5 mb-4">Work Experience</h3>
                          {experiences.map((exp, i) => (
                            <div key={i} className="mb-6">
                              <div className="flex justify-between items-baseline mb-1">
                                <strong className="text-sm sm:text-base text-slate-900 font-bold">{exp.role}</strong>
                                <small className="text-sky-700 font-bold text-xs sm:text-sm">{exp.duration}</small>
                              </div>
                              <div className="text-xs sm:text-sm text-slate-500 font-semibold mb-2">{exp.company}</div>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0">{exp.details}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {projects.length > 0 && (
                        <div>
                          <h3 className="font-bold uppercase tracking-wider text-sky-900 text-sm border-b-2 border-sky-800 pb-1.5 mb-4">Projects & Work</h3>
                          {projects.map((proj, i) => (
                            <div key={i} className="mb-6 text-xs sm:text-sm">
                              <div className="flex justify-between items-baseline mb-1">
                                <strong className="text-sm sm:text-base text-slate-900 font-bold">{proj.title}</strong>
                                {proj.link && <small className="text-sky-600 truncate max-w-[180px]">{proj.link}</small>}
                              </div>
                              {proj.tech && <span className="text-slate-500 font-medium block mb-2">Tech: {proj.tech}</span>}
                              <p className="text-slate-600 leading-relaxed m-0">{proj.details}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : template === 'modern' ? (
              /* TEMPLATE 2: MODERN TWO-COLUMN */
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="bg-slate-200 text-center py-8 px-6 border-b border-slate-300">
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-slate-800 m-0">{personal.name || 'Your Name'}</h1>
                    <p className="text-sm sm:text-base text-slate-600 font-medium m-0 mt-2">{personal.title || 'Job Title'}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 p-6 sm:p-10 gap-8 text-xs sm:text-sm min-h-[850px]">
                    <div className="sm:col-span-1 space-y-8 border-r-0 sm:border-r border-slate-200 pr-0 sm:pr-6">
                      {personal.summary && (
                        <div>
                          <h3 className="font-bold uppercase tracking-wider text-slate-800 mb-3 text-sm border-b pb-1.5">Profile</h3>
                          <p className="text-slate-600 leading-relaxed">{personal.summary}</p>
                        </div>
                      )}

                      <div>
                        <h3 className="font-bold uppercase tracking-wider text-slate-800 mb-3 text-sm border-b pb-1.5">Contact Me</h3>
                        <p className="text-slate-600 break-all m-0">{personal.email}</p>
                        <p className="text-slate-600 m-0 mt-1.5">{personal.phone}</p>
                        {personal.linkedin && <p className="text-slate-600 break-all m-0 mt-1.5">LinkedIn: {personal.linkedin}</p>}
                        {personal.github && <p className="text-slate-600 break-all m-0 mt-1.5">GitHub: {personal.github}</p>}
                        {personal.portfolio && <p className="text-slate-600 break-all m-0 mt-1.5">Web: {personal.portfolio}</p>}
                      </div>

                      {skills.length > 0 && (
                        <div>
                          <h3 className="font-bold uppercase tracking-wider text-slate-800 mb-3 text-sm border-b pb-1.5">Skills</h3>
                          <ul className="list-disc list-inside text-slate-600 space-y-2">
                            {skills.map((skill, i) => (
                              <li key={i} className="break-all">
                                {skill} <b className="remove-btn text-red-500 cursor-pointer ml-1" onClick={() => removeSkill(i)}>×</b>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-2 space-y-8">
                      {educations.length > 0 && (
                        <div>
                          <h3 className="font-bold uppercase tracking-wider text-slate-800 mb-3 text-sm border-b pb-1.5">Education</h3>
                          {educations.map((edu, i) => (
                            <div key={i} className="mb-4">
                              <strong className="block text-slate-800 text-sm sm:text-base">{edu.degree}</strong>
                              <span className="text-slate-600">{edu.school} ({edu.year})</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {experiences.length > 0 && (
                        <div>
                          <h3 className="font-bold uppercase tracking-wider text-slate-800 mb-3 text-sm border-b pb-1.5">Work Experience</h3>
                          {experiences.map((exp, i) => (
                            <div key={i} className="mb-5">
                              <strong className="block text-slate-800 text-sm sm:text-base">{exp.role} - <span className="text-blue-600">{exp.company}</span></strong>
                              <small className="text-slate-400 font-medium block mb-2">{exp.duration}</small>
                              <p className="text-slate-600 m-0 leading-relaxed">{exp.details}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {projects.length > 0 && (
                        <div>
                          <h3 className="font-bold uppercase tracking-wider text-slate-800 mb-3 text-sm border-b pb-1.5">Projects</h3>
                          {projects.map((proj, i) => (
                            <div key={i} className="mb-5">
                              <strong className="block text-slate-800 text-sm sm:text-base">{proj.title}</strong>
                              {proj.tech && <span className="text-slate-500 text-xs block mb-1">Tech: {proj.tech}</span>}
                              <p className="text-slate-600 m-0 leading-relaxed">{proj.details}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* TEMPLATE 3: CLASSIC SINGLE-COLUMN */
              <div className="p-8 sm:p-12 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-8">
                    <h1 className="m-0 mb-2 text-slate-900 text-3xl sm:text-4xl font-bold">{personal.name || 'Your Name'}</h1>
                    <h3 className="text-blue-600 m-0 mb-3 text-lg sm:text-xl font-semibold">{personal.title || 'Job Title'}</h3>
                    <div className="text-xs sm:text-sm text-slate-500 space-x-2">
                      <span>{personal.email}</span>
                      <span>|</span>
                      <span>{personal.phone}</span>
                      {personal.linkedin && <><span>|</span><span>{personal.linkedin}</span></>}
                      {personal.github && <><span>|</span><span>{personal.github}</span></>}
                      {personal.portfolio && <><span>|</span><span>{personal.portfolio}</span></>}
                    </div>
                    {personal.summary && <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed">{personal.summary}</p>}
                  </div>

                  <hr className="border-t-2 border-slate-200 my-6 sm:my-8" />

                  <div className="mb-8 sm:mb-10">
                    <h3 className="text-slate-800 mb-4 uppercase text-sm sm:text-base tracking-wider font-semibold">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs sm:text-sm border border-slate-200 flex items-center">
                          {skill} <b className="remove-btn text-red-500 ml-2 cursor-pointer shrink-0" onClick={() => removeSkill(i)}>×</b>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8 sm:mb-10">
                    <h3 className="text-slate-800 mb-4 uppercase text-sm sm:text-base tracking-wider font-semibold">Work Experience</h3>
                    {experiences.map((exp, i) => (
                      <div key={i} className="mb-6">
                        <div className="flex justify-between items-baseline mb-1">
                          <strong className="text-sm sm:text-base text-slate-900 font-bold">{exp.role}</strong>
                          <small className="text-slate-500 font-bold text-xs sm:text-sm">{exp.duration}</small>
                        </div>
                        <div className="text-blue-600 text-xs sm:text-sm mb-2">{exp.company}</div>
                        <p className="text-xs sm:text-sm m-0 text-slate-700 leading-relaxed">{exp.details}</p>
                      </div>
                    ))}
                  </div>

                  {projects.length > 0 && (
                    <div className="mb-8 sm:mb-10">
                      <h3 className="text-slate-800 mb-4 uppercase text-sm sm:text-base tracking-wider font-semibold">Projects</h3>
                      {projects.map((proj, i) => (
                        <div key={i} className="mb-6">
                          <strong className="text-sm sm:text-base text-slate-900 font-bold block mb-1">{proj.title}</strong>
                          {proj.tech && <span className="text-slate-500 text-xs sm:text-sm block mb-2">Tech: {proj.tech}</span>}
                          <p className="text-xs sm:text-sm m-0 text-slate-700 leading-relaxed">{proj.details}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <h3 className="text-slate-800 mb-4 uppercase text-sm sm:text-base tracking-wider font-semibold">Education</h3>
                    {educations.map((edu, i) => (
                      <div key={i} className="mb-6">
                        <div className="flex justify-between items-baseline mb-1">
                          <strong className="text-sm sm:text-base text-slate-900 font-bold">{edu.degree}</strong>
                          <small className="text-slate-500 font-bold text-xs sm:text-sm">{edu.year}</small>
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm">{edu.school}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}