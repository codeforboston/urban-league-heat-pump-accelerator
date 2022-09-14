# Installation

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