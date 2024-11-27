
import './sectionHeader.css'
import PropTypes from "prop-types";
import { ContentLogo } from "./contentLogo";
import ContentSearches from "./contentSearches";
import { ContentButton } from "./contentButton";

export default function SectionHeader({
  onClick1,
  isActive,
  onFocus,
  onBlur,
  onClick2,
  isVisible, 
  toggleModal,
  setIsAuthenticated
}) {
  
  return (
    <section className="section-header">
      <ContentLogo onClick={onClick1} />
      <ContentSearches isActive={isActive} onFocus={onFocus} onBlur={onBlur} />
      <ContentButton onClick={onClick2} isVisible={isVisible} toggleModal={toggleModal}  setIsAuthenticated={setIsAuthenticated}/>
    </section>
  );
}

SectionHeader.propTypes = {
  onClick1: PropTypes.func.isRequired, // Especifica que onClick1 es una función y es requerida
  onClick2: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  
  setIsAuthenticated: PropTypes.func.isRequired,
};
