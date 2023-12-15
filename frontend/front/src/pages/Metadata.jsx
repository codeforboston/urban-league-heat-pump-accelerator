import { useMemo } from "react";

export const Metadata = () => {
  const metadata = useMemo(
    () => ({
      gitRevision: process.env.REACT_APP_GIT_SHA,
    }),
    []
  );

  return <pre>{JSON.stringify(metadata, null, 4)}</pre>;
};
