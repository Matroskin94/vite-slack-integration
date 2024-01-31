// const core = require('@actions/core');
// import fetch from "node-fetch";
import { SLACK_API_URL } from "./constants.js";

export async function sendComment() {
  const SLACK_API_TOKEN = process.env.SLACK_WEBHOOK_SECRET;
  console.log("SLACK_API_TOKEN", SLACK_API_TOKEN);
  console.log("SLACK_API_URL", SLACK_API_URL);

  const prSlackMessage = await fetch(
    `${SLACK_API_URL}/search.messages?query=PR%2314&pretty=1`,
    {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer xoxp-6498715244663-6510338291365-6545305901367-3d09253b000f90bea3449f4ede96d05f`,
      }),
    }
  );
  // method: 'post',
  //   headers: new Headers({
  //       'Authorization': 'Basic '+btoa('username:password'),
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //   }),
  prSlackMessage.json().then((resp) => {
    console.log("RSPONSE JSON:::: ", resp);
  });
}

sendComment();
