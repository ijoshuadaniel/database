import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CallApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const fetchData = async (url, method, data) => {
    const response = await axios(url, {
      method,
      data,
    });
    if (response.data.error) {
      return setError(true);
    }
    setData(response.data);
    return response.data;
  };

  return {
    fetchData,
    error,
    data,
  };
};

export default CallApi;
