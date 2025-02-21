const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        return data.secure_url; // URL của ảnh trên Cloudinary
    } catch (error) {
        throw new Error("Có lỗi xảy ra khi upload ảnh: " + error.message);
    }
};

export default upload;
