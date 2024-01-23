# Vite boilerplate example

## Project features
1. [Vite](https://vitejs.dev/guide/) start configurations for the project
2. [Slack](https://slack.github.com/) integration

## Vite instalation
1. Run the next command in folder, where you want to create a vite template. Where `.` sets directory for template, with `.`, it will create template in current directory. If you need to create a folder with template you can set folder name instead of `.`.
    ```
    npm create vite@latest . -- --template react-ts
    ```

## Slack integration
1. Create workspace in slack application
2. Instal Github application in slack workspace
3. Add slack application to github user to check all user repositories, or you can choose specific repo.
4. Create channel in slack for your review, and subscribe to github repos pull request, using command
    ```
    /github subscribe owner/repo
    ```
5. Remove unnecessary subscribtions
    ```
    /github unsubscribe owner/repo issues, commits, releases, deployments
    ```