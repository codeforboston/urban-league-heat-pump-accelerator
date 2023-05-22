import { useCallback, useEffect } from "react";

export const RECAPTCHA_ACTION_PUBLIC_SURVEY = "publicsurvey";
const RECAPTCHA_SCRIPT_ID = "RECAPTCHA_SCRIPT";

/**
 * ReCaptcha v3 implementation based on https://developers.google.com/recaptcha/docs/v3
 * React hook that returns an async function that fetches a ReCAPTCHA token
 * This token can be passed to the back-end and used to verify the likelihood the user is human
 */
export const useGetReCAPTCHAToken = (action) => {
  useEffect(() => {
    let script = document.getElementById(RECAPTCHA_SCRIPT_ID);

    if (!script) {
      // manually add script element to the page to import the recaptcha api
      script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_KEY}`;
      script.id = RECAPTCHA_SCRIPT_ID;
      document.body.appendChild(script);
    }
  }, []);

  return useCallback(() => {
    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          const recaptchaToken = await window.grecaptcha.execute(
            process.env.REACT_APP_RECAPTCHA_KEY,
            {
              action,
            }
          );

          resolve(recaptchaToken);
        } catch (err) {
          console.error("Error obtaining ReCAPTCHA token!");
          resolve(null);
        }
      });
    });
  }, [action]);
};
