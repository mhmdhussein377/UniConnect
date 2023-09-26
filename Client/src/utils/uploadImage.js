import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { imageDB } from "./FirebaseConfig";

export const handleImageUpload = async(image, imageKey) => {
    if (image) {
        try {
            const imgRef = ref(imageDB, `files/${v4()}`);
            const snapshot = await uploadBytes(imgRef, image);
            const downloadURL = await getDownloadURL(snapshot.ref);
            return downloadURL
        } catch (error) {
            console.log(`Error uploading ${imageKey} image: `, error);
        }
    }
};