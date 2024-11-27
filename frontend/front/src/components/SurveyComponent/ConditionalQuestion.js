import { useEffect } from "react";
import { useWatch } from "react-hook-form";

const ConditionalQuestion = ({
  id,
  control,
  children,
  rule,
  setValue,
  formDefault,
}) => {
  const watchedValue = useWatch({
    control,
    name: rule ? `${rule.question}` : "",
  });

  useEffect(() => {
    if (rule && !rule.answers.includes(watchedValue)) {
      setValue(id.toString(), formDefault[id]);
    }
  }, [watchedValue, rule, id, setValue, formDefault]);

  if (rule && !rule.answers.includes(watchedValue)) {
    return null;
  }

  return <>{children}</>;
};

export default ConditionalQuestion;
