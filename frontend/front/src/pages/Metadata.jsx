import { useMemo } from "react";

const MISSING_MESSAGE = "This value should be supplied by the GitHub workflow";

export const Metadata = () => {
  const metadata = useMemo(
    () => ({
      gitSha: process.env.REACT_APP_GIT_SHA ?? MISSING_MESSAGE,
      gitRef: process.env.REACT_APP_GIT_REF ?? MISSING_MESSAGE,
    }),
    []
  );

  return <pre>{JSON.stringify(metadata, null, 4)}</pre>;
};
