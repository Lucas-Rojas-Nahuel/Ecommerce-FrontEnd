import { useEffect, useState } from "react";
import SectionOptions from "../components/body/products/sectionOptions/sectionOptions";
import SectionProducts from "../components/body/products/sectionProducts/sectionProducts";

import "./../components/body/products/products.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getProduct } from "../slices/productsSlice";

export default function Products() {
  const [filters, setFilters] = useState(null);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
 
  //probando
  const produ = useSelector((state) => state.products);
  console.log(produ);

  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("http://localhost:3001/api/v1/productos")
      .then((res) => dispatch(getProduct(res.data)))
      .catch((err) => console.error(err));
      
  }, [dispatch]);

  return (
    <section className="products">
      <>
        <SectionOptions onFilterChange={handleFilterChange} />
        <SectionProducts filters={filters} />
      </>
    </section>
  );
}
