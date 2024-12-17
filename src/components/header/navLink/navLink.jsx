import useUserRole from "../../../hooks/users/useUserRole";
import renderContent from "./renderContent";
import "./navLink.css";

export default function NavLinkk() {
  const { role } = useUserRole();

  return (
    <nav className="nav-link bg-dark margin nav-link">
      <ul className="content-nav">{renderContent(role)}</ul>
    </nav>
  );
}
