import React, { useContext } from "react";
import ProfileCard from "../components/ProfileCard";
import Context from "../context/Context";
import NavBar from "../components/NavBar";
const Home = () => {
  const { users } = useContext(Context);
  return (
    <>
      <NavBar />
      <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]  flex-col bg-white flex items-center gap-16">
        <div className="flex flex-col items-center mt-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent">
            Personalized Human-like Chat
          </h1>
          <span className="text-sm text-slate-500 font-semibold mt-2">
            AI conversations that understand, engage, and connect—personally.
          </span>
          <span className="text-sm text-slate-500 font-semibold">
            Get personalized insights, learn from experts, and enjoy
            conversations that feel truly human.
          </span>
        </div>
        <div className="flex gap-8 items-center justify-center w-full">
          <ProfileCard user={users[0]} />
          <ProfileCard user={users[1]} />
        </div>
      </div>
    </>
  );
};
export default Home;
