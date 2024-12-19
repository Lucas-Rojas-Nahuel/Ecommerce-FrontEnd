import ProductsOutstanding from "./carruselProductsOutstanding/productsOutstanding";
import "./sectionOutstanding.css";

export default function SectionOutstanding() {
  return (
    <section className="section-outstanding">
      <section className="section-title">
        <h3 className="title">Destacado</h3>
      </section>
      <section className="section-tarject-products">
        <ProductsOutstanding />
      </section>
    </section>
  );
}
