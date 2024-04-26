import React from 'react'
import {useNavigate} from 'react-router-dom'
export const SignOut = () => {
    const navigate = useNavigate();
    const signOut = () => {
        sessionStorage.removeItem('accessToken');
        navigate('/');
    }

  return (
    <button onClick={signOut}>SignOut</button>
  )
}
