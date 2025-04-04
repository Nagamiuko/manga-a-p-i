import multer from "multer";
const multerConfig = multer.memoryStorage();
const upload = multer({
  storage: multerConfig,
});

export default upload;
