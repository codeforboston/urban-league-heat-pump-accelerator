# Contributing

1. Fork and clone your fork of the GitHub repository
2. If you need a git cheat sheet, here's a [source](https://about.gitlab.com/images/press/git-cheat-sheet.pdf)
3. Check out a branch
    ```bash
   git checkout -b ${BRANCH_NAME}
    ```
4. Make your changes
5. Execute Tests
    ```bash
   sudo service postgresql start \
   && bundle exec rails db:create \
   && bundle exec rails db:migrate \
   && bundle exec rails db:schema:load \
   && bundle exec rspec
   ```
6. If you want to run the server:
   ```bash
   bundle exec rails server
   ```
7. `git add`, `git commit`, and `git push` your code to your branch
8. Open a pull request to the main repository
