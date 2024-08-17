import React, { useState,useContext } from 'react';
import axios from 'axios'; 
import  UserContext  from '../../../context/create';
import { toast,ToastContainer } from 'react-toastify';


export const Group = () => {

  const{
    isloggedin,
    jwt
  } = useContext(UserContext);

  const [participants, setParticipants] = useState(['']); 
  const[checkindex, setCheckIndex] = useState(1);
  const [groupName, setGroupName] = useState('');
  const [currency, setCurrency] = useState('');
  const [existingUsers, setExistingUsers] = useState([]); 

  const addParticipantInput = () => {

    if(jwt === ''){
      toast.error('Please login to add participants');
    }
    else{
      setParticipants([...participants, '']);
    }
  };

  const handleParticipantChange = async (index, value) => {
    console.log('Participant change:', index, value);
    const newParticipants = [...participants];
    newParticipants[index] = value;
    if (index === checkindex) {
      setCheckIndex(checkindex + 1);
      const userExists = await checkUserExistence(participants[checkindex - 1]);
      console.log('User exists:', userExists);
    }
    setParticipants(newParticipants);
  };
  

  const deleteParticipant = (index) => {
    const newParticipants = [...participants];
    newParticipants.splice(index, 1);
    setParticipants(newParticipants);
    setCheckIndex(checkindex - 1);
  };

  const handleCreateGroup = async () => {
    if (jwt !== '') {
      console.log('Creating group:', groupName, currency, participants, jwt);
      if(!groupName || !currency || !participants ){
        toast.warning('Please fill in all the fields.');
      }
      else{
        axios.post('http://localhost:8080/group/add', {
          groupName: groupName,
          currency: currency,
          participants: participants
        }, {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        }).then(response => {
          console.log('Group created:', response);
          window.location.href = '/dashboard';
        }).catch(error => {
          console.error('Error creating group:', error);
          return false;
        });
      }
     } else {
      toast.error('Please login to add participants');
    }

  }
  
  const handleCancel = () => {
    window.location.href = '/dashboard';
  };

  const checkUserExistence = async (username) => {
    if(isloggedin === false){
      alert('Please login');
      return false;
    }else{
      axios.get(`http://localhost:8080/user/check/${username}`)
      .then(response => {
        // console.log('User exists:', response);

        if(response.data[0]){
          setExistingUsers([...existingUsers, username]);
        }
        else{
          alert('User does not exist');
        }
      })
      .catch(error => {
        console.error('Error checking user existence:', error);
        return false;
      });
    }
  };

  return (
    <div className="flex-1  max-w-screen-md w-full mx-auto mb-2  flex flex-col gap-6 ">
      <div className='flex  flex-col justify-start mt-4 bg-zinc-800 px-4 py-6'>
        <div>
          <h1 className='text-white text-2xl'>Group Information</h1>
        </div>
        <div className='mt-10'>
          <div className='flex flex-row justify-between'>
            <div className='flex flex-col w-full '>
              <p className='text-white m-2'>Group Name</p>
              <label className="input m-2 text-white input-bordered flex items-center gap-2">
                <input type="text" className="grow h-10 rounded-lg bg-zinc-950 p-4  "  onChange={(e)=>{setGroupName(e.target.value)}} placeholder="Summer Vacations"/>
              </label>
              <p className='text-white m-2'>Enter A Name For A Group</p>
            </div>

            <div  className='flex flex-col w-full '>
              <p className='text-white m-2' >Currency Symbol</p>
              <label className="input input-bordered text-white flex items-center gap-2">
                <input type="text" onChange={(e)=>{setCurrency(e.target.value)}} className="m-2 grow h-10 rounded-lg bg-zinc-950 w-full p-4" placeholder="$ INR" />
              </label>
              <p className='m-2  text-white'>We Will Use It To Display It</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex  flex-col justify-start mt-4 bg-zinc-800 px-4 py-6'>
        <div>
          <h1 className='text-white text-2xl'>Participants</h1>
        </div>
        <div className='mt-10'>
          {participants.map((participant, index) => (
            <div key={index} className="flex items-center  text-white">
              <input
                type="text"
                value={participant}
                onChange={(e) => handleParticipantChange(index, e.target.value)}
                placeholder="Participant Name"
                className="m-2 grow h-10 rounded-lg bg-zinc-950 p-4"
              />
              <button onClick={() => deleteParticipant(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          ))}
          <button onClick={addParticipantInput} className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Add Participant
          </button>
        </div>
        <div>
          <button onClick={handleCreateGroup} className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create
          </button>
          <button onClick={handleCancel} className="m-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
          <ToastContainer position='top-center'/>
    </div>
  );
};
