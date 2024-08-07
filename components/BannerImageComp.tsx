"use client";
import Image from "next/image";
import { useState } from "react";
import { Banner } from "@/utils/bannersData";
import { EditBanner } from "@/app/page";

interface BannerProps {
  initialBannerData: Banner,
  updateEditBanner:(data:EditBanner|null)=>void,
  isPreview?: boolean
}

const BannerImageComp = ({initialBannerData, updateEditBanner, isPreview=false}: BannerProps) => {
  const [bannerInfo, setBannerInfo] = useState<Banner>(initialBannerData);
  const handleBannerInfo = (data:Banner)=> {
    setBannerInfo(data);
  }
  return (
    <div
      className={`flex w-96 h-64 justify-center items-center gap-2 text-white px-3 py-10 relative`}
      style={{
        backgroundImage: `url(${isPreview ? initialBannerData.bgImg :bannerInfo.bgImg})`,
      }}
    >
      <div
        className="absolute w-full h-full top-0 left-0"
        style={{ backgroundColor: `rgba(0,0,0,0.3)` }}
      ></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5 absolute right-5 top-5 cursor-pointer"
        onClick={()=>{
          updateEditBanner({bannerInfo, handleBannerInfo})
        }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
        />
      </svg>
      <div className="flex flex-col justify-around h-full z-10">
        <div>
          <h3 className="font-bold text-2xl">{isPreview ? initialBannerData.title :bannerInfo.title}</h3>
          <p className={`my-3 ${bannerInfo.img !== "" ? `w-2/3` : ``}`}>
            {isPreview ? initialBannerData.desc : bannerInfo.desc}
          </p>
        </div>
        <div>
          <a
            className="border border-teal-700 rounded-md hover:bg-teal-400 px-3 py-1 w-36  text-center"
            href={bannerInfo.cta}
            target="_blank"
          >
            {isPreview ? initialBannerData.ctaLabel : bannerInfo.ctaLabel}
          </a>
        </div>
      </div>
      <div
        className={`border-4 border-white rounded-3xl overflow-hidden z-10 ${
          bannerInfo.img === "" && `hidden`
        }`}
      >
        <Image
          src={isPreview? initialBannerData.img : bannerInfo.img}
          alt={isPreview? initialBannerData.title : bannerInfo.title}
          width={120}
          height={42}
          className="object-cover"
        />
      </div>
    </div>
  );
};
export default BannerImageComp;
