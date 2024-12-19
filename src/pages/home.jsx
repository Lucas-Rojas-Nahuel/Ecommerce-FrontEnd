import "../components/body/home/home.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import "../styles/colorGlobal.css";
import slide1 from "../assets/sectionCarrusel/slide1.png";
import slide2 from "../assets/sectionCarrusel/slide2.png";
import slide3 from "../assets/sectionCarrusel/slide3.jpeg";
//import SectionDiscount from "../components/body/home/sectionCarruselProductsDiscount/sectionDiscount";
import SectionCarrusel from "../components/body/home/sectionCarrusel/sectionCarrusel";
import SectionOutstanding from "../components/body/home/sectionCarruselProductsOutstanding/sectionOutstanding";
//import SectionFashion from "../components/body/home/sectionCarruselProducstsFashion/sectionFashion";

const images = [slide1, slide2, slide3];

export default function Home() {
  return (
    <section className="section-home">
      {/* section de carrosel de imagen de tienda o producto*/}
      <SectionCarrusel images={images} />

      {/*section carrosel de  productos con descuentos*/}
      {/* <SectionDiscount /> */}
      {/*section carrosel de productos destacados*/}
      <SectionOutstanding />
      {/* carrosel de productos de moda, ropa, zapato, etc */}
      {/* <SectionFashion /> */}
    </section>
  );
}
