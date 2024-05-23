// creating router object using express's build in Router() method
const router = require("express").Router();

//importing out modular routes for departments
const departmentRouter = require("./department");
const employeeRouter = require("./employee");
const roleRouter = require("./role");

//using router middleware to handle routing functions
router.use("/department", departmentRouter);
router.use("/employee", employeeRouter);
router.use("/role", roleRouter);

//exporting the router
module.exports = router;
