import NavHome from "../components/Nav-home.jsx";
import FloatingBottomNav from "../components/footer/FloatingBottomNav.jsx";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

let squareData = new Array(16).fill({});

const Home = ({ posts }) => {
  for (let i = 0; i < 16; i++) {
    squareData[i] = {
      id: i + 1,
      src: posts[i]?.post_image || "",
    };
    // console.log(squareData[i]);
  }

  return (
    <div>
      <NavHome />
      <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
        <div>
          <span className="block mb-4 text-xs md:text-lg text-black-500 font-medium">
            Better every day
          </span>
          <h3 className="text-4xl md:text-6xl font-semibold">
            Fur-real Connections, Paws-itively Fun!
          </h3>
          <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
            Snouts, Whiskers, Feathers, and Fins: All Welcome Here!
          </p>
          <Link to="/signup">
            <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
              Explore
            </button>
          </Link>
        </div>
        <ShuffleGrid posts={posts} />
      </section>
      <FloatingBottomNav />
    </div>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default Home;
