const path = require('path');
const express = require('express');
const router = express.Router();
const multer  = require('multer');
const uuid = require('node-uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/' + file.fieldname));    // 保存的路径
    },
    filename: function (req, file, cb) {
        cb(null, uuid.v4() + path.extname(file.originalname));  
    }
});

const upload = multer({ storage: storage });

router.post('/avatar', upload.single('avatar'), (req, res) => {
    res.json({state: 'success', fileurl: '/avatar/' + req.file.filename});
});

module.exports = router;