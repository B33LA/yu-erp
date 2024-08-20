import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ModuleSelection.css';

const modules = ['CRM', 'Accounting', 'Inventory', 'Sales', 'HR', 'Marketing'];

const ModuleSelection = () => {
  const [selectedModules, setSelectedModules] = useState([]);
  const navigate = useNavigate();

  const handleModuleChange = (module) => {
    if (selectedModules.includes(module)) {
      setSelectedModules(selectedModules.filter((m) => m !== module));
    } else {
      setSelectedModules([...selectedModules, module]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save selected modules (for example, through an API call)
    navigate('/main');
  };

  return (
    <div className="module-selection-container">
      <h1>Select Your Modules</h1>
      <form onSubmit={handleSubmit}>
        {modules.map((module) => (
          <div key={module}>
            <label>
              <input
                type="checkbox"
                value={module}
                checked={selectedModules.includes(module)}
                onChange={() => handleModuleChange(module)}
              />
              {module}
            </label>
          </div>
        ))}
        <button type="submit" className="submit-btn">Finish Setup</button>
      </form>
    </div>
  );
};

export default ModuleSelection;
