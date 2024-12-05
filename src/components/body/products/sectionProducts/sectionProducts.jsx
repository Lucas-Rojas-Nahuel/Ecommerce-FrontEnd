import PropTypes from 'prop-types'
import CardProducts from './cardProducts/cardProducts'
import './sectionProducts.css'

export default function SectionProducts({filters}) {
  return (
    <section className="section-products">
      <div className="content-card">
        <CardProducts filters={filters}/>
      </div>
    </section> 
  )
}

SectionProducts.propTypes = {
  filters: PropTypes.shape({
    categoria: PropTypes.arrayOf(PropTypes.string), 
    marca: PropTypes.arrayOf(PropTypes.string), 
   })
 }
