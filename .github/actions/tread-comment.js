// const core = require('@actions/core');
// import fetch from "node-fetch";
import { SLACK_API_URL } from "./constants.js";
import { WebClient } from "@slack/web-api";
import github from "@actions/github";

export async function sendComment(slackApiToken) {
  // const SLACK_API_TOKEN = process.env.SLACK_API_TOKEN;
  const { context } = github;
  // console.log("SLACK_API_TOKEN", slackApiToken);
  // console.log("SLACK TOKEN ENV", process.env.SLACK_API_TOKEN);
  const web = new WebClient(slackApiToken);
  // console.log("github", github);

  const isReviewSubmitted = context.eventName === "pull_request";
  // context.eventName === "pull_request_review" &&
  // context.payload.action === "submitted";

  if (isReviewSubmitted) {
    const { pull_request } = github.context.payload;
    // console.log("reviewPRData", pull_request);

    const prSlackMessageResponse = await web.search.messages({
      query: `PR#${pull_request.number}`,
    });
    const prSlackMessage = prSlackMessageResponse.messages.matches[0];
    console.log("prSlackMessageResponse", prSlackMessageResponse);
    console.log("prSlackMessage", prSlackMessage);

    if (prSlackMessage) {
      try {
        await web.chat.postMessage({
          thread_ts: prSlackMessage.ts,
          text: 'Hello in thread'
        })
      } catch (e) {
        console.log('Caught error: ', e)
      }
    }
  }

  // const prSlackMessage = await fetch(
  //   `${SLACK_API_URL}/search.messages?query=PR%2314&pretty=1`,
  //   {
  //     method: "POST",
  //     headers: new Headers({
  //       Authorization: `Bearer ${SLACK_API_TOKEN}`,
  //     }),
  //   }
  // );
  // method: 'post',
  //   headers: new Headers({
  //       'Authorization': 'Basic '+btoa('username:password'),
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //   }),
}
