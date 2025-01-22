// utils/convertImage.ts
import axios from "axios";

export const convertImage = async (imageUrl: string): Promise<string | null> => {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data).toString("base64");
    return base64Image;
  } catch (error) {
    console.error("Error converting image:", error);
    return null;
  }
};
