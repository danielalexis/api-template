const express = require('express');
const router = express.Router();
const fs = require('fs')

/* GET home page. */
fs.readFile('package.json', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  pkg_info = JSON.parse(data);

})

router.get('/', function(req, res, next) {
  //  Does "build" in package.json not break anything?
  //  IDK but I' guessing eventually we're gonna find out
  res.json(
  {
    "version": pkg_info.version,
    "build": pkg_info.build
  }
  );
});

module.exports = router;