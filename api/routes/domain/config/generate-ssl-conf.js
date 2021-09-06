const express = require('express');
const router = express.Router();
const fs = require('fs')
const createError = require('http-errors');


router.post('/', function(req, res, next) {
    //console.log(req.body.d)
    const domain = req.body.domain // indicates the domain
    const type = req.body.type // indicates the type of config to be used (proxy or loadbalancer)

    if (!domain && !type) {
        next(createError(406, 'Missing required data'));
        return;
    }



    if (type == "proxy") {
        if (!req.body.proxy_url) {
            next(createError(406, "Missing parameter data"));
            return;
        } else {
            // Check if proxyip is a valid http url
            // TODO
            const proxy_url = req.body.proxy_url;
        }
        fs.readFile("/etc/equilibrium/conf/template/proxy_ssl.conf", (err, data) => {
            if (err) {
                console.error(err);
                next(createError(500, "Error while processing your requesting"));
                return;
            }

            data = data.toString().replace(/<domain>/g, domain);
            data = data.toString().replace(/http:\/\/example.com/g, proxy_url);
            fs.writeFile('/etc/nginx/sites-available/' + domain + ".conf", data, err => {
                if (err) {
                    console.error(err)
                    next(createError(500, "Error while processing your requesting"))
                    return
                }
                res.status(200);
                res.send({"sucess": "sucess"})
            })
        });
    }

    
});

router.all('/', function(req, res, next) {
    //console.log(req.body.d)
    next(createError()) // Error for methods not suported
});

module.exports = router;