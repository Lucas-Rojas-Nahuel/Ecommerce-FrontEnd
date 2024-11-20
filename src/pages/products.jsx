import SectionOptions from "../components/body/products/sectionOptions/sectionOptions";
import SectionProducts from "../components/body/products/sectionProducts/sectionProducts";

import "./../components/body/products/products.css";

export default function Products() {
  

  return (
    <section className="products">
      <>
        <SectionOptions />
        <SectionProducts/>
      </>
    </section>
  );
}
