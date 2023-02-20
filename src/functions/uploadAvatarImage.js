import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/config";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const uploadAvatarImage = async (file, currentUser, setLoading) => {
  const fileRef = ref(storage, currentUser.uid + file.type);
  const docRef = doc(db, "users", currentUser.uid);

  setLoading(true);
  try {
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(currentUser, { photoURL });
    await updateDoc(docRef, {photoUrl: photoURL});
  } catch (e) {
    console.log(e);
  }
  setLoading(false);
};

export default uploadAvatarImage;
