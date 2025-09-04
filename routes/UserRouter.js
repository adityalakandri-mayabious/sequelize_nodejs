import express from 'express';
import { createUser, deleteUser, getUsers, getUsersById, test, updateUserById } from '../controllers/UserController.js';

const router = express.Router();

router.post('/create-user',createUser);
router.get('/get-users',getUsers);
router.get('/get-user-by-id/:userId',getUsersById);
router.put('/update-user/:userId',updateUserById);
router.delete('/delete-user/:userId',deleteUser);
router.get('/test',test)



export default router;