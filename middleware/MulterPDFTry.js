import multer from 'multer'
const multerConfig = multer.diskStorage({
   destination: (req, res, callback) => {
     callback(null,'public/pdf');
   },
   filename: (req, file, callback) => {
     const ext = file.mimetype.split("/")[1];
     callback(null, `pdf-try-${Date.now()}.${ext}`);
   },
 });
const uploadPDF_TRY = multer({
   storage: multerConfig,
});

export default uploadPDF_TRY