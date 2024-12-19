import "../components/body/home/home.css";
import "@flaticon/flaticon-uicons/css/all/all.css";
import "../styles/colorGlobal.css";
import slide1 from "../assets/sectionCarrusel/slide1.png";
import slide2 from "../assets/sectionCarrusel/slide2.png";


import SectionCarrusel from "../components/body/home/sectionCarrusel/sectionCarrusel";
import SectionOutstanding from "../components/body/home/sectionCarruselProductsOutstanding/sectionOutstanding";

const images = [slide1, slide2];

export default function Home() {
  return (
    <section className="section-home">
      {/* section de carrosel de imagen de tienda o producto*/}
      <SectionCarrusel images={images} />

      {/*section carrosel de productos destacados*/}
      <SectionOutstanding />
    </section>
  );
}
