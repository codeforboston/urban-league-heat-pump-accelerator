From Randy DAbbraccio 7.16.2023
###

! This is for a Linux system thus far! Docker, Node.js, and Yarn (package manager) will need to be installed prior.

Steps:

Git a new repo of the project or use your finished local code

Goto /frontend/front and run 'yarn install' (if newly downloaded)

Goto .../frontend/front/docker-builds folder

Run file with './build_start.sh'  (this was written in Linux using BASH shell and needs 'execute' permission).
It should create a new production build using npm, then create a new Docker container
and run it.

Open browser with 'localhost:3001' and it should come up. Make sure your backend server is up too :) 


###

Optional: to see if the production build was good you can run 'serve -s build' after the build and take note of the localhost PORT it provides. Try it in your browser.


See whats running in docker with 'docker ps'
Stop docker container with 'docker stop containername'
