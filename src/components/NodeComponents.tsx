import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Check, Users, AppWindow, Plus, X, Search } from 'lucide-react';

type AutomationStatus = 'none' | 'partial' | 'full';

const automationColors = {
  none: 'text-gray-400 hover:text-gray-600',
  partial: 'text-blue-500 hover:text-blue-600',
  full: 'text-green-500 hover:text-green-600',
};

export const PeopleAssigned = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [people, setPeople] = useState(['Bob', 'Sue']);
  const [newPerson, setNewPerson] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const addPerson = useCallback(() => {
    if (newPerson.trim()) {
      setPeople(prev => [...prev, newPerson.trim()]);
      setNewPerson('');
    }
  }, [newPerson]);

  const removePerson = useCallback((personToRemove: string) => {
    setPeople(prev => prev.filter(person => person !== personToRemove));
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addPerson();
    }
  }, [addPerson]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-gray-600 hover:text-gray-800"
      >
        <Users size={14} />
        <span className="ml-1 text-xs">{people.length}</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 p-2 z-10 min-w-[180px]">
          <div className="text-xs font-semibold mb-2">Assigned People:</div>
          
          <div className="space-y-1 mb-2">
            {people.map((person) => (
              <div key={person} className="flex items-center justify-between text-xs py-1 px-1 hover:bg-gray-50 rounded">
                <span>{person}</span>
                <button
                  onClick={() => removePerson(person)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100">
            <input
              type="text"
              value={newPerson}
              onChange={(e) => setNewPerson(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add person..."
              className="flex-1 text-xs p-1 border border-gray-200 rounded"
            />
            <button
              onClick={addPerson}
              disabled={!newPerson.trim()}
              className="p-1 text-gray-600 hover:text-blue-500 disabled:text-gray-300"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const AutomationIndicator = () => {
  const [status, setStatus] = useState<AutomationStatus>('none');

  const toggleStatus = useCallback(() => {
    const states: AutomationStatus[] = ['none', 'partial', 'full'];
    const currentIndex = states.indexOf(status);
    const nextIndex = (currentIndex + 1) % states.length;
    setStatus(states[nextIndex]);
  }, [status]);

  return (
    <button
      onClick={toggleStatus}
      className={`transition-colors ${automationColors[status]}`}
      title={`Automation Status: ${status}`}
    >
      <Check size={14} />
    </button>
  );
};

export const ApplicationsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultApps] = useState(['Slack', 'Jira', 'GitHub', 'Gmail', 'Salesforce', 'Notion', 'Trello', 'Asana']);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [customApp, setCustomApp] = useState('');
  const [availableApps, setAvailableApps] = useState(defaultApps);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredApps = availableApps.filter(app => 
    app.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addCustomApp = useCallback(() => {
    if (customApp.trim() && !availableApps.includes(customApp.trim())) {
      setAvailableApps(prev => [...prev, customApp.trim()]);
      setSelectedApps(prev => [...prev, customApp.trim()]);
      setCustomApp('');
      setSearchTerm('');
    }
  }, [customApp, availableApps]);

  const toggleApp = useCallback((app: string) => {
    setSelectedApps(prev => 
      prev.includes(app) 
        ? prev.filter(a => a !== app)
        : [...prev, app]
    );
  }, []);

  const removeApp = useCallback((app: string) => {
    setSelectedApps(prev => prev.filter(a => a !== app));
  }, []);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customApp.trim()) {
      addCustomApp();
    }
  }, [addCustomApp, customApp]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
      >
        <AppWindow size={14} />
        <span className="text-xs">{selectedApps.length || 'Apps'}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-white rounded-md shadow-lg border border-gray-200 p-2 z-10 min-w-[200px]">
          {selectedApps.length > 0 && (
            <>
              <div className="text-xs font-semibold mb-1">Selected Apps:</div>
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedApps.map((app) => (
                  <div
                    key={app}
                    className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1"
                  >
                    <span className="text-xs">{app}</span>
                    <button
                      onClick={() => removeApp(app)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 my-2"></div>
            </>
          )}

          <div className="relative mb-2">
            <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search apps..."
              className="w-full text-xs pl-7 pr-2 py-1 border border-gray-200 rounded"
            />
          </div>

          <div className="max-h-32 overflow-y-auto mb-2">
            {filteredApps.map((app) => (
              <label key={app} className="flex items-center gap-1 py-1 px-1 hover:bg-gray-50 rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedApps.includes(app)}
                  onChange={() => toggleApp(app)}
                  className="rounded text-blue-500"
                />
                <span className="text-xs">{app}</span>
              </label>
            ))}
            {searchTerm && !filteredApps.length && (
              <div className="text-xs text-gray-500 py-1">No matching apps found</div>
            )}
          </div>

          <div className="flex items-center gap-1 pt-2 border-t border-gray-100">
            <input
              type="text"
              value={customApp}
              onChange={(e) => setCustomApp(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add new app..."
              className="flex-1 text-xs p-1 border border-gray-200 rounded"
            />
            <button
              onClick={addCustomApp}
              disabled={!customApp.trim()}
              className="p-1 text-gray-600 hover:text-blue-500 disabled:text-gray-300"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};