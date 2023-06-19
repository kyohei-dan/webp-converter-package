const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

class ImageFileConverter {
  constructor(config) {
    this.files = [];
    this.webpOption = {};
    this.config = config || [];
    this.searchComplete = false;
    this.convertComplete = false;
    this.run();
  }

  async run() {
    for (const config of this.config) {
      await this.convert(config);
    }
  }

  async search(dirPath, searchExtList) {
    const allDirents = await fs.readdir(dirPath, { withFileTypes: true });
    for (const dirent of allDirents) {
      if (dirent.isDirectory()) {
        const newDirPath = path.join(dirPath, dirent.name);
        const searcher = new ImageFileConverter([{ dirPath: newDirPath, format: searchExtList, quality: this.webpOption.quality }]);
        const newFiles = await searcher.search(newDirPath, searchExtList);
        this.files.push(...newFiles);
      }
      if (dirent.isFile() && searchExtList.includes(path.extname(dirent.name))) {
        this.files.push({
          dirName: path.join(dirPath),
          fileName: dirent.name,
          ext: path.extname(dirent.name),
        });
      }
    }
    this.searchComplete = true;
    return this.files;
  }

  async convert({ dirPath, format, quality }) {
    if (!dirPath) {
      throw new Error("dirPath is not specified");
    }

    if (!format) {
      throw new Error("format is not specified");
    }

    if (!quality) {
      this.webpOption.quality = 80;
    }

    if (!this.searchComplete) {
      await this.search(dirPath, format);
    }

    for (const { dirName, fileName, ext } of this.files) {
      switch (ext) {
        case ".jpeg":
        case ".jpg":
          this.webpOption.quality = quality || this.webpOption.quality || 80;
          break;
        case ".png":
          this.webpOption.nearLossless = this.webpOption.nearLossless || true;
          break;
      }

      await sharp(`./${dirName}/${fileName}`)
        .webp(this.webpOption)
        .toFile(`./${dirName}/${fileName.split(".")[0]}${ext}.webp`);
    }
    this.convertComplete = true;
  }
}

module.exports = ImageFileConverter;
