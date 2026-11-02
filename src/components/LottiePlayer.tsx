
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";

type LottieProps = {
  animationData: object;
  loop?: boolean;
  className?: string;
};

const Lottie = dynamic(
  () =>
    import("lottie-react").then((mod) => {
      const lottieModule = mod as unknown as {
        default: ComponentType<LottieProps>;
      };

      return lottieModule.default;
    }),
  {
    ssr: false,
    loading: () => <div className="h-64 w-64" />,
  }
);

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

  useEffect(() => {
    let active = true;

    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Lottie animation");
        }

        return response.json();
      })
      .then((json: object) => {
        if (active) {
          setData(json);
        }
      })
      .catch((error) => {
        console.error("Lottie loading error:", error);
      });

    return () => {
      active = false;
    };
  }, [src]);

  if (!data) {
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
