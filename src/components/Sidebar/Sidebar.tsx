import { SidebarNavlink, Icon } from "../";
import { useAuth } from "../../context/auth-context";

type SidebarProp = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ showSidebar, setShowSidebar }: SidebarProp) {
  const onSidebarClose = () => setShowSidebar(false);
  const { dispatch } = useAuth();

  const onLogoutClick = () => dispatch({ type: "LOGOUT_USER" });

  return (
    <div
      className={`flex-shrink-0 px-4 py-5 fixed sm:sticky z-20 left-0 top-0 min-h-screen sm:h-screen w-64 bg-gray-800 border-r border-gray-800 sm:flex flex-col items-center duration-300 transform sm:translate-x-0
      ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
    >
      <span className="text-base font-extrabold px-2 py-1 text-white border-2 border-white">
        JARVIS•QUIZ
      </span>
      <button onClick={onSidebarClose}>
        <Icon
          icon="close"
          size="24"
          extraStyles="absolute top-[1rem] right-[1rem] sm:hidden"
        />
      </button>

      <div className="w-full mt-6 space-y-2 flex flex-col h-full justify-between">
        <div className="space-y-2">
          <SidebarNavlink icon="home" link="/" title="Home" />
          <SidebarNavlink icon="description" link="results" title="Results" />
          <SidebarNavlink icon="person" link={`profile`} title="Profile" />
        </div>
        <button
          onClick={onLogoutClick}
          className="px-4 py-2 font-medium rounded w-full flex items-center text-gray-300 hover:bg-gray-600 hover:bg-opacity-30"
        >
          <Icon icon="logout" size="28" />
          <span className="ml-2">Logout</span>
        </button>
      </div>
    </div>
  );
}
