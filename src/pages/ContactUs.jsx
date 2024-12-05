import { useSelector } from "react-redux";

export default function ContactUs() {
  const isActive = useSelector((state) => state.button.isActive); // Verifica si este estado existe
  console.log(isActive)
  return <section>{isActive ? 'activo': 'inactivo'} hola </section>;
}
