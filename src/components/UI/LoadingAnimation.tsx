import React from "react";
import * as animationData from "../../../dist/assets/loading_animation.json";
import Lottie from "react-lottie";

interface animationProps {
  isStopped: boolean;
}

const LoadingAnimation = ({ isStopped }: animationProps) => {
  return (
    <div>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={30}
        width={30}
        isStopped={isStopped}
      />
    </div>
  );
};

export default LoadingAnimation;
