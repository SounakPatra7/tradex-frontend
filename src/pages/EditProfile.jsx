
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://tradex-node.onrender.com/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        const userData = res.data.user || res.data;
        setUser(userData);
      } catch (err) {
        console.error("Fetch profile error:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", user.name);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.put("https://tradex-node.onrender.com/api/auth/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      navigate("/stocks");
    } catch (err) {
      console.error("Update profile error:", err.response?.data || err.message);
    }
  };

  if (!user) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="bg-blue-600 p-6 rounded-xl shadow space-y-4">
          <div className="flex flex-col items-center">
            <img
              src={
                preview ||
                (user.image
                  ? `https://tradex-node.onrender.com/api/auth/uploads/${user.image}`
                  : "/default-profile.png")
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-2"
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={user.name || ""}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />

          {/* <input
            type="text"
            placeholder="Address"
            className="w-full border p-2 rounded"
            value={user.address || ""}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            value={user.phone || ""}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          /> */}

          <button
            type="submit"
            className="w-full bg-blue-100 text-blue-600 p-2 rounded hover:bg-blue-300 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
