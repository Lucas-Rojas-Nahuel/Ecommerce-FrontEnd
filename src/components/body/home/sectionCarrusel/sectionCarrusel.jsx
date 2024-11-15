import PropTypes from "prop-types";
import "./sectionCarrusel.css";
import { useRef, useState } from "react";

export default function SectionCarrusel({ images }) {
  //funcion para que muestre las imagenes en la posicion del array
  let [currentIndex, setCurrentIndex] = useState(0);
  
  const handlerPrev = () => {
      setCurrentIndex(currentIndex == 0 ? (currentIndex = 2) : currentIndex - 1);
    };
    
    const handlerNext = () => {
        setCurrentIndex(currentIndex == 2 ? (currentIndex = 0) : currentIndex + 1);
    };
    
    //funcion para deslizar las imagenes 
    const touchStartRef = useRef(0);
    const handlerTouchStart = (e) => {
        touchStartRef.current = e.touches[0].clientX;
    }

    const handlerTouchEnd = (e) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStartRef.current - touchEnd > 50){
            handlerNext();
        }else if (touchEnd - touchStartRef.current > 50){
            handlerPrev();
        }
    }



  return (
    <section className="carrusel" onTouchStart={handlerTouchStart} onTouchEnd={handlerTouchEnd}>
      
        <button className="carrusel-boton prev" onClick={handlerPrev}>
          <i className="fi fi-rr-angle-double-small-left"></i>
        </button>

        <div className="carrusel-imagenes">
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="carrusel-imagen"
          />
        </div>
        <button className="carrusel-boton next" onClick={handlerNext}>
          <i className="fi fi-rr-angle-double-small-right"></i>
        </button>
      
    </section>
  );
}

SectionCarrusel.propTypes = {
  images: PropTypes.array.isRequired,
};
