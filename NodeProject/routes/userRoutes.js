const express =require("express");
const router=express.Router();
const userController = require("../controllers/userController");


router.get('/getAll', userController.getAllUsers);
router.post('/addUser', userController.createUser);
router.put('/updateUser/:userId', userController.updateProfile);
router.get('/getUser/:id', userController.getUserById);
router.delete('/deleteUser/:id', userController.deleteUser);
router.get('/getRole/:role', userController.getUserByRole);
router.put('/updatePass', userController.changePassword);





module.exports = router;