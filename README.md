# Vite boilerplate example with github actions and slack integration

*Instruction for this repository: * This repository contains project with base features for project start. Briefly you cna read about this features in README below, but if you need some instructions for each page with code, you can see closed pull requests.

## Project features
1. [Vite](https://vitejs.dev/guide/) start configurations for the project
2. [Slack](https://slack.github.com/) integration

## Vite instalation
1. Run the next command in folder, where you want to create a vite template. Where `.` sets directory for template, with `.`, it will create template in current directory. If you need to create a folder with template you can set folder name instead of `.`.
    ```
    npm create vite@latest . -- --template react-ts
    ```

## Slack integration

### Method 1 - integration with github application.
1. Create workspace in slack application
2. Instal Github application in slack workspace
3. Add slack application to github user to check all user repositories, or you can choose specific repo.
4. Create channel in slack for your review, and subscribe to github repos pull request, using command
    ```
    /github subscribe owner/repo
    ```
5. Remove unnecessary subscriptions
    ```
    /github unsubscribe owner/repo issues, commits, releases, deployments
    ```

**Note:** Documentation you can see [here](https://github.com/integrations/slack).

### Method 2 - integration using github workflows
First three steps are the same as for **Method 1**
1. Create workspace in slack application
2. Create an app in slack [here](https://api.slack.com/apps) and select created workspace.
3. Enable incoming hooks in slack application, full documentation you can see [here](https://api.slack.com/messaging/webhooks#advanced_message_formatting)
4. Add slack webhook secret to github secrets, instruction you can see [here](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
5. Create message for slack, syntax for messages you can see [here](https://api.slack.com/reference/surfaces/formatting)
    ```
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
    ```
6. Add sending of slack message in .yml file for guthub actions. In example below you also getting PR link
    ```
    - name: Get full PR link
            id: vars
            run: |
              PR_URL="${{ github.server_url }}"/"${{ github.repository }}"/pull/"${{ steps.prNumber.outputs.number }}"
              PR_NUMBER="${{ steps.prNumber.outputs.number }}"
              echo PR_NUMBER="$PR_NUMBER" >> "$GITHUB_OUTPUT"
              echo "PR_URL=$PR_URL" >> "$GITHUB_OUTPUT"
    
          - name: Alert on build
            env:
              SLACK_WEBHOOK_SECRET: ${{ secrets.SLACK_WEBHOOK_SECRET }}
              SLACK_MESSAGE: ":orc_worker: New request is ready to review <${{ steps.vars.outputs.PR_URL }}| *PR#${{ steps.vars.outputs.PR_NUMBER }}*>"
            run: ./.github/workflows/develop-slack-notify.sh
            shell: bash
    ```