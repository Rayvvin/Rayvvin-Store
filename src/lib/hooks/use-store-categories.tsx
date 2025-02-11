import { useState, useEffect } from 'react';
import { getStoreCategories } from '@lib/data'; // Assuming you have an API function for fetching store-specific categories

function useStoreCategories(store) {
  const [storeCategories, setStoreCategories] = useState([]);
  const [storeCategoriesProds, setStoreCategoriesProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [store_id, setStore_id] = useState(store?.id)

  useEffect(() => {
    async function fetchStoreCategories() {
      try {
        const { categories, products } = await getStoreCategories(store_id, store);
        setStoreCategories(categories);
        setStoreCategoriesProds(products);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchStoreCategories();
  }, [store_id]);

  return { storeCategories, storeCategoriesProds, loading, error };
}

export default useStoreCategories;
