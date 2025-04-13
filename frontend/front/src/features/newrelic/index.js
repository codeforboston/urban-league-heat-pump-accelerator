import { BrowserAgent } from "@newrelic/browser-agent/loaders/browser-agent";

export const isNewRelicEnabled = () => {
  return (
    process.env.REACT_APP_NEW_RELIC_INIT &&
    process.env.REACT_APP_NEW_RELIC_INFO &&
    process.env.REACT_APP_NEW_RELIC_LOADER_CONFIG
  );
};

let newrelic = null;
if (isNewRelicEnabled()) {
  const options = {
    init: JSON.parse(process.env.REACT_APP_NEW_RELIC_INIT),
    info: JSON.parse(process.env.REACT_APP_NEW_RELIC_INFO),
    loader_config: JSON.parse(process.env.REACT_APP_NEW_RELIC_LOADER_CONFIG),
  };
  newrelic = new BrowserAgent(options);
}

export const logSurveyPageVisit = () => {
  if (!newrelic) return;
  newrelic.addPageAction("surveyPageVisit-dev");
};

export const logSurveySubmission = () => {
  if (!newrelic) return;
  newrelic.addPageAction("surveySubmission-dev");
};
