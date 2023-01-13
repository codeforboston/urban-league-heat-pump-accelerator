Start Guide By Dat Nguyen email: datguy7@gmail.com

To run this Front-End only react application, you need VSCode IDE.
download here: https://code.visualstudio.com/

Clone main github repo from the main branch.
download here: https://github.com/codeforboston/urban-league-heat-pump-accelerator

After downloading the main github repo, you need to switch from the #main branch to the #frontend_main to see the latest frontend file.

To keep formatting the same for the front-end files, you must download the #prettier plugin (Prettier - Code formatter
) before you can submit code to the frontend branch. Keep the default prettier plugin settings.

Now that you're in the #frontend_main repo, navigate into the #frontend file and then navigate to the #front file. Inside the #front file, open a terminal (CLI) inside the #front file.

If this is your first time downloading the frontend_main repo, you will not have a node_modules with all the necessary packages.

We're using yarn instead of npm. Install yarn by typing this command in the terminal: npm install --global yarn

Now that you have yarn installed, to download the packages listed in package.json, you need to type this command into the terminal (make sure you're in your #front file): "yarn install".

After yarn install all the packages listed in package.json, you can now run the create-react-app program.

To run the create-react-app server in the #front file type this in your terminal: yarn start". You can access the react browser view at http://localhost:3000/.

If you already have previously download all the node_modules, open terminal in the #front file and type "yarn start" to run the create-react-app program.

We're using yarn instead of npm for package download and a few other functions. These are the common npm commands and their yarn equivalents.
-npm run = yarn start
-npm install "package" = yarn add "package"

- Github Branching and naming convention
  1. Now that you have download the github repo switch to the #frontend_main
  2. Create a new branch off #Frontend_main branch. Make sure you have the latest #frontend_main branch by pulling from remote github.
  3. Branch naming convention should be frontend-issue[#]-"description of the work"
  4. The first part of the name is frontend
  5. separate the firstname with a - and if there's a github issue add the word issue and its number. example frontend-issue23
  6. If there's no github issue just skip that part
  7. Lastly a short description of what you are working, example: frontend-issue23-fixing-react-bug-on-survey-page
  8. Try to include the file name in the description
  9. Another example without a github issue: frontend-adding-button-on-admin-profile-page
  10. Make sure you publish the new branch to github remote

Merging Working into #frontend_main

1. Always create a branch off #frontend_main to do your work.
2. After working on your branch make sure to sync your branch to the remote github, aka push your latest work on your local branch to the your remote branch on github
3. Go to pull request page: https://github.com/codeforboston/urban-league-heat-pump-accelerator/pulls
4. Click New pull request button.
5. In the compare drop down, select the branch you are currently want to merge into #frontend_main
6. In the base drop down, select #frontend_main.
7. And now click button Create pull request
8. Give the pull request an appropriate name and add #zevez as one of the reviewer.
9. Never push to directly to #frontend_main without a pull request.
10. Make sure to copy the pull request link and paste into the frontend slack page.
11. You can also contact Dat through slack to get your pull request review expedited.
12. After you pull request is approved, you can close any github issue related to the pull request.
13. Optionally, if you don't need the branch anymore, it should be delete.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
