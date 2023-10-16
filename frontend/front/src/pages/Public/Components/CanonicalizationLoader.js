import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { useGetHomeQuery } from "../../../api/apiSlice";
import Loader from "../../../components/Loader";
import { Box } from "@mui/material";

const CANONICALIZED = "canonicalized";
const UNCANONICALIZED = "uncanonicalized";
const UNRECOGNIZED = "unrecognized";
const VALIDATION_ERROR = "validationError";

const CanonicalizationLoader = forwardRef(({ homeId, onResolved }, ref) => {
  const [stopPolling, setStopPolling] = useState(false);
  const {
    data: validationData,
    isLoading: isLoadingValidation,
    isError: validationError,
  } = useGetHomeQuery(homeId, { pollingInterval: stopPolling ? 0 : 300 });

  const isUncanonicalized = useMemo(
    () => validationData?.status === UNCANONICALIZED,
    [validationData]
  );

  const isCanonicalized = useMemo(
    () => validationData?.status === CANONICALIZED,
    [validationData]
  );

  const isUnrecognized = useMemo(
    () => validationData?.status === UNRECOGNIZED,
    [validationData]
  );

  useEffect(() => {
    if (isLoadingValidation) return;
    if (validationError) {
      onResolved(VALIDATION_ERROR);
      setStopPolling(true);
    } else if (isUnrecognized) {
      onResolved(UNRECOGNIZED);
      setStopPolling(true);
    } else if (isCanonicalized) {
      onResolved(CANONICALIZED);
      setStopPolling(true);
    } else if (isUncanonicalized) {
      onResolved(UNCANONICALIZED);
    }
  }, [
    validationData,
    validationError,
    isLoadingValidation,
    onResolved,
    isUnrecognized,
    isCanonicalized,
    isUncanonicalized,
  ]);

  return (
    <Box ref={ref}>
      <Loader />
    </Box>
  );
});

export default CanonicalizationLoader;
