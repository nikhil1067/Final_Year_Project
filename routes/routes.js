const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');

const {
    getBootcamps,
    setBootcamps
} = require('../controllers/controllers.js')

app.use(bodyParser.json());

router
    .route('/request')
    .get(getBootcamps)
    .post(setBootcamps)

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/static/index.html'));
    });
    
    
    

module.exports = router;