import FloatingBottomNav from "../components/footer/FloatingBottomNav.jsx";
import NavRest from "../components/Nav-rest.jsx";
import { useEffect, useState } from "react";
import { getPetPosts } from "../services/posts.js";
import { Link } from "react-router-dom";

const NeumorphismButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full 
        flex items-center gap-2 
        text-slate-500
        shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
        
        transition-all

        hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.6),_1px_1px_5px_rgba(0,_0,_0,_0.3),inset_-2px_-2px_5px_rgba(255,_255,_255,_1),inset_2px_2px_4px_rgba(0,_0,_0,_0.3)]
        hover:text-violet-500
    `}
    >
      {children}
    </button>
  );
};

function Profile({ pets, primaryPet, setPrimaryPet }) {
  const [petPosts, setPetPosts] = useState([]);
  const [openProfilePick, setOpenProfilePick] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [primaryPet]);

  async function fetchPosts() {
    if (!primaryPet) return;
    const petsPostsData = await getPetPosts(primaryPet?.id);
    setPetPosts(petsPostsData);
    console.log(petsPostsData);
  }

  function handleProfileClick(selectedPet) {
    setPrimaryPet(selectedPet);
    setOpenProfilePick(false);
  }

  if (!primaryPet) return <h1>Create a Pet Profile</h1>;

  return (
    <div>
      <div className="mb-20">
        <NavRest />
        <div className="bg-gray-200">
          <div className="container mx-auto mt-8 bg-gray-200 p-4">
            {/* Background Container */}
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center mx-auto max-w-2xl">
              {/* Top Portion */}
              <div className="mb-6 w-full text-center">
                {/* Profile Picture */}
                <div className="mb-4 inline-bloc">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto">
                    {/* Add your profile picture source */}
                    <img
                      src={primaryPet?.profile_img}
                      alt="/"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <p className="text-xl font-bold mb-2">{primaryPet.name}</p>
              {/* User Stats */}
              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold mb-1 mr-1">
                    {petPosts.length}
                  </span>
                  Posts
                </li>
                <li>
                  <span className="font-semibold mb-1 mr-1">
                    {primaryPet.age}
                  </span>
                  Age
                </li>
                <li>
                  <span className="font-semibold mb-1 mr-1">
                    {primaryPet.gender}
                  </span>
                  Gender
                </li>
              </ul>
            </div>
            {/* Buttons */}
            <div className="flex justify-center items-center space-x-4 mt-8">
              <NeumorphismButton>Edit Profile</NeumorphismButton>
              <Link to="/upload" className="no-underline">
                <NeumorphismButton>Post</NeumorphismButton>
              </Link>
              <NeumorphismButton
                onClick={() => setOpenProfilePick((prev) => !prev)}
              >
                Switch Profile
              </NeumorphismButton>
            </div>
            {openProfilePick && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {pets.map((pet) => (
                  <div key={pet.id} className="text-center">
                    <img
                      src={pet.profile_img}
                      alt={pet.name}
                      className="w-24 h-24 object-cover rounded-full mx-auto cursor-pointer"
                      onClick={() => handleProfileClick(pet)}
                    />
                    <p className="text-sm mt-2">{pet.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Portion - Photo Gallery */}
        <div className="grid grid-cols-3 gap-6 bg-gray-200 max-w-4xl mx-auto p-4 rounded-lg mt-8">
          {petPosts.map((petPost) => (
            <div
              key={petPost.id}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <img
                src={petPost.post_image}
                alt="pet post"
                className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
        <FloatingBottomNav />
      </div>
    </div>
  );
}

export default Profile;
