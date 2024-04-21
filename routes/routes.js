import express from "express";
import { cxFormUpload, signupUser, userLogin, findEmail, resetPassword } from "../controller/user-controller.js";
import { uploadImage } from '../controller/image-controller.js';
import { webhookController } from "../controller/webhook-controller.js";

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', userLogin);

router.post('/findEmail', findEmail);
router.post('/resetPassword', resetPassword);

router.post('/cxFormUpload', cxFormUpload);

// router.post('/file/upload', upload.single('/file'), uploadImage);

router.post('/webhook', webhookController)

export default router;