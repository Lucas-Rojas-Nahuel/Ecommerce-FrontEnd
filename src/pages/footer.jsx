 import './footer.css'

export default function Footer() {
  return (
    <section className="section-footer">
        <p>&copy; 2024 Eccomerce. Todos los derechos reservados </p>
        <ul className="content-footer-link">
            <li><a href=""><i className="fi fi-brands-facebook"></i></a></li>
            <li><a href=""><i className="fi fi-brands-instagram"></i></a></li>
            <li><a href=""><i className="fi fi-brands-twitter-alt"></i></a></li>
            <li><a href=""><i className="fi fi-brands-github"></i></a></li>
            <li><a href=""><i className="fi fi-brands-youtube"></i></a></li>
        </ul>
    </section>
  )
}
