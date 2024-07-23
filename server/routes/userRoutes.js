// const express = require('express');
// const router = express.Router();
// const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUsersByCompanyTag } = require('../controllers/userController');

// router.get('/', getAllUsers);
// router.get('/:id', getUserById);
// router.post('/', createUser);
// router.put('/:id', updateUser);
// router.delete('/:id', deleteUser);
// router.get('/company/:company_tag', getUsersByCompanyTag); // New route

// module.exports = router;

const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUsersByCompanyTag, updateUserPassword } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/company/:company_tag', getUsersByCompanyTag);
router.put('/:id/password', updateUserPassword); 

module.exports = router;
