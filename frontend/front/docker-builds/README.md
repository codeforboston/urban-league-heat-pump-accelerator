From Randy DAbbraccio 7.1.2023
###

There are two options here: A)run the provided Docker container or B) Build a new frontend and build a new Docker container.

For A) 




For B)

This is for a Linux system thus far and Docker, Node.js, and Yarn (package manager) will need to be installed prior.

Steps:

Git a new repo of the project or use your finished local code

Goto /frontent/front and run 'yarn install' (if newly downloaded)

Run 'npm run build' to make a production version

Goto new /build folder

Move the Dockerfile from this folder '/docker-builds into the new /front/build folder

Run command 'docker build .' in the /front/build folder where the Dockerfile is located

It should return a message like : 'Successfully built b38edc2a3e'. Note the IMAGE ID e.g. b38edc2a3e

Run command 'docker run -p 3001:80 b38edc2a3e' with your newly built IMAGE ID.

Open browser with 'localhost:3001' and it should come up. Make sure your backend server is up too :)

Optional: to see if the production build was good you can run 'serve -s build' after the build and take note of the localhost PORT it provides. Try it in your browser.