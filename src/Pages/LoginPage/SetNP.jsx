import React, {useState} from 'react'
import {handleNPChallenge} from '../../auth/authService.ts';
export const SetNP = () => {
  const [newPassword, setNewPassword] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    handleNPChallenge(newPassword);
  }
  return (
    <div>
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <input type='password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}
