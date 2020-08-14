import React from "react";
import * as animationData from "../../../dist/assets/processing_animation.json";
import Lottie from "react-lottie";

const ProcessingAnimation = () => {
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
        width={215}
        height={200}
      />
    </div>
  );
};

export default ProcessingAnimation;
