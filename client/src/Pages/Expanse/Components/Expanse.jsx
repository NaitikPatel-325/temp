import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Expanse = () => {
  const { id } = useParams();
  const [expanseName, setExpanseName] = useState('');
  const [totalExpenses, setTotalExpenses] = useState('');
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const jwt = sessionStorage.getItem('jwt');

  useEffect(() => {
    axios.get(`http://localhost:8080/group/member?id=${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    .then(response => {
      console.log('Group details:', response.data[0].id);
      setUsers(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [id, jwt]);

  const handleCheckboxChange = (userId) => {
    setSelectedUsers(prevSelected => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter(id => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleSubmit = () => {
    if(!expanseName || !totalExpenses || !date || selectedUsers.length === 0) {
      toast.warning('Please fill in all the fields and select at least one user.');
    }
    else{
      console.log('Expanse Name:', expanseName, 'Total Expenses:', totalExpenses, 'Date:', date, 'Selected Users:', selectedUsers , id);
      axios.post('http://localhost:8080/group/expanses', {
        id: id,
        description: expanseName,
        amount:totalExpenses,
        date:date,
        users:selectedUsers
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(response => {
        toast.success('Expanse created successfully!');
        console.log('Expanse created:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <div className="text-white m-8">
      <div className="max-w-lg mx-auto px-4 py-6 m-8 bg-zinc-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Expenses Information</h1>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium">Expense Name</label>
            <input
              type="text"
              className="input-text w-full bg-black text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={expanseName}
              onChange={(e) => setExpanseName(e.target.value)}
              placeholder="Enter an Expense Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="text"
              className="input-text w-full bg-black text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={totalExpenses}
              onChange={(e) => setTotalExpenses(e.target.value)}
              placeholder="Enter the Amount"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium">Date</label>
            <DatePicker
              className="input-text w-full bg-black text-white border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              selected={date}
              onChange={setDate}
              placeholderText="Select a Date"
            />
          </div>
        </div>
       
      </div>
      <div className="max-w-lg mx-auto px-4 py-6 bg-zinc-800 rounded-lg shadow-md">
           <h1 className="text-2xl font-semibold mb-4">Paid For</h1>
           <form>
             {users.map(user => (
               <div key={user.id} className="flex items-center">
                 <input 
                   type="checkbox" 
                   id={user.id} 
                   checked={selectedUsers.includes(user.id)} 
                   onChange={() => handleCheckboxChange(user.id)} 
                   className="mr-2"
                 />
                 <label htmlFor={user.id}>{user.username}</label>
               </div>
             ))}
           </form>
      </div>

      <div className="flex mt-4 max-w-lg mx-auto px-4 py-6 bg-zinc-800 rounded-lg shadow-md">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={handleSubmit}
        >
          Create Expense
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ml-4"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};
