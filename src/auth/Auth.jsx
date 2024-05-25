import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom'
import { setToken } from '../redux/Slice';

function Auth() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const reduxToken = useSelector((state) => state.auth.token);
    useEffect(()=> {
        const keepTokenRedux = () => {
            if(!reduxToken){
                dispatch(setToken(token))
            }
        }
        keepTokenRedux();
    },[reduxToken, dispatch, token])

    useEffect(()=> {
        const checkAuthorized = () => {
            if(!reduxToken){
                // navigate('/login')
            }
        }
        checkAuthorized();
    },[reduxToken, navigate])
  return (
    <>
    <Outlet/>
    </>
  )
}

export default Auth