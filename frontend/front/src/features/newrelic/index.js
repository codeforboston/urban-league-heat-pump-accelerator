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

export const logSurveyPageVisit = (language) => {
  if (!newrelic) return;
  newrelic.addPageAction("surveyPageVisit", {
    language,
  });
};

export const logSurveySubmission = (language) => {
  if (!newrelic) return;
  newrelic.addPageAction("surveySubmission", {
    language,
  });
};

export const logLanguagePref = (language, source) => {
  if (!newrelic) return;
  newrelic.addPageAction("languagePreference", { language, source });
};
