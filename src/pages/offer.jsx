import { useDispatch, useSelector } from "react-redux";
import {
  setButtonActive,
  setButtonInactive,
  toggleButton,
} from "../store/getHola";



export default function Offer() {
  const isActive = useSelector((state) => state.button.isActive);
   
 

  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(toggleButton())}>
        {isActive ? "activo" : "desactivado"}
      </button>

      <div>
        <button onClick={() => dispatch(setButtonActive())}>Activar</button>
        <button onClick={() => dispatch(setButtonInactive())}>desactiva</button>
      </div>
    </div>
  );
}
