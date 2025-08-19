import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user }) => {
  const nav = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center rounded-lg py-6 w-[33%] px-4 bg-white shadow-2xl transition-transform duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-3xl">
      <img src={user?.image} className="rounded-full h-32 w-32" />
      <span className="font-bold text-xl text-slate-600 mt-2">
        {user?.name}
      </span>
      <span className="text-sm text-slate-600 text-center mt-1.5">
        {user?.descriptions}
      </span>
      <button
        className="px-6 py-1.5 rounded-lg bg-gradient-to-r from-purple-500  to-purple-300 text-white font-semibold mt-5 shadow-xl cursor-pointer "
        onClick={() => nav(`/conversation?user=${user?.name}`)}
      >
        Start Conversation
      </button>
    </div>
  );
};
export default ProfileCard;
