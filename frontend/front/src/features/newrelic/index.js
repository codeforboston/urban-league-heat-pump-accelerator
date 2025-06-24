import { BrowserAgent } from "@newrelic/browser-agent/loaders/browser-agent";

export const isNewRelicEnabled = () => {
  return (
    process.env.REACT_APP_NR_ACCOUNT_ID &&
    process.env.REACT_APP_NR_LICENSE_KEY &&
    process.env.REACT_APP_NR_APP_ID
  );
};

let newrelic = null;
if (isNewRelicEnabled()) {
  const options = {
    init: {
      distributed_tracing: { enabled: true },
      privacy: { cookies_enabled: true },
      ajax: { deny_list: ["bam.nr-data.net"] },
    },

    loader_config: {
      accountID: process.env.REACT_APP_NR_ACCOUNT_ID,
      trustKey: process.env.REACT_APP_NR_ACCOUNT_ID,
      agentID: process.env.REACT_APP_NR_APP_ID,
      licenseKey: process.env.REACT_APP_NR_LICENSE_KEY,
      applicationID: process.env.REACT_APP_NR_APP_ID,
    },
    info: {
      beacon: "bam.nr-data.net",
      errorBeacon: "bam.nr-data.net",
      licenseKey: process.env.REACT_APP_NR_LICENSE_KEY,
      applicationID: process.env.REACT_APP_NR_APP_ID,
      sa: 1,
    },
  };
  newrelic = new BrowserAgent(options);
}

export const logSurveyPageVisit = () => {
  if (!newrelic) return;
  newrelic.addPageAction("surveyPageVisit");
};

export const logSurveySubmission = () => {
  if (!newrelic) return;
  newrelic.addPageAction("surveySubmission");
};

export const logLanguagePref = (language, source) => {
  if (!newrelic) return;
  newrelic.addPageAction("languagePreference", { language, source });
};
