import "@flaticon/flaticon-uicons/css/all/all.css";
import "../../styles/colorGlobal.css";
import "./header.css";

import SectionHeader from "./sectionHeader/sectionHeader";
import NavLinkk from "./navLink/navLink";

export function Header() {
  return (
    <section className="header w-100">
      <div className=" w-100 fixed-top">
        <SectionHeader />
        <NavLinkk />
      </div>
    </section>
  );
}
