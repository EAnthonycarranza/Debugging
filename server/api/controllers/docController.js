const multer = require('multer');
const Document = require('../models/Document');

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('document');

exports.uploadDocument = (req, res) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    const newDocument = new Document({
      user: req.user.id,
      fileName: req.file.filename,
      filePath: req.file.path,
    });
    newDocument.save().then(document => res.json(document));
  });
};
