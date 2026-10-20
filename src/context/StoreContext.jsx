import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, update, onValue } from "firebase/database";
import { auth, database } from "../firebase/firebase";
import { food_list as defaultFoodList } from "../assets/assets";
import { updateProfile } from "firebase/auth";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [foodList, setFoodList] = useState([]);

  // ---------- Load products from Firebase ----------
  useEffect(() => {
    const productsRef = ref(database, "products");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data).map(key => ({ _id: key, ...data[key] }));
        const remoteIds = new Set(list.map(item => item._id));
        setFoodList([...defaultFoodList.filter(item => !remoteIds.has(item._id)), ...list]);
      } else {
        setFoodList(defaultFoodList);
      }
    });
    return () => unsubscribe();
  }, []);

  // ---------- Auth state + load user role ----------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const roleRef = ref(database, `users/${currentUser.uid}/role`);
        const unsubRole = onValue(roleRef, (snap) => {
          setRole(snap.val() || "user");
        });

        const cartRef = ref(database, `users/${currentUser.uid}/cart`);
        const unsubCart = onValue(cartRef, (snap) => {
          setCartItems(snap.val() || {});
        });

        setLoading(false);
        return () => {
          unsubRole();
          unsubCart();
        };
      } else {
        setRole(null);
        setCartItems({});
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // ---------- Cart operations ----------
  const addToCart = (itemId) => {
    if (!user) return false;
    setCartItems((prev) => {
      const updated = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
      set(ref(database, `users/${user.uid}/cart`), updated);
      return updated;
    });
    return true;
  };

  const removeFromCart = (itemId) => {
    if (!user) return false;
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) updated[itemId]--;
      else delete updated[itemId];
      set(ref(database, `users/${user.uid}/cart`), updated);
      return updated;
    });
    return true;
  };

  const updateUserProfile = async (profile) => {
    if (!user) throw new Error("You must be signed in to update your profile.");
    const photoURL = profile.photoURL || "";

    await updateProfile(user, {
      displayName: profile.name,
      photoURL: photoURL || null,
    });
    await update(ref(database, `users/${user.uid}/profile`), {
      name: profile.name,
      photoURL,
      address: profile.address,
      phone: profile.phone,
      email: user.email,
      uid: user.uid,
    });
    setUser({ ...user });
    return photoURL;
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const item = foodList.find(p => p._id === id);
      if (item) total += item.price * cartItems[id];
    }
    return total;
  };

  const contextValue = {
    user,
    role,
    loading,
    foodList,          // dynamic products
    food_list: foodList, // alias for backward compatibility
    cartItems,
    addToCart,
    removeFromCart,
    updateUserProfile,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;