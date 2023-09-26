export const hanldeImagetoBase64 = (image) => {
    if (image) {
        function getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        }
        // setInput(e.target.files[0]);
        getBase64(image).then(async(data) => {
            return data
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            // console.log(reader.result);
        };
        reader.readAsDataURL(image);
    }
};
