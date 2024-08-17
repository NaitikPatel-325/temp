import React, { useState } from 'react';
import { Expanse } from './Components/Expanse';
import { ExpanseHistory } from './Components/ExpanseHistory';
import { useParams } from 'react-router-dom';

export const Expanses = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('create');

  const handleTabClick = (tab) => {
    setActiveTab(tab); 
  };

  return (
    <div className="flex-1 max-w-screen-md w-full mx-auto mb-2 flex flex-col gap-6">
      <div className="flex space-x-4 justify-center mt-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'create' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          } transition duration-300`}
          onClick={() => handleTabClick('create')}
        >
          Create Expense
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'history' ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          } transition duration-300`}
          onClick={() => handleTabClick('history')}
        >
          Expense History
        </button>
      </div>
      
      <div className="tab-content mt-4">
        {activeTab === 'create' && <Expanse id={id}/>}
        {activeTab === 'history' && <ExpanseHistory id={id} />}
      </div>
    </div>
  );
};
