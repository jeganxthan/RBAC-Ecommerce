import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../Inputs/Input'
import { validateEmail } from '../../../utils/validateEmail'
import axiosInstance from '../../../utils/axiosInstance'
import { API_PATHS } from '../../../utils/apiPaths'
import { UserContext } from '../../../context/UserContext';
const Login = ({ setCurrentPage }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Please Enter a valid email");
            return;
        }
        if (!password) {
            setError("Please enter the password")
            return;
        }
        setError("");
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            });
            const { token, role } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                if(role === "admin"){
                    navigate("/admin/dashboard");
                }else{
                    navigate("/user/dashboard")
                }
            } 
            updateUser(response.data);
        } catch (error) {
            if (error.response && error.response.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong, please try again.");
            }
        }

    }
    return (
        <div>
            <form onSubmit={handleLogin}>
                <h1 className='text-2xl text-center mb-4'>Welcome</h1>
                <div className='space-y-5'>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="john@gmail.com"
                        type="text"
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Min 8 Character"
                        type="password"
                    />
                </div>
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <button className="p-2 rounded-lg border-2 border-black hover:bg-white hover:text-black w-full mt-4 text-white bg-black mb-2">
                    LOGIN
                </button>
                <p>Don't have an account?{" "}
                    <button className='text-violet-950 underline' onClick={() => setCurrentPage('signup')}>
                        SignUp
                    </button>
                </p>
            </form>
        </div>
    )
}

export default Login