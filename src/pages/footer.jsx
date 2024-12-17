import "./footer.css";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="container text-center">
        <ul className="content-footer-link list-unstyled d-flex justify-content-center gap-3 mb-0">
          <li>
            <a href="" className="text-white">
              <i className="fi fi-brands-facebook fs-4"></i>
            </a>
          </li>
          <li>
            <a href=""  className="text-white">
              <i className="fi fi-brands-instagram fs-4"></i>
            </a>
          </li>
          <li>
            <a href=""  className="text-white">
              <i className="fi fi-brands-twitter-alt fs-4"></i>
            </a>
          </li>
          <li>
            <a href="" className="text-white">
              <i className="fi fi-brands-github fs-4"></i>
            </a>
          </li>
          <li>
            <a href="" className="text-white">
              <i className="fi fi-brands-youtube fs-4"></i>
            </a>
          </li>
        </ul>
        <p className="mb-2">&copy; 2024 Eccomerce. Todos los derechos reservados </p>
      </div>
    </footer>
  );
}
