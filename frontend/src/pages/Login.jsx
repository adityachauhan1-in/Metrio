import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Alert from "../components/ui/Alert";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, user, token, isAuthenticated, logout, isTokenValid } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const fromSignup = location.state?.fromSignup;
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
    });
    // Only clear expired tokens, don't redirect automatically
    // Allow users to access login page even when logged in (to switch accounts)
    useEffect(() => {
        if (token && !isTokenValid(token)) {
            // Token expired, clear it
            logout();
        }
    }, [token, isTokenValid, logout]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
    const handleLogin = async (e) => {
        e?.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await login(email, password);

            if (result.success && result.user) {
                // Redirect based on user role after successful login
                const userRole = result.user.role;
                if (userRole === "admin") {
                    navigate("/admin", { replace: true });
                } else {
                    navigate("/user", { replace: true });
                }
            } else {
                setError(result.error || "Login failed. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
        
 
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1 className="auth-title">Log in</h1>
                <p className="auth-subtitle">
                    {fromSignup ? "Account created. Sign in to continue." : "Sign in to MetroFlow — book metro tickets in seconds"}
                </p>

                {error && (
                    <Alert variant="error" onDismiss={() => setError("")}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleLogin} className="auth-form">
                   <label htmlFor="login-email" className="auth-label">Email</label>
                    <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                        className="auth-input"
                        autoComplete="email"
                    />
                     
                    <label htmlFor="login-password" className="auth-label">Password</label>
<div className="relative">
    <input
        id="login-password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="••••••••"
        className="auth-input"
        autoComplete="current-password"
    />
    <span
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-indigo-600 transition"
        onClick={() => setShowPassword((prev) => !prev)}
    >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </span>
</div>
                 <button type="submit" disabled={loading} className="auth-button">
                        {loading && <span className="loading-spinner" />}
                        {loading ? "Signing in…" : "Log in"}
                    </button>
                </form>

           

                <p className="auth-footer">
                    Don't have an account?{" "}
                    <Link to="/signup" className="auth-link">Sign up</Link>
                </p>
            </div>
        </div>
    );
}