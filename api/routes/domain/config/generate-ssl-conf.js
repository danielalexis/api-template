const express = require('express');
const router = express.Router();
const fs = require('fs')
const createError = require('http-errors');




router.post('/', function(req, res, next) {
    //console.log(req.body.d)
    if (!req.body.domain) {
        //res.json({"code": 406, "error.message": "Unauthorized"})
        next(createError(406, 'Missing data'))
        return
    }


    fs.readFile('conf/example_ssl.conf', (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        data = data.toString().replace(/<domain>/g, req.body.domain)
        
        fs.writeFile('conf/test.conf', data, err => {
            if (err) {
            console.error(err)
            return
            }
            //file written successfully
        })
        res.send(data)
    })
    
});

router.all('/', function(req, res, next) {
    //console.log(req.body.d)
    res.send("other method")
});

module.exports = router;