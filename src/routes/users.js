const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, addUsers} = require('../controller/user')

router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.post('/addusers', addUsers)


module.exports = router;
