"use client";
import { useState } from "react";
import styles from "./style.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Orb from "@/public/vc.svg";
import Shadow from "@/public/auth-bg-shadow.svg";

const Loader = ({ setFlag }: { setFlag: any }) => {
  const [loading, setLoading] = useState(0);

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    const circle = document.querySelector("#circle");
    const textEl = document.querySelector("#text");

    if (circle && textEl) {
      const timeline = gsap.timeline();

      timeline.to(circle, {
        scaleX: 180,
        scaleY: 180,
        duration: 3,
        ease: "power2.inOut",
        transformOrigin: "center center",
        opacity: 1,
        onStart: () => {
          gsap.to("body", { backgroundColor: "#0C0C0C", duration: 3 });
        },
      });

      timeline.to(
        textEl.querySelectorAll("#loadingText, #counterText"),
        {
          color: "#FFC425",
          duration: 3,
          ease: "linear",
        },
        0
      );

      timeline.to(
        {},
        {
          duration: 2.5,
          innerHTML: 100,
          ease: "linear",
          onUpdate: function () {
            setLoading(Math.round(this.progress() * 100));
          },
        },
        0
      );

      timeline.to("#loadingText p, #counterText", {
        y: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "linear",
      });

      timeline.to("#wrapper", {
        display: "none",
        duration: 1,
        ease: "linear",
        onUpdate: function () {
          setFlag(true);
        },
      });
    }
  });

  return (
    <div id="wrapper">
      <div
        className={`fixed top-0 left-0 h-screen w-screen ${styles.loader}`}
      ></div>
      <div
        className={`relative flex flex-col justify-center items-center h-screen w-screen overflow-hidden ${styles.circleBg}`}
      >
        <div
          className={`absolute top-[50%] left-[50%] bg-[#0c0c0c] w-[0.8rem] h-[0.8rem] rounded-[50%] z-10 ${styles.circle}`}
          id="circle"
        ></div>
        <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
          <Image
            className="w-auto h-full max-w-[862px] max-h-[862px] object-contain p-[4rem] rotate-reverse"
            src={Shadow}
            alt="orb"
            priority={true}
          />
        </div>
        <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
          <Image
            className="w-auto h-full max-w-[662px] max-h-[662px] object-contain p-[4rem] rotate-center mix-blend-overlay"
            src={Orb}
            alt="orb"
            priority={true}
          />
        </div>
        <div className="relative text-center z-10" id="text">
          <h2
            className="text-[7.5rem] leading-[7.5rem] tracking-[-0.1875rem] font-druk-heavy mb-[1rem] flex items-center"
            id="loadingText"
          >
            <p>L</p>
            <p>O</p>
            <p>A</p>
            <p>D</p>
            <p>I</p>
            <p>N</p>
            <p>G</p>
          </h2>
          <div
            id="counterText"
            className="text-[12.5rem] leading-[12.5rem] tracking-[-0.1875rem] font-druk-heavy"
          >
            {loading}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
