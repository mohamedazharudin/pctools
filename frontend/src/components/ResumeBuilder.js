import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ResumeBuilder() {
  const { t } = useTranslation();

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
    <div className="max-w-6xl mx-auto text-left space-y-8">
      {/* Tool Container */}
      <div className="flex flex-wrap gap-5">
        
        {/* FORM CONTROLS */}
        <div className="flex-1 min-w-[320px] bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-800 text-white">
          <h2 className="text-white text-xl font-bold mt-0">📄 {t('title', 'Resume Builder')}</h2>
          <p className="text-slate-400 text-sm mb-4">{t('subtitle', 'Fill out your details to generate your resume instantly.')}</p>
          <hr className="border-t border-slate-800 my-4" />

          <h3 className="font-semibold text-slate-200 my-2">{t('personalInfoTitle', 'Personal Information')}</h3>
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} placeholder={t('placeholders.name', 'Full Name')} />
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.title} onChange={(e) => setPersonal({ ...personal, title: e.target.value })} placeholder={t('placeholders.title', 'Job Title')} />
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} placeholder={t('placeholders.email', 'Email')} />
          <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} placeholder={t('placeholders.phone', 'Phone')} />
          <textarea className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 resize-none" value={personal.summary} onChange={(e) => setPersonal({ ...personal, summary: e.target.value })} placeholder={t('placeholders.summary', 'Summary')} rows="3" />

          <h3 className="font-semibold text-slate-200 my-2">{t('skillsTitle', 'Skills')}</h3>
          <div className="flex gap-2 mb-3">
            <input className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder={t('placeholders.skill', 'Add a skill')} />
            <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all cursor-pointer" onClick={addSkill}>{t('addBtn', 'Add')}</button>
          </div>

          <h3 className="font-semibold text-slate-200 my-2">{t('experienceTitle', 'Experience')}</h3>
          {experiences.map((exp, idx) => (
            <div key={idx} className="border-b border-slate-800 pb-3 mb-3">
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={exp.company} onChange={(e) => { const newExp = [...experiences]; newExp[idx].company = e.target.value; setExperiences(newExp); }} placeholder={t('placeholders.company', 'Company')} />
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={exp.role} onChange={(e) => { const newExp = [...experiences]; newExp[idx].role = e.target.value; setExperiences(newExp); }} placeholder={t('placeholders.role', 'Role')} />
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={exp.duration} onChange={(e) => { const newExp = [...experiences]; newExp[idx].duration = e.target.value; setExperiences(newExp); }} placeholder={t('placeholders.duration', 'Duration')} />
              <textarea className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 resize-none" value={exp.details} onChange={(e) => { const newExp = [...experiences]; newExp[idx].details = e.target.value; setExperiences(newExp); }} placeholder={t('placeholders.details', 'Details')} rows="2" />
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-500 transition-all cursor-pointer" onClick={() => removeExperience(idx)}>{t('removeBtn', 'Remove')}</button>
            </div>
          ))}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all cursor-pointer my-1" onClick={addExperience}>{t('addExperienceBtn', '+ Add Experience')}</button>

          <h3 className="font-semibold text-slate-200 my-2">{t('educationTitle', 'Education')}</h3>
          {educations.map((edu, idx) => (
            <div key={idx} className="border-b border-slate-800 pb-3 mb-3">
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={edu.school} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].school = e.target.value; setEducations(newEdu); }} placeholder={t('placeholders.school', 'School')} />
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={edu.degree} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].degree = e.target.value; setEducations(newEdu); }} placeholder={t('placeholders.degree', 'Degree')} />
              <input className="w-full p-2.5 mb-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500" value={edu.year} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].year = e.target.value; setEducations(newEdu); }} placeholder={t('placeholders.year', 'Year')} />
              <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-500 transition-all cursor-pointer" onClick={() => removeEducation(idx)}>{t('removeBtn', 'Remove')}</button>
            </div>
          ))}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 transition-all cursor-pointer my-1" onClick={addEducation}>{t('addEducationBtn', '+ Add Education')}</button>

          <br /><br />
          <button className="w-full p-3 bg-emerald-600 text-white rounded-xl text-base font-bold hover:bg-emerald-500 transition-all cursor-pointer" onClick={() => window.print()}>
            🖨️ {t('downloadBtn', 'Download / Print PDF')}
          </button>
        </div>

        {/* PRINTABLE RESUME PREVIEW */}
        <div className="flex-1 min-w-[320px]">
          <div id="printable-resume" className="bg-white p-10 rounded-2xl shadow-xl border border-slate-200 min-h-[650px] text-slate-900">
            
            {/* Header Section */}
            <div className="mb-6">
              <h1 className="m-0 mb-2 text-slate-900 text-3xl font-bold">{personal.name || t('previewDefaultName', 'Your Name')}</h1>
              <h3 className="text-blue-600 m-0 mb-2 text-lg font-semibold">{personal.title || t('previewDefaultTitle', 'Job Title')}</h3>
              <p className="text-sm text-slate-500 m-0">{personal.email} | {personal.phone}</p>
              {personal.summary && <p className="text-sm text-slate-700 mt-3 leading-relaxed">{personal.summary}</p>}
            </div>

            <hr className="border-t-2 border-slate-200 my-6" />

            {/* Skills Section */}
            <div className="mb-8">
              <h3 className="text-slate-800 mb-3 uppercase text-base tracking-wider font-semibold">{t('skillsTitle', 'Skills')}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs border border-slate-200 flex items-center">
                    {skill} <b className="remove-btn text-red-500 ml-1.5 cursor-pointer" onClick={() => removeSkill(i)}>×</b>
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-8">
              <h3 className="text-slate-800 mb-4 uppercase text-base tracking-wider font-semibold">{t('previewExperienceTitle', 'Work Experience')}</h3>
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
              <h3 className="text-slate-800 mb-4 uppercase text-base tracking-wider font-semibold">{t('educationTitle', 'Education')}</h3>
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

      {/* Publisher Content Section */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
        <section>
          <h3 className="text-lg font-bold text-white mb-2">{t('aboutTitle', 'About the Online Resume Builder')}</h3>
          <p>
            {t('aboutText', 'Creating a professional, well-formatted resume is essential for job applications. This interactive online builder formats your personal details, work experience, education, and technical skills into a clean document ready to export or print as a PDF.')}
          </p>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('howToTitle', 'How to Build Your Resume')}</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
            <li>{t('step1', 'Fill in your full name, job title, email, phone number, and a brief professional summary.')}</li>
            <li>{t('step2', 'Add key technical or soft skills one by one using the input field.')}</li>
            <li>{t('step3', 'List your relevant work history, job roles, durations, and key responsibilities.')}</li>
            <li>{t('step4', 'Include your educational background, degrees, and graduation dates.')}</li>
            <li>
              {t('step5Prefix', 'Review the live preview on the right and click')} <strong className="text-slate-200">{t('downloadBtn', 'Download / Print PDF')}</strong> {t('step5Suffix', 'to export.')}
            </li>
          </ol>
        </section>

        <section>
          <h3 className="text-base font-semibold text-white mb-2">{t('faqTitle', 'Frequently Asked Questions')}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-slate-200">{t('faq1Q', 'Is my resume data saved on any external servers?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq1A', 'No, all inputs are processed locally in your browser memory for total privacy and data security.')}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-200">{t('faq2Q', 'How do I save my resume as a PDF file?')}</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {t('faq2A', 'Click the green print button, then choose "Save as PDF" from your browser print destination options.')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}