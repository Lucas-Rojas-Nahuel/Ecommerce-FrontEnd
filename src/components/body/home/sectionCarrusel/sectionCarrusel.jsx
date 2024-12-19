import PropTypes from "prop-types";
import "./sectionCarrusel.css";

import Carousel from "react-bootstrap/Carousel";

export default function SectionCarrusel({ images }) {
  return (
    <Carousel data-bs-theme="dark">
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image}
            alt={`Slide ${index}`}
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

SectionCarrusel.propTypes = {
  images: PropTypes.array.isRequired,
};
