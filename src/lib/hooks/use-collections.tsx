// import { useState, useEffect } from 'react';
// import { getCollectionsList } from '@lib/data';

// function useCollections() {
//   const [collections, setCollections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchCollections() {
//       try {
//         const { collections } = await getCollectionsList();
//         setCollections(collections);
//         setLoading(false);
//       } catch (error: any) {
//         setError(error.message);
//         setLoading(false);
//       }
//     }

//     fetchCollections();
//   }, []);

//   return { collections, loading, error };
// }

// export default useCollections;
