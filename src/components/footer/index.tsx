import Link from "next/link";

const Footer = () => {
  return (
    <footer
      data-scroll-section
      className="w-full h-[34.9375rem] bg-[#FFFFFF] text-[#0c0c0c] p-[3.125rem]"
    >
      <div className="flex flex-wrap items-end justify-between h-full w-full text-[1.875rem] leading-[2.8125rem] tracking-[-1px]">
        <div>©️ ALINDA®️ 2024</div>
        <div className="text-[1.5625rem] leading-[1.5625rem] tracking-[-1px]">
          <div className="flex items-center justify-center">
            <div className="md:mr-[1.0625rem]">INSTAGRAM</div>
            <div className="md:mr-[1.6875rem]">TWITTER</div>
            <div>LINKEDIN</div>
          </div>
          <div className="text-center mt-[1.25rem]">Designed by EveWorks</div>
        </div>
        <div>Alinda@alinda.com</div>
      </div>
    </footer>
  );
};

export default Footer;
