#!/bin/bash

MESSAGE_BODY='{
          "blocks": [
            {
              "type": "section",
              "block_id": "1",
              "text": {
                  "type": "mrkdwn",
                  "text": "'"$SLACK_MESSAGE"'"
              }
            }
          ]
        }'

SLACK_URL=https://hooks.slack.com/services/$SLACK_WEBHOOK_SECRET

curl -X POST -H 'Content-type: application/json' --data "$MESSAGE_BODY" "$SLACK_URL"
