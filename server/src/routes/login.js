import express from "express";
import LoginController from '../app/controllers/LoginController.js'

const router = express.Router();

router.post('/', LoginController.login);

export default router;




