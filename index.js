const express = require('express');
const app = express();
const port = 8080;
const photo = "/photos"
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

// enabling fileupload middleware
app.use(fileUpload({
    createParentPath: true
}));

// enable other middleware
//add other middleware
app.use(cors());
app.use(express.static('photos'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })




  app.post('/upload', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            // get the photo
            let photo = req.files.photo;
            
            // put photo in photos dir
            photo.mv('./photos/' + photo.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});