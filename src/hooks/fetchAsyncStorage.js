import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../state/slices/userSlice';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';

export const useStorageData = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const [value, setValue] = useState(null);
  useEffect(() => {
    const readToken = () => {
      let data = jwtDecode(token);
      setValue(data);
      dispatch(setUser(data));
    };
    readToken();
    return () => setValue(null);
  }, []);
  if (value !== null) return value;
};
