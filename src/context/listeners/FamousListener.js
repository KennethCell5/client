import { useEffect } from 'react';
import axios from 'axios';

export default function FamousListener(dispatch) {
  return useEffect(() => {
    axios
      .post('http://localhost:5000/get-famous')
      .then(response => {
        dispatch({ type: 'SET_STATE', data: response.data });
      })
      .catch(error => console.log(error));
  }, []);
}
