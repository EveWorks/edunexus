"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  LocomotiveScrollProvider,
  useLocomotiveScroll,
} from "react-locomotive-scroll";
import "@/../locomotive-scroll/dist/locomotive-scroll.css";
import Hero from "@/components/hero";
import Statement from "@/components/statement";
import Demo from "@/components/demo";
import Product from "@/components/product";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";

const LandingPage = () => {
  const containerRef = useRef(null);
  const { scroll } = useLocomotiveScroll();

  const onUpdate = (args: any) => {
    console.log(args);
  };

  useEffect(() => {
    const handleScroll = (event: any) => {
      console.log("Scroll event detected:", event);
    };

    const scrollContainer: any = containerRef.current;

    const handleScrollEvent = ({ scroll }: { scroll: any }) => {
      console.log("Current scroll position:", scroll.y);
      handleScroll(scroll);
    };

    const locomotiveScrollInstance = scrollContainer?.locomotive?.scroll;
    if (locomotiveScrollInstance) {
      locomotiveScrollInstance.on("scroll", handleScrollEvent);
    }

    return () => {
      if (locomotiveScrollInstance) {
        locomotiveScrollInstance.off("scroll", handleScrollEvent);
      }
    };
  }, []);

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        interia: 0.1,
        tablet: {
          smooth: true,
          direction: "vertical",
          gestureDirection: "vertical",
          breakpoint: 1024,
        },
        smartphone: {
          smooth: true,
          direction: "vertical",
          gestureDirection: "vertical",
          interia: 0.1,
        },
        // ... all available Locomotive Scroll instance options
      }}
      containerRef={containerRef}
      onUpdate={onUpdate}
    >
      <div
        data-scroll-container
        className="w-full relative overflow-x-hidden"
        ref={containerRef}
      >
        <Hero />
        <Statement />
        <Demo />
        <Product />
        <Pricing />
        <Footer />
      </div>
    </LocomotiveScrollProvider>
  );
};

export default LandingPage;
