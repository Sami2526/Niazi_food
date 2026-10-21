import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { auth } from "../../firebase/firebase";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { user, role, getTotalCartAmount } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    window.location.href = "/";
  };

  // Get user initials from displayName or email
  const getInitials = () => {
    if (user?.displayName) {
      const nameParts = user.displayName.split(" ");
      if (nameParts.length >= 2) {
        return nameParts[0][0] + nameParts[1][0];
      }
      return nameParts[0][0];
    }
    return user?.email ? user.email[0].toUpperCase() : "?";
  };

  // If user has a photoURL from Firebase Auth, use it; otherwise show initials
  const avatarUrl = user?.photoURL || null;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="sticky top-0 z-[1000] flex items-center justify-between border-b border-[#f0f0f0] bg-white/[0.96] px-[clamp(16px,3vw,48px)] py-5 shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-[8px] max-[1050px]:px-6 max-[1050px]:py-[18px] max-[900px]:px-5 max-[900px]:py-4 max-[750px]:flex-wrap max-[750px]:px-4 max-[750px]:py-[15px] max-[500px]:px-3 max-[500px]:py-3 max-[370px]:px-[10px] max-[370px]:py-[10px]">
      <Link to="/" onClick={scrollToTop}>
        <img
          src={assets.logo_niazi}
          alt="Logo"
          className="h-auto w-[150px] max-w-full min-[1200px]:w-[170px] max-[1050px]:w-[140px] max-[900px]:w-[120px] max-[750px]:w-[110px] max-[500px]:w-[100px] max-[370px]:w-[90px]"
        />
      </Link>

      <ul id="mobile-navigation" className={`flex list-none gap-5 text-[18px] text-[#49557e] min-[1200px]:gap-[45px] min-[1200px]:text-[20px] max-[750px]:absolute max-[750px]:left-0 max-[750px]:top-full max-[750px]:z-50 max-[750px]:w-full max-[750px]:flex-col max-[750px]:gap-0 max-[750px]:bg-white max-[750px]:py-2 max-[750px]:text-[14px] max-[750px]:shadow-[0_8px_16px_rgba(0,0,0,0.08)] max-[500px]:text-[13px] ${mobileMenuOpen ? "max-[750px]:flex" : "max-[750px]:hidden"}`}>
        <a
          href="/"
          onClick={() => { setMenu("home"); setMobileMenuOpen(false); }}
          className={`whitespace-nowrap max-[750px]:px-5 max-[750px]:py-3 ${menu === "home" ? "border-b-2 border-[#49557e] pb-0.5 max-[750px]:border-0 max-[750px]:bg-[#f7f7f7]" : ""}`}
        >
          Home
        </a>
        <a
          href="#explore-menu"
          onClick={() => { setMenu("menu"); setMobileMenuOpen(false); }}
          className={`whitespace-nowrap max-[750px]:px-5 max-[750px]:py-3 ${menu === "menu" ? "border-b-2 border-[#49557e] pb-0.5 max-[750px]:border-0 max-[750px]:bg-[#f7f7f7]" : ""}`}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => { setMenu("mobile-app"); setMobileMenuOpen(false); }}
          className={`whitespace-nowrap max-[750px]:px-5 max-[750px]:py-3 ${menu === "mobile-app" ? "border-b-2 border-[#49557e] pb-0.5 max-[750px]:border-0 max-[750px]:bg-[#f7f7f7]" : ""}`}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          onClick={() => { setMenu("contact-us"); setMobileMenuOpen(false); }}
          className={`whitespace-nowrap max-[750px]:px-5 max-[750px]:py-3 ${menu === "contact-us" ? "border-b-2 border-[#49557e] pb-0.5 max-[750px]:border-0 max-[750px]:bg-[#f7f7f7]" : ""}`}
        >
          Contact Us
        </a>
      </ul>

      <div className="flex items-center gap-10 min-[1200px]:gap-[50px] max-[1050px]:gap-[30px] max-[900px]:gap-[22px] max-[750px]:min-w-0 max-[750px]:flex-1 max-[750px]:justify-end max-[750px]:gap-3 max-[500px]:gap-[9px] max-[370px]:gap-[7px]">
        <div className="flex items-center gap-2 rounded-[20px] border border-[#ddd] px-3 py-1 max-[750px]:min-w-0 max-[750px]:gap-[6px] max-[750px]:px-2">
          <img src={assets.search_icon} alt="" className="w-[18px] cursor-pointer" />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search food"
            aria-label="Search food"
            className="w-[130px] border-0 py-[6px] outline-none max-[750px]:w-[clamp(64px,18vw,110px)] max-[750px]:min-w-0 max-[500px]:w-[clamp(54px,19vw,88px)] max-[500px]:text-xs max-[370px]:w-[54px]"
          />
        </div>

        <div className="relative">
          <Link to="/cart" onClick={scrollToTop}>
            <img
              src={assets.bag_icon}
              alt="Cart"
              className="w-[22px] h-auto cursor-pointer min-[1200px]:w-[26px] max-[1050px]:w-[21px] max-[900px]:w-5 max-[750px]:w-[19px] max-[500px]:w-[18px] max-[370px]:w-[17px]"
            />
          </Link>
          <div
            className={
              getTotalCartAmount && getTotalCartAmount() === 0
                ? ""
                : "absolute -top-2 -right-2 min-h-[10px] min-w-[10px] rounded-full bg-[tomato] max-[750px]:-top-[6px] max-[750px]:-right-[6px] max-[750px]:min-h-2 max-[750px]:min-w-2 max-[500px]:-top-[5px] max-[500px]:-right-[5px] max-[500px]:min-h-[7px] max-[500px]:min-w-[7px] max-[370px]:-top-1 max-[370px]:-right-1 max-[370px]:min-h-[6px] max-[370px]:min-w-[6px]"
            }
          />
        </div>

        {user ? (
          <div className="relative flex shrink-0 items-center gap-5 max-[750px]:gap-3 max-[500px]:gap-2" ref={accountRef}>
            {role === "admin" && (
              <Link to="/admin" className="rounded-[30px] border border-[#ff6347] px-[14px] py-1.5 font-semibold text-[#ff6347] transition hover:bg-[#ff6347] hover:text-white">
                Admin
              </Link>
            )}

            <div
              className="flex aspect-square h-10 w-10 min-w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-[#ddd] bg-[#f0f0f0] transition hover:border-[tomato] max-[750px]:h-[34px] max-[750px]:w-[34px] max-[750px]:min-w-[34px] max-[500px]:h-[30px] max-[500px]:w-[30px] max-[500px]:min-w-[30px]"
              onClick={() => setShowDropdown((visible) => !visible)}
              aria-expanded={showDropdown}
              aria-label="Open account menu"
              role="button"
              tabIndex={0}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="block h-full w-full rounded-full object-cover object-center"
                />
              ) : (
                <div className="text-base font-semibold uppercase text-[#49557e] max-[750px]:text-sm max-[500px]:text-xs">{getInitials()}</div>
              )}
            </div>

            {showDropdown && (
              <div className="absolute top-[calc(100%+10px)] right-0 z-[1000] w-[180px] max-w-[calc(100vw-24px)] animate-[fadeIn_0.2s_ease] rounded-xl bg-white py-2 shadow-[0_4px_20px_rgba(0,0,0,0.1)] max-[750px]:right-[-10px] max-[750px]:w-[160px] max-[500px]:w-[150px]" role="menu">
                <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-[#333]">
                  <span>Your Account</span>
                  <button type="button" onClick={() => setShowDropdown(false)} aria-label="Close account menu" className="cursor-pointer border-0 bg-transparent px-1 text-xl leading-none text-[#777]">×</button>
                </div>
                <Link to="/profile" className="block cursor-pointer px-5 py-[10px] text-sm text-[#333] no-underline transition hover:bg-[#f5f5f5] hover:text-[tomato] max-[500px]:px-4 max-[500px]:py-2 max-[500px]:text-[13px]" onClick={() => setShowDropdown(false)}>
                  Profile
                </Link>
                <button onClick={handleLogout} className="block w-full cursor-pointer border-0 border-t border-[#eee] bg-transparent px-5 py-[10px] text-left text-sm text-[#d32f2f] transition hover:bg-[#ffebee] max-[500px]:px-4 max-[500px]:py-2 max-[500px]:text-[13px]">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" onClick={scrollToTop}>
            <button className="cursor-pointer rounded-full border border-[tomato] bg-transparent px-[30px] py-[10px] text-base whitespace-nowrap text-[#49557e] transition hover:bg-[#fff4f2] min-[1200px]:px-10 min-[1200px]:py-3 min-[1200px]:text-[18px] max-[1050px]:px-[25px] max-[1050px]:py-2 max-[1050px]:text-[15px] max-[900px]:px-[18px] max-[900px]:py-[7px] max-[900px]:text-sm max-[750px]:px-[17px] max-[750px]:py-[7px] max-[750px]:text-sm max-[500px]:px-[10px] max-[500px]:py-[6px] max-[500px]:text-[13px] max-[370px]:px-[10px] max-[370px]:py-[5px] max-[370px]:text-xs">
              Sign in
            </button>
          </Link>
        )}
        <button
          type="button"
          className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[#ddd] bg-white text-[#49557e] max-[750px]:inline-flex max-[500px]:h-9 max-[500px]:w-9"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;