import { useContext, useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { StoreContext } from "../../context/StoreContext";
import { database } from "../../firebase/firebase";

const emptyProfile = { name: "", photoURL: "", address: "", phone: "" };
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const Profile = () => {
  const { user, updateUserProfile } = useContext(StoreContext);
  const [profile, setProfile] = useState(emptyProfile);
  const [savedProfile, setSavedProfile] = useState(emptyProfile);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return undefined;

    const profileRef = ref(database, `users/${user.uid}/profile`);
    return onValue(profileRef, (snapshot) => {
      const savedProfile = snapshot.val() || {};
      const nextProfile = {
        name: savedProfile.name || user.displayName || "",
        photoURL: savedProfile.photoURL || user.photoURL || "",
        address: savedProfile.address || "",
        phone: savedProfile.phone || "",
      };
      setProfile(nextProfile);
      setSavedProfile(nextProfile);
    });
  }, [user]);

  const handleChange = (event) => {
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Profile pictures must be smaller than 5 MB.");
      return;
    }
    setError("");
    setPhotoFile(file);
    setProfile((current) => ({ ...current, photoURL: URL.createObjectURL(file) }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      let photoURL = profile.photoURL;
      if (photoFile) {
        if (!cloudName || !uploadPreset) {
          throw new Error("Cloudinary settings are missing. Add the VITE_CLOUDINARY values to your .env file.");
        }
        const formData = new FormData();
        formData.append("file", photoFile);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", "niazi_food/profile_pictures");
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });
        const uploadResult = await response.json();
        if (!response.ok) throw new Error(uploadResult.error?.message || "Cloudinary upload failed.");
        photoURL = uploadResult.secure_url;
      }

      const updatedProfile = { ...profile, photoURL };
      const savedPhotoURL = await updateUserProfile(updatedProfile);
      setProfile(updatedProfile);
      setSavedProfile((current) => ({ ...current, ...updatedProfile, photoURL: savedPhotoURL }));
      setPhotoFile(null);
      setEditing(false);
      setMessage("Profile saved successfully.");
    } catch (saveError) {
      setError(saveError.message || "Unable to save your profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(savedProfile);
    setPhotoFile(null);
    setEditing(false);
    setMessage("");
    setError("");
  };

  return (
    <main className="min-h-[60vh] bg-[#fafafa] px-[20px] py-[50px] max-[600px]:px-[14px] max-[600px]:py-[28px]">
      <section className="mx-auto max-w-[760px] rounded-[14px] border border-[#eee] bg-white p-[36px] shadow-[0_8px_28px_rgba(0,0,0,0.06)] max-[600px]:px-[18px] max-[600px]:py-[24px]">
        <div className="mb-[30px] flex items-start justify-between gap-[20px] max-[600px]:flex-col">
          <div>
            <p className="text-[13px] font-semibold uppercase text-[tomato]">Your account</p>
            <h1 className="my-[6px] text-[32px] text-[#333] max-[600px]:text-[26px]">Profile details</h1>
            <p className="text-[#676767]">Keep your delivery information up to date.</p>
          </div>
          {!editing && (
            <button type="button" className="cursor-pointer whitespace-nowrap rounded-[7px] border border-[tomato] bg-[tomato] px-[20px] py-[10px] text-[14px] text-white max-[600px]:self-start" onClick={() => setEditing(true)}>
              Edit profile
            </button>
          )}
        </div>

        <form onSubmit={handleSave}>
          <div className="mb-[28px] flex items-center gap-[20px] max-[600px]:items-start max-[600px]:flex-col">
            {profile.photoURL ? (
              <img className="h-[92px] w-[92px] flex-[0_0_92px] rounded-full object-cover" src={profile.photoURL} alt="Profile" />
            ) : (
              <div className="grid h-[92px] w-[92px] flex-[0_0_92px] place-items-center rounded-full bg-[#49557e] text-[34px] text-white">
                {(profile.name || user?.email || "U")[0].toUpperCase()}
              </div>
            )}
            {editing && (
              <label className="flex flex-1 flex-col gap-[8px] text-[14px] font-medium text-[#444]">
                Choose profile picture
                <input className="w-full rounded-[6px] border border-[#ddd] px-[12px] py-[11px] font-[inherit] text-[#333]" type="file" accept="image/*" onChange={handlePhotoChange} />
                <span className="text-[12px] font-normal text-[#777]">JPG, PNG, or WEBP up to 5 MB. Stored securely in Cloudinary.</span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-2 gap-[20px] max-[600px]:grid-cols-1">
            <label className="flex flex-col gap-[8px] text-[14px] font-medium text-[#444]">
              Full name
              <input className="w-full resize-y rounded-[6px] border border-[#ddd] px-[12px] py-[11px] font-[inherit] text-[#333] read-only:bg-[#fafafa]" name="name" value={profile.name} onChange={handleChange} readOnly={!editing} required />
            </label>
            <label className="flex flex-col gap-[8px] text-[14px] font-medium text-[#444]">
              Email
              <input className="w-full resize-y rounded-[6px] border border-[#ddd] px-[12px] py-[11px] font-[inherit] text-[#333] read-only:bg-[#fafafa]" value={user?.email || ""} readOnly />
            </label>
            <label className="flex flex-col gap-[8px] text-[14px] font-medium text-[#444]">
              Phone number
              <input className="w-full resize-y rounded-[6px] border border-[#ddd] px-[12px] py-[11px] font-[inherit] text-[#333] read-only:bg-[#fafafa]" name="phone" type="tel" value={profile.phone} onChange={handleChange} readOnly={!editing} placeholder="+92 300 1234567" />
            </label>
            <label className="flex flex-col gap-[8px] text-[14px] font-medium text-[#444] max-[600px]:col-auto col-[1/-1]">
              Delivery address
              <textarea className="w-full resize-y rounded-[6px] border border-[#ddd] px-[12px] py-[11px] font-[inherit] text-[#333] read-only:bg-[#fafafa]" name="address" value={profile.address} onChange={handleChange} readOnly={!editing} placeholder="Enter your delivery address" rows="3" />
            </label>
          </div>

          {editing && (
            <div className="mt-[28px] flex justify-end gap-[12px]">
              <button type="button" className="cursor-pointer whitespace-nowrap rounded-[7px] border border-[#ddd] bg-white px-[20px] py-[10px] text-[14px] text-[#555]" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="cursor-pointer whitespace-nowrap rounded-[7px] border border-[tomato] bg-[tomato] px-[20px] py-[10px] text-[14px] text-white disabled:cursor-wait disabled:opacity-[0.65]" disabled={saving}>{saving ? "Saving..." : "Save changes"}</button>
            </div>
          )}
          {message && <p className="mt-[18px] text-[14px] text-[#237a45]">{message}</p>}
          {error && <p className="mt-[18px] text-[14px] text-[#c0392b]">{error}</p>}
        </form>
      </section>
    </main>
  );
};

export default Profile;