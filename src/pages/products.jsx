import { useState } from "react";
import SectionOptions from "../components/body/products/sectionOptions/sectionOptions";
import SectionProducts from "../components/body/products/sectionProducts/sectionProducts";

import "./../components/body/products/products.css";
import { useSelector } from "react-redux";


export default function Products() {
  const [filters, setFilters] = useState();
  /* console.log(filters); */

  const searchText = useSelector((state) => state.search.text);
  if (searchText.length > 0) {
    console.log(typeof searchText);
  }
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  //probando
  
  
  

  return (
    <section className="products">
      <>
        <SectionOptions onFilterChange={handleFilterChange} />
        <SectionProducts filters={filters} />
      </>
    </section>
  );
}
