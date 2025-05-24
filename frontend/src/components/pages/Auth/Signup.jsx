import React, { useContext, useState } from 'react'
import Input from '../../Inputs/Input'
import { validateEmail } from '../../../utils/validateEmail'
import ProfilePhoto from '../../Inputs/ProfilePhoto'
import axiosInstance from '../../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { API_PATHS } from '../../../utils/apiPaths'
import uploadImages from '../../../utils/uploadImage'
const SignUp = ({ setCurrentPage }) => {
    const [profilePic, setProfilePic] = useState(null)
    const [fullName, setFullName] = useState(null)
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("")
    const [adminInviteToken, setAdminInviteToken] = useState("")
    const [error, setError] = useState(null)
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        let profileImageUrl = "";
        if (!fullName) {
            setError("Please enter full name");
            setLoading(false);
            return;
        }
        if (!validateEmail(email)) {
            setError("Please Enter a valid email");
            setLoading(false);
            return;
        }
        if (!password) {
            setError("Please enter the password")
            setLoading(false);
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            setLoading(false);
            return;
        }

        try {
            if (profilePic) {
                console.log("Uploading image...");
                const imgUploadsRes = await uploadImages(profilePic);
                console.log("Image uploaded: ", imgUploadsRes);
                profileImageUrl = imgUploadsRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name: fullName,
                email,
                password,
                profileImageUrl,
                adminInviteToken
            })
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
            } else if (error.message) {
                setError(error.message);
            } else {
                setError("Something went wrong, please try again.");
            }
            setLoading(false);
        }
    }
    return (
        <div>
            <h1 className='text-2xl text-center mb-4'>Welcome</h1>
            <form onSubmit={handleSignUp}>
                <ProfilePhoto image={profilePic} setImage={setProfilePic} />
                <div className='space-y-2'>
                    <Input
                        value={fullName}
                        onChange={({ target }) => setFullName(target.value)}
                        label="Full Name"
                        placeholder="john"
                        type="text"
                    />
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="john@gmail.com"
                        type="email"
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Min 8 Character"
                        type="password"
                    />
                    <Input
                        value={adminInviteToken}
                        onChange={({ target }) => setAdminInviteToken(target.value)}
                        label="Admin Token"
                        placeholder="Admin token"
                        type="text"
                    />
                </div>
                {error && <p className='text-red-500 text-sm'>{error}</p>}
                <button className="p-2 rounded-lg border-2 border-black hover:bg-white hover:text-black w-full mt-4 text-white bg-black mb-2" type='submit' disabled={loading}>
                    SIGN UP
                </button>
                <p>Already have an account?{" "}
                    <button className='text-violet-950 underline' onClick={() => setCurrentPage('login')}>
                        Login
                    </button>
                </p>
            </form>
        </div>
    )
}

export default SignUp