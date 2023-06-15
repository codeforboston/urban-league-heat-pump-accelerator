import backend_surveyors from "./surveyors_index.json";

// TODO: this is a temporary fix until the surveyor endpoint actually returns a user properly
export default backend_surveyors.map((surveyor) => ({
  ...surveyor,
  user_id: surveyor.id,
}));
