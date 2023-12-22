import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPet } from "../services/pet.js";
import { motion } from "framer-motion";
import NavRest from "../components/Nav-rest.jsx";
import "../App.css";

const CreateProfile = ({ user, setPets, setPrimaryPet }) => {
  const [petSpecies, setPetSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [profile_Img, setprofile_Img] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");

  let navigate = useNavigate();

  const addPet = async (e) => {
    e.preventDefault();
    const newPet = {
      species: petSpecies,
      breed: breed,
      age: parseInt(age),
      profile_img: profile_Img,
      gender: gender,
      name: name,
      owner: user.user.id,
    };

    const createdPet = await createPet(newPet);
    setPets((prevPets) => [...prevPets, createdPet]);
    setPrimaryPet(createdPet);
    navigate("/feed");
  };

  const backgroundImageUrl =
    "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBldHN8ZW58MHx8MHx8fDA%3D";
  return (
    <>
      <NavRest />
      <section
        className="flex items-center justify-center min-h-screen bg-slate-50"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Form
          petSpecies={petSpecies}
          breed={breed}
          Age={age}
          profile_Img={profile_Img}
          gender={gender}
          name={name}
          onPetSpeciesChange={(value) => setPetSpecies(value)}
          onBreedChange={(value) => setBreed(value)}
          onAgeChange={(value) => setAge(value)}
          onprofile_ImgChange={(value) => setprofile_Img(value)}
          onNameChange={(value) => setName(value)}
          onGenderChange={(value) => setGender(value)}
          onAddPet={addPet}
        />
      </section>
    </>
  );
};

const Form = ({
  petSpecies,
  breed,
  age,
  profile_Img,
  gender,
  name,
  onPetSpeciesChange,
  onBreedChange,
  onAgeChange,
  onprofile_ImgChange,
  onNameChange,
  onGenderChange,
  onAddPet,
}) => {
  const primaryVariants = {
    initial: {
      y: 25,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="mx-auto my-auto max-w-lg px-4 md:pr-0"
    >
      <div className="border-2 border-indigo-600 rounded-lg p-4 bg-white bg-opacity-50 ">
        <motion.h1
          variants={primaryVariants}
          className="mb-2 text-center text-4xl font-semibold"
        >
          Create Your Pet's Bio
        </motion.h1>

        <form onSubmit={onAddPet} className="w-full">
          <motion.div variants={primaryVariants} className="mb-4 w-full">
            <label className="mb-1 inline-block text-sm font-medium">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="input"
              placeholder="Pet's Name"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              required
            />
          </motion.div>

          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label className="mb-1 inline-block text-sm font-medium">
              Species<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Species"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              value={petSpecies}
              onChange={(e) => onPetSpeciesChange(e.target.value)}
              required
            />
          </motion.div>

          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <label className="mb-1 inline-block text-sm font-medium">
              Breed<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Pet's Breed"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              value={breed}
              onChange={(e) => onBreedChange(e.target.value)}
              required
            />
          </motion.div>

          <motion.div variants={primaryVariants} className="mb-4 w-full">
            <label className="mb-1 inline-block text-sm font-medium">
              Age <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              placeholder="Pet's Age"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              value={age}
              onChange={(e) => onAgeChange(e.target.value)}
              required
            />
          </motion.div>

          <motion.div variants={primaryVariants} className="mb-4 w-full">
            <label className="mb-1 inline-block text-sm font-medium">
              Gender <span className="text-red-600">*</span>
            </label>
            <select
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              value={gender}
              onChange={(e) => onGenderChange(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="not specified">not specified</option>
            </select>
          </motion.div>

          <motion.div variants={primaryVariants} className="mb-4 w-full">
            <label className="mb-1 inline-block text-sm font-medium">
              Pet's Profile Picture URL <span className="text-red-600">*</span>
            </label>
            <input
              type="url"
              placeholder="Pet's Profile Picture URL"
              className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
              value={profile_Img}
              onChange={(e) => onprofile_ImgChange(e.target.value)}
              required
            />
          </motion.div>

          <motion.button
            variants={primaryVariants}
            whileTap={{
              scale: 0.985,
            }}
            type="submit"
            className="mb-1.5 w-full rounded bg-indigo-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Submit
          </motion.button>

          {/* <motion.button
            variants={primaryVariants}
            whileTap={{
              scale: 0.985,
            }}
            type="submit"
            className="mb-1.5 w-full rounded bg-indigo-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Back
          </motion.button> */}
        </form>
      </div>
    </motion.div>
  );
};

export default CreateProfile;
