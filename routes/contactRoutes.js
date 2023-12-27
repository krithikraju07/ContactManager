const express = require("express");
const router = express.Router();
const {getContacts,updateContact,createContact,deleteContactt, getContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken)
router.route("/").get(getContacts).post(createContact)

router.route("/:id").put(updateContact).get(getContact).delete(deleteContactt)


module.exports = router;