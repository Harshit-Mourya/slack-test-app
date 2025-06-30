import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const SLACK_API_URL = process.env.SLACK_API_URL;
const SLACK_CHANNEL_ID = process.env.SLACK_CHANNEL_ID;
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;

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

    res.json(response.data);
  } catch (error) {
    console.error("Slack API error:", error.response?.data || error);
    res.status(500).json({ error: "Failed to send message!" });
  }
};

export const retrieveMessage = async (req, res) => {
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
};

export const editMessage = async (req, res) => {
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
};

export const deleteMessage = async (req, res) => {
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
};

export const scheduleMessage = async (req, res) => {
  try {
    const { text, postAt } = req.body;

    const response = await axios.post(
      `${SLACK_API_URL}/chat.scheduleMessage`,
      {
        channel: SLACK_CHANNEL_ID,
        text: text || "Scheduled message from backend",
        post_at: postAt,
      },
      {
        headers: {
          Authorization: `Bearer ${SLACK_BOT_TOKEN}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Slack API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to schedule message!" });
  }
};
