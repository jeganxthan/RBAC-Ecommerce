import { useState, useContext } from 'react'
import Input from '../Inputs/Input'
import ProfilePhoto from '../Inputs/ProfilePhoto'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apipaths'
import { UserContext } from '../../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import uploadImages from '../../utils/uploadImages'
const Signup = ({ setCurrentPage }) => {
    const [profilePic, setProfilePic] = useState(null);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [adminInviteToken, setAdminInviteToken] = useState("")
    const [isSeller, setIsSeller] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        let profileImageUrl = "";
        if (!validateEmail(email)) {
            setError("Please enter the valid email");
            setLoading(false);
            return;
        } if (!password) {
            setError("Please enter the valid password");
            setLoading(false);
            return;
        } if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            setLoading(false);
            return;
        }
        setError("");
        try {
            if (profilePic) {
                console.log("Uploading image...");
                const imgUploadsRes = await uploadImages(profilePic);
                console.log("Image uploaded: ", imgUploadsRes);
                profileImageUrl = imgUploadsRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                name,
                email,
                password,
                profileImageUrl,
                adminInviteToken,
                isSeller
            })
            const { token, role } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                updateUser(response.data);
                if (role === "admin") {
                    navigate("/admin/dashboard");
                } else if (role === "seller") {
                    navigate("/seller/dashboard");
                } else {
                    navigate("/users/")
                }
            }
        } catch (error) {
            if (error.response && error.response.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong");
            }
            setLoading(false);
        }
    }

    return (
        <div>
            <form className='flex justify-center flex-col items-center md:gap-y-4 md:ml-0 ml-[-220px] lg:gap-y-10 xl1:4xl xl1:ml-[-100px] ml:ml-[-280px]' onSubmit={handleSignUp}>
                <ProfilePhoto image={profilePic} setImage={setProfilePic} />
                <div className='flex md:flex-row md:gap-x-4 flex-col'>
                    <Input label="Name" placeholder="eg. John Doe" value={name} onChange={({ target }) => setName(target.value)} type="text" />
                    <Input label="Email Address" placeholder="eg.john@gmail.com" value={email} onChange={({ target }) => setEmail(target.value)} type="text" />
                </div>
                <div className='flex md:flex-row md:gap-x-4 flex-col'>
                    <Input label="Password" placeholder="Min 8 Characters" value={password} onChange={({ target }) => setPassword(target.value)} type="password" />
                    <Input label="Admin Token" placeholder="Only for Admin" value={adminInviteToken} onChange={({ target }) => setAdminInviteToken(target.value)} type="text" />
                </div>
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isSeller}
                        onChange={(e) => setIsSeller(e.target.checked)}
                    />

                    Want a Seller Account
                </label>
                {error && <p className='text-red-500 text-sm'>{error}</p>}

                <button
  className='bg-[#1947a8] w-full p-2 hover:bg-[#638ee8] text-white disabled:opacity-50'
  type='submit'
  disabled={loading}
>
  {loading ? "Signing up..." : "SignUp"}
</button>

                <p>Already have an account{" "}
                    <button className='text-violet-950 underline' onClick={() => setCurrentPage('login')} type='button'>
                        Login
                    </button>
                </p>
            </form>
        </div>
    )
}

export default Signup
