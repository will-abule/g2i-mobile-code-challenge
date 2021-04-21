import React, { useEffect } from "react";
import { useState } from "react";
import { useDimensions } from "@react-native-community/hooks";

export const useResponsiveHooks = () => {
  const width = useDimensions().screen.width;
  const [state, setState] = useState({
    device: "",
    width: 0,
  });

  useEffect(() => {
    if (width < 768) {
      setState({
        device: "mobile",
        width,
      });
    } else if (width > 767 && width < 1024) {
      setState({
        device: "small-tablet",
        width,
      });
    } else {
      setState({
        device: "tablet",
        width,
      });
    }
  }, [width]);

  return state;
};
