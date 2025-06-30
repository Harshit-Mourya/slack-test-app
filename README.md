# Slack API Assignment

This project is a simple Node.js Express server that interacts with the Slack API to perform basic messaging operations such as sending, retrieving, editing, deleting, and scheduling messages.

## Features

- Send a message to a Slack channel
- Retrieve previously sent messages
- Edit a sent message
- Delete a sent message
- Schedule a message to be sent at a later time

## Tech Stack

- Node.js
- Express.js
- Axios
- Dotenv

## Prerequisites

1. Node.js installed
2. Slack App created with appropriate permissions
3. `.env` file with the following:

```env
PORT=5000
SLACK_BOT_TOKEN=your_bot_token_here
SLACK_CHANNEL_ID=your_channel_id_here
SLACK_API_URL=https://slack.com/api
```

## Install Dependencies

```bash
npm install
```

## Run the Server

```bash
node index.js
```

## API Endpoints

### 1. Send Message

- `POST /slack/send`
- Body:

```json
{
  "text": "Your message here"
}
```

### 2. Retrieve Messages

- `GET /slack/retrieve`

### 3. Edit Message

- `POST /slack/edit`
- Body:

```json
{
  "ts": "message_timestamp",
  "text": "Updated message text"
}
```

### 4. Delete Message

- `POST /slack/delete`
- Body:

```json
{
  "ts": "message_timestamp"
}
```

### 5. Schedule Message

- `POST /slack/schedule`
- Body:

```json
{
  "text": "This is a scheduled message",
  "postAt": 1751383560
}
```

## Slack Scopes Used

- `chat:write`
- `chat:write.public`
- `chat:write.customize`
- `channels:read`
- `channels:history`
- `groups:history`
- `mpim:history`
- `im:history`

## Notes

- Ensure your bot is added to the channel before sending or editing messages.
- You can use websites like [https://www.epochconverter.com/](https://www.epochconverter.com/) to convert timestamps.
- The `ts` field used in edit/delete refers to the Slack message timestamp.

## Author

Harshit Mourya
