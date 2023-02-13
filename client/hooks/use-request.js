import { useState } from 'react'
import axios from 'axios'

const useRequest = ( { url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  // it might have props like token's id passing into this function 
  const doRequest = async (props={}) => {
    try {
      setErrors(null); // clear previous entry
      const response = await axios[method](url, { ...body, ...props });
        // include whatever body and props 
      
      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops....</h4>
          <ul className="my-0">
            {err.response.data.errors.map(err => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
}

export default useRequest