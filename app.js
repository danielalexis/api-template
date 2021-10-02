const createError = require('http-errors');
const express = require('express');
const walkSync = require('walk-sync');

const app = express();

//app.use(morgan('de v'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next){
  // Authentication Middleware
  // This will overwrite any other http error code including 404
  
  // Needs testing on if createError works here
  if (req.header('Authorization') == "API-KEY") {
    next();
  }
  else if (!req.header("Authorization")) {
    res.status(401);
    res.send({"code": 401, "error.message": "Unauthorized"});
    return;
  }  else {
    res.status(500);
    res.send({"code": 500, "error.message": "An error occurred While processing your request"});
    return;
  }

  
});


dir = "./routes/"
const paths = walkSync(dir, { directories: false }); //Express doesn't like async stuff
paths.forEach(function (value, index, array) {
  value = value.slice(0, -3); //removes .js, assuming all files are .js
  if (value == "index") {
    app.use("/", require(dir + value));
  } else {
    app.use("/" + value, require(dir + value));
  }
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;                                     //Not sure what does this do
  //res.locals.error = req.app.get('env') === 'development' ? err : {};   // This requires a view engine maybe?

  // render the error page
  res.status(err.status || 500);
  res.json({"code": err.status, "error.message":err.message});
});


module.exports = app;
