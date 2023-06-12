import ImageFileConverter from "./webp.js";

(async () => {
  new ImageFileConverter([
    {
      dirPath: "./assets/images",
      format: [".jpg", ".jpeg", ".png"],
      quality: 80,
    },
  ]);
})();
