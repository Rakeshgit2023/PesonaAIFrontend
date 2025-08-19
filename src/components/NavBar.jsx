import React, { useContext } from "react";
import { LuGithub } from "react-icons/lu";
import { FiLinkedin } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

const NavBar = ({ selectedUser }) => {
  return (
    <div className=" h-16 md:h-20 bg-gradient-to-r from-purple-500 via-purple-300 to-purple-50 flex items-center justify-between px-4 md:px-12">
      <div className="flex gap-5 items-center justify-center text-white">
        {selectedUser ? (
          <div className="flex gap-3 items-center">
            <img src={selectedUser?.image} className="rounded-full h-14 w-14" />
            <span className="text-xl font-semibold">{selectedUser?.name}</span>
          </div>
        ) : (
          <>
            <div className="text-xl bg-gradient-to-r from-sky-600 to-purple-300 p-3 rounded-xl mt-1">
              <RiRobot2Line />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">
                PersonaPro
              </span>
              <span className="hidden md:inline text-xs font-semibold">
                An AI that reflects your voice, thoughts, and personality
              </span>
            </div>
          </>
        )}
      </div>
      <div className="flex gap-4 md:gap-8 text-purple-900 text-sm md:text-[17px]">
        <a
          className="flex gap-2 items-center cursor-pointer"
          href="https://www.linkedin.com/in/shawrakesh/"
          target="_blank"
        >
          <LuGithub />
          <span>GitHub</span>
        </a>
        <a
          className="flex gap-2 items-center cursor-pointer"
          href="https://www.linkedin.com/in/shawrakesh/"
          target="_blank"
        >
          <FiLinkedin />
          <span>Linkedin</span>
        </a>
      </div>
    </div>
  );
};
export default NavBar;
