import express from "express";
import {
  sendMessage,
  retrieveMessage,
  editMessage,
  deleteMessage,
  scheduleMessage,
} from "../controllers/slackController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/retrieve", retrieveMessage);
router.post("/edit", editMessage);
router.post("/delete", deleteMessage);
router.post("/schedule", scheduleMessage);

export default router;
