 import CarruselProducts from './carruselProducts/carruselProducts'
import './sectionDiscount.css'

export default function SectionDiscount() {
  return (
    <section className="section-discount">
        <section className='section-title'>
            <h3 className='title'>Ofertas</h3>
            <a href=""><strong>Conocer más Ofertas</strong></a>
        </section>
        <section className='section-tarject-products'>
            <CarruselProducts/>
        </section>
    </section>
  )
}
