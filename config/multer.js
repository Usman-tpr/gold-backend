const multer = require('multer');

// Store files in memory instead of the file system
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

module.exports = upload;
