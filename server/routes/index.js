var express = require('express');
var router = express.Router();
var taskRouter = require('./task.route');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Express' });
});

router.use('/tasks', taskRouter)

module.exports = router;
