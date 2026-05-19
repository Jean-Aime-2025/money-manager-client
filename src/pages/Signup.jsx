import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import { uploadProfileImage } from "../util/uploadProfileImage";

const Signup = () => {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        let profileImageUrl = "";
        setIsLoading(true);

        if (!fullName.trim()) {
            setError("Please enter your fullname");
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter your email address");
            setIsLoading(false);
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }

        setError("")

        try {
            if (profilePhoto) {
                const imageUrl = await uploadProfileImage(profilePhoto);
                profileImageUrl = imageUrl || "";
            }

            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });

            if (response.status === 201) {
                toast.success("Profile created successfaully!");
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8">

            <h3 className="text-2xl font-semibold text-center mb-2">
                Create an account
            </h3>

            <p className="text-sm text-center text-slate-600 mb-6">
                Start tracking your spendings by joining us.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="flex justify-center mb-4">
                    <ProfilePhotoSelector
                        image={profilePhoto}
                        setImage={setProfilePhoto}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        label="Fullname"
                        placeholder="John Doe"
                        type="text"
                    />

                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email address"
                        placeholder="example@gmail.com"
                        type="email"
                    />

                    <div className="col-span-2">
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            placeholder="********"
                        />
                    </div>
                </div>

                {error && (
                    <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
                        {error}
                    </p>
                )}

                <button
                    disabled={isLoading}
                    className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <LoaderCircle className="animate-spin w-5 h-5" />
                            Signing up...
                        </>
                    ) : (
                        "Sign up"
                    )}
                </button>

                <p className="text-sm text-center mt-8">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary underline">
                        Login
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default Signup;