import React, { useState, useEffect } from "react";

const useIsLoading = () => {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true); 

  return { isPageLoading, setIsPageLoading };
};

export default useIsLoading;
