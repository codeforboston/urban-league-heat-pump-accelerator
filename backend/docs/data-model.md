# Data Model

## Current

This shows the current data model for the heat pump accelerator backend.

![Data model](figures/data-model.drawio.png)

A survey consists of a set of survey questions.

When a survey is administered, we create a survey response.
Each question that is answered has a survey answer,
which ties back both to the question and response object.

There is a home record for each targeted home.

When a surveyor goes to a home, we record a survey visit,
regardless of whether any survey was run
(e.g. due to the owner not being in).
This survey visit ties back to the surveyor and home.
If they were able to run the survey,
then the survey visit ties to the survey response,
and through that its answers.

Surveyors do not visit houses in isolation.
The data analysis team is working to identify homes
which might benefit from heatpumps.
These are grouped geographically,
so that nearby properties can be visited together.
These groups are represented by the assignment type.
Homes optionally can have an assignment.
The assignment in turn is associated with a single surveyor.
When a surveyor visits a house that is in one of their assignments,
a survey_visit is created.

In the event that a surveyor is no longer available,
any assignments they have can be set to alternative surveyors.
All visits that the original surveyor made up to that time
are still recorded as survey_visits.

## Possible future changes

* How many concurrent surveys will there be?
  If this will always be one, that's fine.
  However, the current data model supports multiple.
  Would these need coordinating at all?
