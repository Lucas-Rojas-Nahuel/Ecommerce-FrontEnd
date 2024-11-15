import CarruselProductsFashion from "./carruselProductsFashion/carruselProductsFashion";
import "./sectionFashion.css";

export default function SectionFashion() {
  return (
    <section className="section-fashion">
      <section className="section-title">
        <h3 className="title">Moda</h3>
        <a href="">
          <strong>Ver más sobre moda</strong>
        </a>
      </section>
      <section className="section-tarject-products">
        <CarruselProductsFashion/>
      </section>
      <section className="section-link">
        <a href="">
          <strong>Ver más sobre moda</strong>
          <i className="fi fi-rr-angle-small-right"></i>
        </a>
      </section>
    </section>
  );
}
