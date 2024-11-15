import "../components/body/home/home.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import "../styles/colorGlobal.css";
import slide1 from "../../public/body/home/sectionCarrusel/slide1.jpeg";
import slide2 from "../../public/body/home/sectionCarrusel/slide2.jpeg";
import slide3 from "../../public/body/home/sectionCarrusel/slide3.jpeg";
import SectionDiscount from "../components/body/home/sectionCarruselProductsDiscount/sectionDiscount";
import SectionCarrusel from "../components/body/home/sectionCarrusel/sectionCarrusel";

const images = [slide1, slide2, slide3];

export default function Home() {
  return (
    <section className="section-home">
      {/* section de carrosel de imagen de tienda o producto*/}
      <SectionCarrusel images={images} />

      {/*section carrosel de  productos con descuentos*/}
      <SectionDiscount/>
      {/*section carrosel de productos destacados*/}
      <section>carrosel destacados</section>
      {/* carrosel de productos de moda, ropa, zapato, etc */}
      <section>carrosel moda</section>
    </section>
  );
}
