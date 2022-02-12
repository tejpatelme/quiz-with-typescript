import { NavLink } from "react-router-dom";
import { Icon } from "..";

type SidebarNavlinkProp = {
  link: string;
  icon: string;
  title: string;
};

export default function SidebarNavlink({
  link,
  icon,
  title,
}: SidebarNavlinkProp) {
  return (
    <NavLink
      end
      to={link}
      activeClassName="bg-gray-600 bg-opacity-20"
      className="px-4 py-2 rounded w-full flex items-center text-gray-300 hover:bg-gray-600 hover:bg-opacity-30"
    >
      <Icon icon={icon} size="28" />
      <span className="pl-2 font-medium">{title}</span>
    </NavLink>
  );
}
