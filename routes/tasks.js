var express     = require("express");
var router      = express.Router();
var helpers     = require("../helpers/tasks");

router.route("/")
    .get(helpers.getTasks)
    .post(helpers.createTask)

router.route("/:taskId")
    .get(helpers.getTask)
    .put(helpers.updateTask)
    .delete(helpers.deleteTask)

module.exports = router;