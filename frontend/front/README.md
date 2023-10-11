# Start Guide By Dat Nguyen email: datguy7@gmail.com

To run this Front-End only react application, you need VSCode IDE.
Download here: https://code.visualstudio.com/

Clone main github repo from the main branch.
download here: https://github.com/codeforboston/urban-league-heat-pump-accelerator

To keep formatting the same for the front-end files, you must download the `prettier` plugin (Prettier - Code formatter) before you can submit code to the frontend branch. The plugin will pick up on the `.prettierrc` file in the project.

Now that you're in the repo, navigate into the `/frontend/front` directory. Open a terminal in the `front` directory.

If this is your first time downloading the repo, you will not have a your packages installed.

We're using yarn instead of npm. Install yarn by typing this command in the terminal: `npm install --global yarn`

Now that you have yarn installed, to download the packages listed in `package.json`, you need to type this command into the terminal (make sure you're in your `front/` directory): `yarn install`.

After `yarn install` all the packages listed in `package.json`, you can now run the create-react-app program.

To run the create-react-app server, in the `front/` directory, type this in your terminal: `yarn start`. You can access the react browser view at http://localhost:3000/.

We're using yarn instead of npm for package download and a few other functions. These are the common npm commands and their yarn equivalents.

- `npm run "script"` = `yarn "script"`
- `npm install "package"` = `yarn add "package"`

## Running the back-end

The front-end website requires you to have the server running locally in order to fully work. The back-end code is located in `/backend`. The easiest way to run the back end is using Docker, so here's what that looks like:

1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Start Docker Desktop
3. In the `backend/` directory, create a file called `.env`. Copy the contents of `.env.example` in there.
4. Run the command `docker compose up` from a terminal.

If everything goes according to plan, you will have two Docker containers running, one with a Postgresql database and one with the Rails server code running.

If you would rather run Rails and Postgres directly on your machine, see the back-end setup docs at [/backend/docs/installation.md](../../backend/docs/installation.md).

We also have a dummy json-server located at `/frontend/jsonserver`. However, it's fairly out of date and authentication is not totally supported.

## Github Branching and naming convention

1. Create a new branch off `main` branch. Make sure you have the latest `main` branch by pulling from remote github.
2. Include your github username and the github issue number (if applicable) in your branch name.
3. Make sure you publish the new branch to github remote

## Merging Working into `main`

1. Always create a branch off `main` to do your work.
2. After working on your branch make sure to sync your branch to the remote github, aka push your latest work on your local branch to the your remote branch on github
3. Go to pull request page: https://github.com/codeforboston/urban-league-heat-pump-accelerator/pulls
4. Click New pull request button.
5. In the compare drop down, select the branch you are currently want to merge into `main`
6. In the base drop down, select `main`.
7. And now click button Create pull request
8. Give the pull request an appropriate name and add another contributor (try @mattdelsordo) as one of the reviewers.
9. Never push to directly to `main` without a pull request!!
10. Make sure to copy the pull request link and paste into the frontend slack page so that folks notice.
11. After your pull request is approved, you can merge it and close any github issue related to the pull request.

## Building Docker Image for Mass Open Cloud

Assuming you are pushing to the Docker registry for mzagaja, you should do:

```sh
docker build --platform linux/amd64 --build-arg REACT_APP_API_URL=http://api.bostonhpa.org -t mzagaja/bhpa-frontend:latest --push .
```

---

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
