import "@flaticon/flaticon-uicons/css/all/all.css";
import "../../styles/colorGlobal.css";
import "./header.css";

import { useState } from "react";
import SectionHeader from "./sectionHeader/sectionHeader";
import ContentResponsi from "./contentResponsi/contentResponsi";

import NavLinkResponsi from "./navLinkResponsi/navLinkResponsi";
import NavLinkk from "./navLink/navLink";

 

export function Header( ) {
  //funcion para que al precionar el input del buscador cambie de color
  const [isActive, setIsAtive] = useState(false);
  const handlerFocus = () => {
    setIsAtive(true);
  };
  const handlerBlur = () => {
    setIsAtive(false);
  };

  //funcion para mostrar el buscador
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  //funcion para mostrar el menu
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const handlerClickMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  //funcion para el boton de categoria
  const [isActiveCategori, setIsActiveCategori] = useState(false);
  const handlerClickCategori = () => {
    setIsActiveCategori(!isActiveCategori);
  };

  return (
    <section className="section-header1">
      <div className="section-div">
        <div className="header">
          <SectionHeader
            onClick1={handlerClickMenu}
            isActive={isActive}
            onFocus={handlerFocus}
            onBlur={handlerBlur}
            onClick2={handleClick}
            isVisible={isVisible}
             
          />

          {/* para cuando se achica la pantalla */}
          {isVisible && (
            <ContentResponsi
              isActive={isActive}
              handlerFocus={handlerFocus}
              handlerBlur={handlerBlur}
            />
          )}

          <NavLinkk />

          {/* para cuando se achica la pantalla */}
          {isMenuVisible && (
            <NavLinkResponsi
              isMenuVisible={isMenuVisible}
              handlerClickCategori={handlerClickCategori}
              isActiveCategori={isActiveCategori}
            />
          )}
        </div>
      </div>
    </section>
  );
}


