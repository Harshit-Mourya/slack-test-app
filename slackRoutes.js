const express = require("express");
const axios = require("axios");
const router = express.Router();

const SLACK_API_URL = process.env.SLACK_API_URL;

router.post("/send", async (req, res) => {
  try {
    // console.log(req.body);

    const { text } = req.body;

    // console.log(text);

    const response = await axios.post(
      `${SLACK_API_URL}/chat.postMessage`,
      {
        channel: process.env.SLACK_CHANNEL_ID,
        text: text || "Default message from backend",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          "Content-Type": "application/json;  charset=utf-8",
        },
      }
    );
    // console.log(response.data.message);

    res.json(response.data);
  } catch (error) {
    console.error("Slack API error:", error.response?.data || error);
    res.status(500).json({ error: "Failed to send message!" });
  }
});

router.get("/retrieve", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.SLACK_API_URL}/conversations.history`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
        },
        params: {
          channel: process.env.SLACK_CHANNEL_ID,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Slack API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to retrieve messages!" });
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { ts, text } = req.body;

    const response = await axios.post(
      `${SLACK_API_URL}/chat.update`,
      {
        channel: process.env.SLACK_CHANNEL_ID,
        ts,
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          "Content-Type": "application/json;  charset=utf-8",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Slack API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to edit message!" });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { ts } = req.body;

    const response = await axios.post(
      `${SLACK_API_URL}/chat.delete`,
      {
        channel: process.env.SLACK_CHANNEL_ID,
        ts,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          "Content-Type": "application/json;  charset=utf-8",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Slack API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to delete message!" });
  }
});

module.exports = router;
