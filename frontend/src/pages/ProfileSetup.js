import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSetup.css';

const countries = ['Bosnia and Herzegovina', 'Croatia', 'Serbia', 'Slovenia', 'Montenegro', 'Macedonia', 'Kosovo'];
const industries = ['Technology', 'Manufacturing', 'Healthcare', 'Education', 'Retail', 'Finance', 'Construction', 'Tourism'];

const ProfileSetup = ({ onProfileComplete }) => {
  const [companyName, setCompanyName] = useState('');
  const [country, setCountry] = useState('');
  const [employees, setEmployees] = useState('');
  const [industry, setIndustry] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile data (for example, through an API call)
    onProfileComplete(); // Update onboarding step
    navigate('/module-selection'); // Move to module selection step
  };

  return (
    <div className="profile-setup-container">
      <form className="profile-setup-form" onSubmit={handleSubmit}>
        <h1>Set Up Your Profile</h1>

        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="employees">Number of Employees</label>
          <input
            type="number"
            id="employees"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Industry</label>
          <select
            id="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          >
            <option value="">Select Industry</option>
            {industries.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">Next</button>
      </form>
    </div>
  );
};

export default ProfileSetup;
