import express from 'express';
import UserController from '../app/controllers/UserController.js'

const router = express.Router();
router.get('/:id', UserController.getUserById);

router.get('/', UserController.getAllUser)

router.put('/:id', UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

export default router;