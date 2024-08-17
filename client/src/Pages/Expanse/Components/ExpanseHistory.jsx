import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const ExpanseHistory = () => {
  const { id } = useParams();
  const [expenses, setExpenses] = useState([]);
  const [expensesPerUser, setexpensesPerUser] = useState([]);
  const jwt = sessionStorage.getItem('jwt');


  useEffect(()=>{
    const fetchExpensesPerUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/group/expanses/GetPerUser/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Expenses:', response.data);
        setexpensesPerUser(response.data);
      }
      catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpensesPerUser();
  },[id,jwt,expenses])
  
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/group/expanses/GetAllExpenses/${id}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        console.log('Expenses:', response.data);
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    fetchExpenses();
  }, [id,jwt]);

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:8080/group/expanses/DeleteExpense/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setExpenses(expenses.filter(expense => expense.id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className='flex flex-col '>
       <div className='bg-zinc-900 text-white'>
        {Object.entries(expensesPerUser).map(([username, amount]) => (
          <p key={username}>{username}: {amount.toFixed(2)}</p>
        ))}
      </div>

      <div>
        <h2 className="text-2xl text-white text-center font-bold mb-4">Expense History</h2>
        <table className="w-full border-collapse border border-gray-400">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Paid By</th>
              <th className="px-4 py-2">Contributors</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {expenses.map(expense => (
              <tr key={expense.id} className="border-t border-gray-400">
                <td className="px-4 py-2 text-white">{expense.description}</td>
                <td className="px-4 py-2 text-white">{expense.amount}</td>
                <td className="px-4 py-2 text-white">{expense.date}</td>
                <td className="px-4 py-2 text-white">{expense.paidBy}</td>
                <td className="px-4 py-2 text-white">
                  <ul>
                    {expense.countributors.map(contributor => (
                      <li key={contributor.id}>{contributor.username}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDeleteExpense(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
