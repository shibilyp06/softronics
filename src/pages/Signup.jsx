import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/Slice";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegexPassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    const checkPassword = passwordRegex.test(password);
    if(!checkPassword){
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 8 characters long.')
      return;
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    if(!fullName || !email || !password){
      setError('please all the fields');
      return
    }
    const checkConfirmPassword = password  === confirmPassword;
    if(!checkConfirmPassword){
       setError('password does not match')
       return
    }else{
      try {
        setError('')
        const formData = {
          fullName,
          email,
          password
        }
        const response = await axios.post('http://localhost:3000/signup', formData);
        if(response.status == 200){
          setError('');
          setMessage(response.data.message);
          navigate('/addaccount')       
          const token = response.data.token
          localStorage.setItem('token', token)
          dispatch(setToken(token))
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          setError(error.response.data.error);
        } else {
          setError('An error occurred during signup');
        }
      }
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          Create Your Bank Account
        </h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onBlur={()=>{handleRegexPassword(password)}}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />

            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
             <p className={`text-center ${error? 'text-red-500' : 'text-green-500'}`}>{error || message}</p>
            <button
              type="button"
              onClick={handleSignup}
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Sign Up</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <Link to={"/login"}>
                <div className="text-center sm:text-left whitespace-nowrap">
                  <span className="inline-block ml-1">
                    Already have an account?{" "}
                    <button className="text-blue-600">Log in</button>{" "}
                  </span>
                </div>
              </Link>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
