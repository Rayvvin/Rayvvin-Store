import { getStores } from '@lib/data';
import React, { useState, useEffect } from 'react';



function useStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStores() {
      try {
        const { stores } = await getStores();
        setStores(stores);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchStores();
  }, []);

  return { stores, loading, error };
}


export default useStores;