import { useState } from "react";
import SectionOptions from "../components/body/products/sectionOptions/sectionOptions";
import SectionProducts from "../components/body/products/sectionProducts/sectionProducts";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
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

  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);
  //probando

  return (
    <section className="products ">
      <div className="conten-btn-filter">
        <Button variant="link" onClick={toggleShow} className="me-2 text-decoration-none">
        <i className="fi fi-br-outdent"></i>
        </Button>
      </div>
      <Offcanvas show={show} onHide={toggleShow} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtros</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="contentFilters">
          {<SectionOptions onFilterChange={handleFilterChange} />}
        </Offcanvas.Body>
      </Offcanvas>
      <div className="content-products">
        <div className="content-none">
          <SectionOptions onFilterChange={handleFilterChange} /> 
        </div>
        <SectionProducts filters={filters} />
      </div>
    </section>
  );
}
