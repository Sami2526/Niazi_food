import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    containerRef.current?.animate(
      [
        { opacity: 0, transform: "translateY(30px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 600, easing: "ease" },
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        // Save user profile + default role
        await set(ref(database, `users/${cred.user.uid}/profile`), {
          name,
          email,
          uid: cred.user.uid,
        });
        await set(ref(database, `users/${cred.user.uid}/role`), "user");
        navigate("/");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#fafafa] p-[20px] max-[768px]:min-h-[70vh] max-[768px]:p-[16px] max-[480px]:min-h-[60vh] max-[480px]:p-[12px]">
      <div ref={containerRef} className="w-full max-w-[420px] rounded-[20px] bg-white px-[36px] py-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 min-[1200px]:max-w-[460px] min-[1200px]:px-[44px] min-[1200px]:py-[48px] max-[1050px]:px-[28px] max-[1050px]:py-[32px] max-[768px]:rounded-[16px] max-[768px]:px-[20px] max-[768px]:py-[28px] max-[480px]:rounded-[12px] max-[480px]:px-[16px] max-[480px]:py-[24px] max-[480px]:shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-[24px] text-center text-[28px] font-semibold text-[#262626] min-[1200px]:text-[32px] max-[768px]:text-[24px] max-[480px]:mb-[18px] max-[480px]:text-[20px]">{isSignUp ? "Create Account" : "Login"}</h2>

          {isSignUp && (
            <div className="mb-[16px] flex items-center rounded-[12px] border-[1.5px] border-[#d9d9d9] bg-white px-[16px] transition-all duration-200 focus-within:border-[tomato] focus-within:shadow-[0_0_0_3px_rgba(255,99,71,0.1)] max-[768px]:px-[12px] max-[480px]:mb-[12px] max-[480px]:rounded-[10px] max-[480px]:px-[10px]">
              <User className="shrink-0 text-[#808080] max-[480px]:h-[18px] max-[480px]:w-[18px]" size={20} />
              <input
                className="w-full border-0 bg-transparent px-[12px] py-[14px] text-[16px] text-[#262626] outline-none placeholder:text-[#a0a0a0] placeholder:font-normal min-[1200px]:px-[14px] min-[1200px]:py-[16px] min-[1200px]:text-[18px] max-[768px]:px-[10px] max-[768px]:py-[12px] max-[768px]:text-[15px] max-[480px]:px-[8px] max-[480px]:py-[10px] max-[480px]:text-[14px]"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-[16px] flex items-center rounded-[12px] border-[1.5px] border-[#d9d9d9] bg-white px-[16px] transition-all duration-200 focus-within:border-[tomato] focus-within:shadow-[0_0_0_3px_rgba(255,99,71,0.1)] max-[768px]:px-[12px] max-[480px]:mb-[12px] max-[480px]:rounded-[10px] max-[480px]:px-[10px]">
            <Mail className="shrink-0 text-[#808080] max-[480px]:h-[18px] max-[480px]:w-[18px]" size={20} />
            <input
              className="w-full border-0 bg-transparent px-[12px] py-[14px] text-[16px] text-[#262626] outline-none placeholder:text-[#a0a0a0] placeholder:font-normal min-[1200px]:px-[14px] min-[1200px]:py-[16px] min-[1200px]:text-[18px] max-[768px]:px-[10px] max-[768px]:py-[12px] max-[768px]:text-[15px] max-[480px]:px-[8px] max-[480px]:py-[10px] max-[480px]:text-[14px]"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-[16px] flex items-center rounded-[12px] border-[1.5px] border-[#d9d9d9] bg-white px-[16px] transition-all duration-200 focus-within:border-[tomato] focus-within:shadow-[0_0_0_3px_rgba(255,99,71,0.1)] max-[768px]:px-[12px] max-[480px]:mb-[12px] max-[480px]:rounded-[10px] max-[480px]:px-[10px]">
            <Lock className="shrink-0 text-[#808080] max-[480px]:h-[18px] max-[480px]:w-[18px]" size={20} />
            <input
              className="w-full border-0 bg-transparent px-[12px] py-[14px] text-[16px] text-[#262626] outline-none placeholder:text-[#a0a0a0] placeholder:font-normal min-[1200px]:px-[14px] min-[1200px]:py-[16px] min-[1200px]:text-[18px] max-[768px]:px-[10px] max-[768px]:py-[12px] max-[768px]:text-[15px] max-[480px]:px-[8px] max-[480px]:py-[10px] max-[480px]:text-[14px]"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <EyeOff onClick={() => setShowPassword(false)} />
            ) : (
              <Eye onClick={() => setShowPassword(true)} />
            )}
          </div>

          {error && <p className="my-[12px] rounded-[8px] bg-[#ffebee] px-[12px] py-[8px] text-center text-[14px] text-[#d32f2f] max-[480px]:px-[10px] max-[480px]:py-[6px] max-[480px]:text-[13px]">{error}</p>}

          <button className="mt-[8px] w-full cursor-pointer rounded-full border-0 bg-[tomato] p-[14px] text-[18px] font-semibold tracking-[0.5px] text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#e64a2e] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-60 min-[1200px]:p-[16px] min-[1200px]:text-[20px] max-[768px]:p-[12px] max-[768px]:text-[16px] max-[480px]:rounded-[40px] max-[480px]:p-[10px] max-[480px]:text-[15px]" type="submit" disabled={loading}>
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </button>

          <p className="mt-[20px] cursor-pointer text-center text-[15px] text-[#555] transition-colors duration-200 hover:text-[tomato] max-[480px]:mt-[16px] max-[480px]:text-[14px]" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;