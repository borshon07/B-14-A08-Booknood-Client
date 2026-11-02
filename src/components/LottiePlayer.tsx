
"use client";

import { useEffect, useState } from "react";
import type { ComponentType } from "react";

type LottieProps = {
  animationData: object;
  loop?: boolean;
  className?: string;
};

type LottieComponent = ComponentType<LottieProps>;

export default function LottiePlayer({
  src,
  className = "h-64 w-64",
  loop = true,
}: {
  src: string;
  className?: string;
  loop?: boolean;
}) {
  const [data, setData] = useState<object | null>(null);
  const [Lottie, setLottie] = useState<LottieComponent | null>(null);

  // Dynamically import Lottie on the client
  useEffect(() => {
    let active = true;

    import("lottie-react").then((module) => {
      const LottieComponent = module.default;

      if (active && LottieComponent) {
        setLottie(() => LottieComponent as LottieComponent);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  // Fetch animation JSON
  useEffect(() => {
    let active = true;

    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load Lottie animation");
        }

        return response.json();
      })
      .then((json: object) => {
        if (active) {
          setData(json);
        }
      })
      .catch((error) => {
        console.error("Lottie animation error:", error);
      });

    return () => {
      active = false;
    };
  }, [src]);

  if (!data || !Lottie) {
    return <div className={className} />;
  }

  return (
    <Lottie
      animationData={data}
      loop={loop}
      className={className}
    />
  );
}
