import axios from 'axios'

export const uploadImage = async (image:any) => {
  const formData = new FormData();
  formData.append("file", image);
    formData.append('upload_preset', 'fetovrfe');
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/dr2hks7gt/image/upload`,
      formData
    );
  return data?.secure_url;
};