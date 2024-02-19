import { WebClient } from "@slack/web-api";
import github from "@actions/github";

// TODO: Script needs fixes, now message sends from specific user, but this thread messages
// should be written by slack bot

export async function sendComment(slackApiToken) {
  const { context } = github;
  const web = new WebClient(slackApiToken);

  const isReviewSubmitted =
    context.eventName === "pull_request_review" &&
    context.payload.action === "submitted";

  if (isReviewSubmitted) {
    const { pull_request } = github.context.payload;

    const prSlackMessageResponse = await web.search.messages({
      query: `PR#${pull_request.number}`,
    });
    const prSlackMessage = prSlackMessageResponse.messages.matches[0];

    if (prSlackMessage) {
      try {
        await web.chat.postMessage({
          thread_ts: prSlackMessage.ts,
          channel: 'review',
          text: "Your PR reviewed",
        });
      } catch (e) {
        console.log("Caught error: ", e);
      }
    }
  }
}
