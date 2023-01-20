# Data Model

## Current

This shows the current data model for the heat pump accelerator backend.

![Data model](figures/data-model.drawio.png)

Survey consist of a set of survey questions.

When a survey is administered, we create a survey response.
Each question that is answered has a survey answer,
which ties back both to the question and response object.

There is a home instance for all targeted homes.

When a surveyor goes to a home, we record a survey visit,
regardless of whether any survey was run
(e.g. due to the owner not being in).
This survey visit ties back to the surveyor and home.
If they were able to run the survey,
then the survey visit ties to the survey response,
and through that its answers.
