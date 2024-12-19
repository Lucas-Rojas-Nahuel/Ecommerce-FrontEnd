import ProductsOutstanding from "./carruselProductsOutstanding/productsOutstanding";
import "./sectionOutstanding.css";

export default function SectionOutstanding() {
  return (
    <section className="section-outstanding">
      <section className="section-title">
        <h3 className="title">Destacado</h3>
        <strong>
          <a href="">Ver más productos destacados</a>
        </strong>
      </section>
      <section className="section-tarject-products">
        <ProductsOutstanding />
      </section>
      <section className="section-link">
        {/* <a href="">
          <strong>Ver más sobre destacados</strong>
          <i className="fi fi-rr-angle-small-right"></i>
        </a> */}
      </section>
    </section>
  );
}
