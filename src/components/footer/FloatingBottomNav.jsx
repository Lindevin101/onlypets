import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { FiUpload, FiMenu, FiHome, FiX, FiUser, FiSend } from "react-icons/fi";

import { signOut } from "../../services/users";
import api from "../../services/apiconfig.js";

const FloatingBottomNav = ({ userId }) => {
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await signOut();
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await api.delete(`/users/delete/${userId}/`);
        signOut();
        alert("Your account has been successfully deleted.");
      } catch (error) {
        console.error("Account deletion failed:", error);
        alert("There was a problem deleting your account. Please try again.");
      }
    }
  };

  return (
    <div className="fixed bottom-0 w-50 left-1/2 transform -translate-x-1/2 p-2 flex items-center justify-center">
      <motion.nav
        animate={open ? "open" : "closed"}
        initial="closed"
        className="bg-amber-50 text-black shadow-lg flex items-center rounded-lg"
      >
        <MenuButton setOpen={setOpen} open={open} />
        <div className="flex gap-3">
          <RouterLink to="/feed">
            <CustomLink text="Home" Icon={FiHome} />
          </RouterLink>
          <RouterLink to="/upload">
            <CustomLink text="Post" Icon={FiUpload} />
          </RouterLink>
          <RouterLink to="/profile">
            <CustomLink text="Profile" Icon={FiUser} />
          </RouterLink>
          <RouterLink to="/profile">
            <CustomLink text="Message" Icon={FiSend} />
          </RouterLink>
        </div>
        {/* <Menu handleLogout={handleLogout} /> */}
        <Menu handleDeleteAccount={handleDeleteAccount} />
      </motion.nav>
    </div>
  );
};

const CustomLink = ({ text, Icon }) => {
  return (
    <a
      href=""
      rel="nofollow"
      className="text-sm w-16 hover:text-indigo-500 transition-colors flex flex-col gap-2 items-center"
    >
      <Icon />
      <span className="text-xs">{text}</span>
    </a>
  );
};

const MenuButton = ({ open, setOpen }) => {
  return (
    <div
      onClick={() => setOpen((pv) => !pv)}
      className="text-xl font-bold h-full bg-black text-white rounded-lg"
    >
      <motion.button
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        className="p-4"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="icon-1"
              className="block"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.125, ease: "linear" }}
            >
              <FiX />
            </motion.span>
          ) : (
            <motion.span
              key="icon-2"
              className="block"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.125, ease: "linear" }}
            >
              <FiMenu />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

const Menu = ({ handleDeleteAccount }) => {
  let navigate = useNavigate();
  return (
    <motion.div
      variants={menuVariants}
      style={{ transformOrigin: "bottom", x: "-50%" }}
      className="p-8 bg-white shadow-lg absolute bottom-[125%] left-[50%] flex w-[calc(100vw_-_48px)] max-w-lg"
    >
      <div className="flex flex-col gap-2 w-full">
        <RouterLink to="/createprofile">
          <MenuLink text="Add Account" />
        </RouterLink>
        <RouterLink to="/switchpets">
          <MenuLink text="Switch Pets" />
        </RouterLink>
        {/* <RouterLink to="/" onClick={handleLogout}>
          <MenuLink text="Log Out" />
        </RouterLink> */}
        <button
          onClick={() => {
            signOut();
            navigate("/");
          }}
        >
          Log Out
        </button>
        <RouterLink to="/" onClick={handleDeleteAccount}>
          <MenuLink
            text="Delete Account"
            colorClasses="text-red-500 hover:text-red-700"
          />
        </RouterLink>
      </div>
    </motion.div>
  );
};

const SectionTitle = ({ text }) => {
  return (
    <motion.h4
      variants={menuLinkVariants}
      className="text-sm mb-2 font-semibold"
    >
      {text}
    </motion.h4>
  );
};

const MenuLink = ({ text, colorClasses }) => {
  return (
    <motion.a
      variants={menuLinkVariants}
      href="#"
      rel="nofollow"
      className={`text-sm hover:text-indigo-500 transition-colors flex items-center gap-2 ${colorClasses}`}
    >
      {text}
    </motion.a>
  );
};

export default FloatingBottomNav;

const iconVariants = {
  initial: { rotate: 180, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: -180, opacity: 0 },
};

const menuVariants = {
  open: {
    scale: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  closed: {
    scale: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05,
    },
  },
};

const menuLinkVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -15,
    opacity: 0,
  },
};

// h-[200px]
// left-1/2 transform -translate-x-1/2 w-50
