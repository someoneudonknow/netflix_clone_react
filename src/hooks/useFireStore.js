import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

const useFireStore = (coll, condition) => {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    if(!condition) return;
    (async () => {
      const q = query(
        collection(db, coll),
        where(condition.fieldName, condition.operator, condition.value)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = {
            ...doc.data(),
            docId: doc.id
        }
        setDocument(data)
      });
    })();
  }, [coll, condition]);

  return document;
};

export default useFireStore;
