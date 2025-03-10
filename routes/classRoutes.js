// routes/classRoutes.js
import { Router } from "express";
const router = Router();
import multer from "multer";
const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage });

import { getClassesForUser, createClass, getClassWithForms, deleteClass } from "../controllers/classController.js";

// Get all classes for the authenticated User
router.get("/my-classes",  getClassesForUser);

// Ensure that upload.single('file') is used so that:
// - The file field with key "file" is processed and available as req.file
// - All other form-data fields are parsed and available in req.body
router.post("/", upload.single("file"), createClass);

// Get a class (with its associated Google Forms)
router.get("/:classId", getClassWithForms);
router.delete("/delete/:classId", deleteClass);
export default router;
