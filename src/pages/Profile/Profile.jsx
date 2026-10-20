import { useContext, useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { StoreContext } from "../../context/StoreContext";
import { database } from "../../firebase/firebase";
import "./Profile.css";

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
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-heading">
          <div>
            <p className="profile-eyebrow">Your account</p>
            <h1>Profile details</h1>
            <p>Keep your delivery information up to date.</p>
          </div>
          {!editing && (
            <button type="button" className="profile-edit-button" onClick={() => setEditing(true)}>
              Edit profile
            </button>
          )}
        </div>

        <form onSubmit={handleSave}>
          <div className="profile-photo-row">
            {profile.photoURL ? (
              <img className="profile-photo" src={profile.photoURL} alt="Profile" />
            ) : (
              <div className="profile-photo profile-photo-placeholder">
                {(profile.name || user?.email || "U")[0].toUpperCase()}
              </div>
            )}
            {editing && (
              <label className="profile-photo-field">
                Choose profile picture
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                <span>JPG, PNG, or WEBP up to 5 MB. Stored securely in Cloudinary.</span>
              </label>
            )}
          </div>

          <div className="profile-fields">
            <label>
              Full name
              <input name="name" value={profile.name} onChange={handleChange} readOnly={!editing} required />
            </label>
            <label>
              Email
              <input value={user?.email || ""} readOnly />
            </label>
            <label>
              Phone number
              <input name="phone" type="tel" value={profile.phone} onChange={handleChange} readOnly={!editing} placeholder="+92 300 1234567" />
            </label>
            <label className="profile-address-field">
              Delivery address
              <textarea name="address" value={profile.address} onChange={handleChange} readOnly={!editing} placeholder="Enter your delivery address" rows="3" />
            </label>
          </div>

          {editing && (
            <div className="profile-actions">
              <button type="button" className="profile-cancel-button" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="profile-save-button" disabled={saving}>{saving ? "Saving..." : "Save changes"}</button>
            </div>
          )}
          {message && <p className="profile-message">{message}</p>}
          {error && <p className="profile-error">{error}</p>}
        </form>
      </section>
    </main>
  );
};

export default Profile;