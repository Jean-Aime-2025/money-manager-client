import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { toast } from "sonner";
import { validateEmail } from "../util/validation";
import { LoaderCircle } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(AppContext)

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

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

        setError("");

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password
            });

            const { token, user } = response.data;

            if (token) {
                const expiry = Date.now() + 24 * 60 * 60 * 1000; 
                localStorage.setItem("token", token);
                localStorage.setItem("tokenExpiry", expiry);
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
                toast.success("Logged in successfully!");
                navigate('/dashboard');
            }

        } catch (err) {
            e.preventDefault();
            console.error("Something went wrong", err);
            setError(err.response?.data?.message || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img
                src={assets.auth_bg}
                alt="bg_image"
                className="absolute inset-0 w-full h-full object-cover filter blur-sm"
            />
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome Back
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Please enter your details to log in.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email address"
                            placeholder="example@gmail.com"
                            type="email"
                        />
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="********"
                            type="password"
                        />
                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}
                        <button
                            disabled={isLoading}
                            className={`btn-primary w-full py-3 text-lg font-medium flex items-center justify-center gap-2 ${isLoading ? "opacity-60 cursor-not-allowed" : ""
                                }`}
                            type="submit"
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5" />
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-4">
                            Don't have an account?
                            <Link
                                to="/signup"
                                className="pl-1 font-medium text-primary underline hover:text-primary-dark transition-colors"
                            >
                                Signup
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
