# Urban League Heat Pump Accelerator Project

Technical support for the Urban League of Eastern Massachusetts ([ULEM](https://www.ulem.org/)) and the Heat Smart Alliance ([HSA]) to canvass owners of properties in Boston likely to benefit from heat-pump retrofits, tax credits, and installation support.
[Code for Boston](https://www.codeforboston.org/)'s work includes 5 streams:

* [`data-analysis`](/data-analysis/) identifying properties likely to benefit from heat pumps
* [`backend`](/backend/) building a database of such properties
* [`frontend`](/frontend/) developing an app to allow canvassers to view property information
* [`partnerships`](/partnerships/) contacting organizations that could apply this approach to their local area
* [`marketing`](/marketing/) sharing project work + outcomes


## How to contribute
* Watch the [Orientation Video](https://www.youtube.com/watch?v=xSDioDavOsw)
* Join [the Slack](https://communityinviter.com/apps/cfb-public/default-badge) channel `#urban-league-heat-pump-accelerator`
* Join [us](https://www.meetup.com/Code-for-Boston/) on Tuesdays, 7-9p Eastern Time
    + Zoom all weeks
    + Cambridge 1-2 Tuesdays per month
* Identify and solve [issues](https://github.com/codeforboston/urban-league-heat-pump-accelerator/issues) (great way to contribute now without skills in specific technologies!)
* Join a team

| Slack channel                     | technologies used            |
|-----------------------------------|------------------------------|
| #urban-league-data-analysis       | Python, Jupyter              |
| #urban-league-backend | Rails (Ruby 3.1.3), Postgres |
| #urban-league-app-design-frontend | React.js                     |
| #urban-league-partnerships        | *none (yet)*                 |
| #urban-league-marketing           | *none (yet)*                 |


## Using the Backend with GitHub Codespaces
Start the GitHub Codespace from GitHub's web interface by clicking the green "Code" button and choosing "+" next to codespaces. If this is not available to you, you probably need to be added to the Code for Boston GitHub Organization.

The Ruby app should set itself up pretty much on its own. Ignore any messages containing `rvm` in them. We do not use `rvm`.

However to get things going, you should do the following in the terminal in VSCode:

```ruby
cd backend
bundle exec rails db:prepare
bundle exec rake db:seed # Imports the test data
bundle exec rails s # starts the rails server
```
*Do not use the built-in VSCode simple browser that starts up, it does not seem to be able to display raw JSON*

After this you can visit in your regular web browser http://localhost:3000/assignments.json for assignments and the following URLs to see JSON samples as the backend provides them:

* /homes.json
* /surveyors.json
* /surveys.json
* /survey_responses.json
* /survey_questions.json

## Weekly Surveyor Report

The application can generate and email a weekly surveyor activity report showing start and end times for each surveyor for each day of the week.

### Running the Report Manually

To generate and send the weekly report for the previous week (Sunday-Saturday):

```bash
cd backend
bundle exec rake reports:send_weekly_surveyor_report
```

### Setting Up Automatic Weekly Reports

To automatically send the report every Monday at 9 AM, add the following cron job:

```bash
0 9 * * 1 cd /path/to/urban-league-heat-pump-accelerator/backend && bundle exec rake reports:send_weekly_surveyor_report
```

Replace `/path/to/urban-league-heat-pump-accelerator/backend` with the actual path to your backend directory.

To edit your crontab:
```bash
crontab -e
```

### Report Format

The report is sent as a CSV attachment to `help@bostonhpa.org` (configurable in the mailer). It includes:
- Surveyor names
- Start and end times for each day (Sunday-Saturday)
- ✅ indicator for "on time" entries:
  - Start time: before 4:24 PM
  - End time: after 6:40 PM, OR all homes in the assignment(s) worked that day have been visited
- Actual timestamps when not on time

## Frontend setup

See the README.md at [./frontend/front](./frontend/front) for notes on running the frontend code.