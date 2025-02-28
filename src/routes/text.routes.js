import { Router } from "express";
import { jwtVerify } from "../middleware/auth.middleware.js";
import {  createTextFile,deleteTextFile,deleteVersion,getTextFile, versionTheFile } from "../controllers/text.controller.js";

const router = Router();
//text router
router.route('/createText').post(jwtVerify,createTextFile);
router.route('/getTextFiles').get(jwtVerify,getTextFile);
router.route('/versionText').post(jwtVerify,versionTheFile);
router.route('/deleteTextFile/:id').delete(jwtVerify,deleteTextFile);
router.route('/deleteVersion/:fileId/:versionId').delete(jwtVerify,deleteVersion);

export default router