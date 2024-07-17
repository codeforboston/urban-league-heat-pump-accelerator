import { useWatch } from "react-hook-form";

const ConditionalQuestion = ({ control, children, rule }) => {
  const watchedValue = useWatch({
    control,
    name: rule ? `${rule.question}` : "",
  });
  if (rule && watchedValue !== rule.answer) {
    return null;
  }
  return <>{children}</>;
};

export default ConditionalQuestion;
