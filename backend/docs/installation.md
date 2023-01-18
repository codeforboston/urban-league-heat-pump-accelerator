# Installation

The recommended setup is to use the dev container rather than installing things to your local environment. The dev container setup will ensure you have the same setup as others using docker.

## Dev Container

There are two ways to run dev containers, in browser via Github codespaces (easiest) or locally via docker and vscode.

### Github Codespaces

1. Head over to the repo on Github: https://github.com/codeforboston/urban-league-heat-pump-accelerator
2. Locate the Code dropdown, open the Codespaces tab
   1. Hit the + to create a new Codespace. This will open-up vscode in browser and you'll be able to start contributing!

### Local Dev Containers

1. Clone the project
    ```bash
   git clone git@github.com:codeforboston/urban-league-heat-pump-accelerator.git
   ```
2. Install docker: https://docs.docker.com/engine/install/
   1. Run docker once the install is complete
3. Install vscode: https://code.visualstudio.com/Download
4. Open vscode and add extensions! Install "Dev Containers"

## Local Install

1. Fork project on GitHub
2. Clone project
    ```bash
   git clone git@github.com:${YOUR_GITHUB_USER}/urban-league-heat-pump-accelerator.git
   ```
3. Install postgres libraries
   1. MacOS
        ```bash
      brew install libpq
      ```
   2. Linux (Ubuntu)
        ```bash
      sudo apt-get install libpq-dev
      ```
4. Install Postgres
   1. MacOS
         ```bash
      brew install postgresql \
      && sudo -u postgres createuser -d $(whoami) \
      && createdb $(whoami) \
      && postgres -D /usr/local/var/postgres  # start as daemon to retain terminal
      ```
   2. Linux (Ubuntu)
         ```bash
      sudo apt install postgresql postgresql-contrib \
      && sudo -u postgres createuser -d $(whoami) \
      && createdb $(whoami) \
      && sudo service postgresql start
      ```
5. Install rbenv
   1. MacOS
        ```bash
      brew install rbenv ruby-build \
      && rbenv init \
      && source ~/.zshrc \
      && curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash
      ```
   2. Linux (Ubuntu)
        ```bash
      sudo apt-get install rbenv \
      && rbenv init \
      && source ~/.bashrc \
      && curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash
      ```
6. Install Ruby
    ```bash
        cd urban-league-heat-pump-accelerator \
        && rbenv install \
        && gem install bundler        
      ```
7. Install the backend
   ```bash
    cd backend && bin/setup
    ```