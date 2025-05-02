'use client';

import React from "react";
import MobileCircleImg from "./MobileCircleImg";
import DesktopCircleImg from "./DesktopCircleImg";

const CircleImg = () => {
  return (
    <>
      <div className="desktop-only">
        <DesktopCircleImg />
      </div>
      <div className="mobile-only">
        <MobileCircleImg />
      </div>
      <style jsx>{`
        .desktop-only {
          display: block;
        }
        .mobile-only {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }
          .mobile-only {
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default CircleImg; 