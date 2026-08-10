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
    <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'left' }}>
      <style>{`
        @page {
          margin: 0; /* Removes browser header/footer (localhost, date, title) */
        }
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-resume, #printable-resume * {
            visibility: visible !important;
          }
          #printable-resume {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            min-height: 100vh !important;
            margin: 0 !important;
            padding: 40px !important;
            box-shadow: none !important;
            border: none !important;
            box-sizing: border-box !important;
          }
          .remove-btn {
            display: none !important;
          }
        }
      `}</style>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* FORM CONTROLS */}
        <div style={{ flex: '1', minWidth: '320px', background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1e293b', marginTop: 0 }}>📄 Resume Builder</h2>
          <p style={{ color: '#64748b' }}>Fill out your details to generate your resume instantly.</p>
          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '15px 0' }} />

          <h3>Personal Information</h3>
          <input style={inputStyle} value={personal.name} onChange={(e) => setPersonal({ ...personal, name: e.target.value })} placeholder="Full Name" />
          <input style={inputStyle} value={personal.title} onChange={(e) => setPersonal({ ...personal, title: e.target.value })} placeholder="Job Title" />
          <input style={inputStyle} value={personal.email} onChange={(e) => setPersonal({ ...personal, email: e.target.value })} placeholder="Email" />
          <input style={inputStyle} value={personal.phone} onChange={(e) => setPersonal({ ...personal, phone: e.target.value })} placeholder="Phone" />
          <textarea style={inputStyle} value={personal.summary} onChange={(e) => setPersonal({ ...personal, summary: e.target.value })} placeholder="Summary" rows="3" />

          <h3>Skills</h3>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
            <input style={{ ...inputStyle, marginBottom: 0 }} value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Add a skill" />
            <button style={btnStyle} onClick={addSkill}>Add</button>
          </div>

          <h3>Experience</h3>
          {experiences.map((exp, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '10px' }}>
              <input style={inputStyle} value={exp.company} onChange={(e) => { const newExp = [...experiences]; newExp[idx].company = e.target.value; setExperiences(newExp); }} placeholder="Company" />
              <input style={inputStyle} value={exp.role} onChange={(e) => { const newExp = [...experiences]; newExp[idx].role = e.target.value; setExperiences(newExp); }} placeholder="Role" />
              <input style={inputStyle} value={exp.duration} onChange={(e) => { const newExp = [...experiences]; newExp[idx].duration = e.target.value; setExperiences(newExp); }} placeholder="Duration" />
              <textarea style={inputStyle} value={exp.details} onChange={(e) => { const newExp = [...experiences]; newExp[idx].details = e.target.value; setExperiences(newExp); }} placeholder="Details" />
              <button style={{ ...btnStyle, background: '#ef4444' }} onClick={() => removeExperience(idx)}>Remove</button>
            </div>
          ))}
          <button style={btnStyle} onClick={addExperience}>+ Add Experience</button>

          <h3>Education</h3>
          {educations.map((edu, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '10px' }}>
              <input style={inputStyle} value={edu.school} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].school = e.target.value; setEducations(newEdu); }} placeholder="School" />
              <input style={inputStyle} value={edu.degree} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].degree = e.target.value; setEducations(newEdu); }} placeholder="Degree" />
              <input style={inputStyle} value={edu.year} onChange={(e) => { const newEdu = [...educations]; newEdu[idx].year = e.target.value; setEducations(newEdu); }} placeholder="Year" />
              <button style={{ ...btnStyle, background: '#ef4444' }} onClick={() => removeEducation(idx)}>Remove</button>
            </div>
          ))}
          <button style={btnStyle} onClick={addEducation}>+ Add Education</button>

          <br /><br />
          <button style={{ ...btnStyle, background: '#10b981', width: '100%', padding: '12px', fontSize: '16px', fontWeight: 'bold' }} onClick={() => window.print()}>
            🖨️ Download / Print PDF
          </button>
        </div>

        {/* PRINTABLE RESUME PREVIEW */}
        <div style={{ flex: '1', minWidth: '320px' }}>
          <div id="printable-resume" style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', minHeight: '650px' }}>
            
            {/* Header Section */}
            <div style={{ marginBottom: '25px' }}>
              <h1 style={{ margin: '0 0 8px 0', color: '#0f172a', fontSize: '32px' }}>{personal.name || 'Your Name'}</h1>
              <h3 style={{ color: '#007bff', margin: '0 0 8px 0', fontSize: '18px' }}>{personal.title || 'Job Title'}</h3>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0' }}>{personal.email} | {personal.phone}</p>
              {personal.summary && <p style={{ fontSize: '14px', color: '#334155', marginTop: '12px', lineHeight: '1.6' }}>{personal.summary}</p>}
            </div>

            <hr style={{ border: 'none', borderTop: '2px solid #e2e8f0', margin: '25px 0' }} />

            {/* Skills Section */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '12px', textTransform: 'uppercase', fontSize: '16px', letterSpacing: '1px' }}>Skills</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((skill, i) => (
                  <span key={i} style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '4px', fontSize: '13px', border: '1px solid #e2e8f0' }}>
                    {skill} <b className="remove-btn" style={{ cursor: 'pointer', color: 'red', marginLeft: '6px' }} onClick={() => removeSkill(i)}>×</b>
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '15px', textTransform: 'uppercase', fontSize: '16px', letterSpacing: '1px' }}>Work Experience</h3>
              {experiences.map((exp, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '15px', color: '#0f172a' }}>{exp.role}</strong>
                    <small style={{ color: '#64748b', fontWeight: 'bold' }}>{exp.duration}</small>
                  </div>
                  <div style={{ color: '#007bff', fontSize: '14px', marginBottom: '6px' }}>{exp.company}</div>
                  <p style={{ fontSize: '14px', margin: '0', color: '#334155', lineHeight: '1.5' }}>{exp.details}</p>
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#1e293b', marginBottom: '15px', textTransform: 'uppercase', fontSize: '16px', letterSpacing: '1px' }}>Education</h3>
              {educations.map((edu, i) => (
                <div key={i} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '15px', color: '#0f172a' }}>{edu.degree}</strong>
                    <small style={{ color: '#64748b', fontWeight: 'bold' }}>{edu.year}</small>
                  </div>
                  <div style={{ color: '#475569', fontSize: '14px' }}>{edu.school}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' };
const btnStyle = { padding: '8px 12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', margin: '4px 0' };