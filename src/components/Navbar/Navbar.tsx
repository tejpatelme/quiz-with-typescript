import React from "react";

type NavbarProp = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ setShowSidebar }: NavbarProp) {
  const onHamburgerClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setShowSidebar((showSidebar) => !showSidebar);
  };
  return (
    <nav className="sm:hidden max-w-full p-4 sm:mb-4 flex justify-center bg-gray-800 sticky top-0 left-0">
      <button onClick={onHamburgerClick}>
        <span className="material-icons-round absolute top-[1rem] left-[1rem] text-white text-3xl sm:hidden">
          menu
        </span>
      </button>

      <span className="text-base font-extrabold px-2 py-1 text-white border-2 border-white">
        JARVIS•QUIZ
      </span>
    </nav>
  );
}
