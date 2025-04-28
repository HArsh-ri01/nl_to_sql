"use client";
import Lottie from "lottie-react";
import emptyStateAnimation from "@/public/lottie/cricket.json";

export default function LottiePlaceholder() {
  return (
    <div className="lottie-wrapper">
      <Lottie animationData={emptyStateAnimation} loop={true} />
      <style jsx>{`
        .lottie-wrapper {
          width: 70vw;
          max-width: 450px;
          height: auto;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .lottie-wrapper {
            width: 450px;
            height: 450px;
          }
        }
      `}</style>
    </div>
  );
}
