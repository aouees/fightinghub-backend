const multer = require('multer')
const storage = multer.diskStorage({
    destination: './public/images',
    filename: (req, file, cb) => {
        if (req.query.email) {
            n = file.originalname.split('.')
            ex = n[n.length - 1]
            cb(null, req.query.email + '.' + ex)
        }
        else {
            cb(new Error('no email in query'))
        }
    },

})
const imageFilter = (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        cb(null, true);
    }
    else {
        cb("Please upload only Image.", false);
    }
};
const upload = multer({ storage: storage, fileFilter: imageFilter })
module.exports = upload
