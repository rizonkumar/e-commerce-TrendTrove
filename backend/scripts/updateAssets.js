import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateAssets() {
  const assetsPath = path.join(__dirname, "..", "assets");
  const assetsFilePath = path.join(assetsPath, "assets.js");

  try {
    // Read the assets.js file
    let content = await fs.readFile(assetsFilePath, "utf8");

    // Get all image files in the assets directory
    const files = await fs.readdir(assetsPath);
    const imageFiles = files.filter(
      (file) =>
        file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg")
    );

    // Create a set of image file names (without extension)
    const imageSet = new Set(
      imageFiles.map((file) => path.basename(file, path.extname(file)))
    );

    // Replace image arrays in the content
    const regex = /image:\s*\[([\s\S]*?)\]/g;
    content = content.replace(regex, (match, group) => {
      const images = group.split(",").map((img) => img.trim());
      const updatedImages = images.map((img) => {
        // If the image (without quotes) is in our set, we wrap it in quotes
        if (imageSet.has(img.replace(/['"]/g, ""))) {
          return `"${img.replace(/['"]/g, "")}"`; // Remove existing quotes and add new ones
        }
        return img; // Keep as is if not found (might already be correctly formatted)
      });
      return `image: [${updatedImages.join(", ")}]`;
    });

    // Write the updated content back to assets.js
    await fs.writeFile(assetsFilePath, content, "utf8");

    console.log("assets.js has been updated successfully.");
  } catch (error) {
    console.error("Error updating assets.js:", error);
  }
}

updateAssets();
