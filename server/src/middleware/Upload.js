const multer = require('multer');
const storage = multer.memoryStorage(); // We'll upload via buffer
const upload = multer({ storage });
module.exports = upload;
