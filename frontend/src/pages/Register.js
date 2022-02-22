import React, { useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { register, reset } from "../features/Auth/AuthSlice";
import Spinner from '../components/Spinner';

const Register = () => {
  const [formState, setFormState] = useState({
    name:"",
    email: "",
    password: "",
    repeatPassword: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError){
      toast.error(message);
    }

    if(user && isSuccess){
      toast.success('You successfully register your account');
      navigate('/');
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const submitData = (e) => {
    e.preventDefault();

    if(!formState.password || !formState.repeatPassword || formState.password !== formState.repeatPassword){
      toast.error('Both passwords do not match!')
    }else{
      const userData = {
        name: formState.name,
        email: formState.email,
        password: formState.password
      }
      dispatch(register(userData));
      //dispatch(reset());
    }
    
  }

  if(isLoading) return <Spinner />
  
  return (
    <div>
      <section className="heading">
        <FaUserAlt /> Register
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form className="form-group" onSubmit={(e) => submitData(e)}>
          <input placeholder="Enter your name" type="text" value={formState.name} onChange={(e) => setFormState(prev => ({...prev, name: e.target.value}))}/>
          <input placeholder="Enter your email" type="email" value={formState.email} onChange={(e) => setFormState(prev => ({...prev, email: e.target.value}))}/>
          <input placeholder="Enter your password" type="password" value={formState.password} onChange={(e) => setFormState(prev => ({...prev, password: e.target.value}))}/>
          <input placeholder="Repeat your password" type="password" value={formState.repeatPassword} onChange={(e) => setFormState(prev => ({...prev, repeatPassword: e.target.value}))}/>
          <button className="btn btn-block">Submit</button>
        </form>
      </section>
    </div>
  );
};

export default Register;
