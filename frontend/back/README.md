# Written by Dat Nguyen email: datguy7@gmail.com

# Mocked BackEnd with Node Express 
This is a mocked backend api with node express to simulate a server with RESTFUL api. I create this quick backend as a testing for frontend api calls to the backend. This will temperarly be used until the backend is integrate with the ruby on rails backend servers. 

This backend is not built with production code and security. You can run the server on your own computer and send api requests to the express server.


# To get started
1. Clone main github repo from the main branch.
  download here: https://github.com/codeforboston/urban-league-heat-pump-accelerator
2. Switch from the main branch to the #frontend_dat branch
3. You will see two folder in the folder #frontend: #back and #front
4. Open the terminal in the #back folder and type:"npm install" to download all the packages that is listed in the package.json file.
5. You will now see the #node_modules folder with all your packages installed.
6. The #index.js file has the code to start the express server. Just type:"npm node index.js" to run the index.js file and start the server.
7. You should see a console log of "Server is available at: http://localhost:8080" on your terminal. 
8. Your server is up and running and you can start sending RESTful api request to the server.

# Next steps
Now that the server is up and running, you can run the front end react server to pull data from the mock backend. Read the #front folder #README.md file to get the react server up.