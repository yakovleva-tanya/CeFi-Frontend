import React from "react";
import * as loading_animation from "../../../dist/assets/loading_animation.json";
import * as success_animation from "../../../dist/assets/success_animation.json";

import Lottie from "react-lottie";

interface animationProps {
  isStopped: boolean;
  animation?: string;
}

const LoadingAnimation = ({
  isStopped,
  animation = "loading",
}: animationProps) => {
  const animationData =
    animation === "loading" ? loading_animation : success_animation;
  return (
    <div style={animation === "loading" ? { margin: "-8px" } : {}}>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        width={animation === "loading" ? 36 : 65}
        height={animation === "loading" ? 36 : "auto"}
        isStopped={isStopped}
      />
    </div>
  );
};

export default LoadingAnimation;
