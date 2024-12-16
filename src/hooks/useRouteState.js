import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPageActive, setPageInative } from '../features/OrdenCreate/OrdenCreate';


const useRouteState = (targetPath) => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === targetPath) {
      dispatch(setPageActive());
    } else {
      dispatch(setPageInative());
    }
  }, [location, targetPath, dispatch]);
};

export default useRouteState;
