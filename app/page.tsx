'use client';
import BannerImageComp from "@/components/BannerImageComp";
import EditBannerTemplateBs from "@/components/EditBannerTemplateBs";
import { Banner, bannersData } from "@/utils/bannersData";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

export interface EditBanner {
  bannerInfo: Banner,
  handleBannerInfo: (data:Banner)=>void
}

export default function Home() {
  const [editBannerInfo, setEditBannerInfo] = useState<EditBanner|null>();
  const updateEditBanner = (data:EditBanner|null) =>{
    setEditBannerInfo(data);
  }
  return (
    <div className="w-full flex justify-center py-8">
      <AnimatePresence>
      {editBannerInfo && <EditBannerTemplateBs editBannerProps={editBannerInfo} updateEditBanner={updateEditBanner}/>}
      </AnimatePresence>
      <div className="banner-center grid grid-cols-1 md:grid-cols-2 gap-2">
    {bannersData.map((data,index)=>{
      return <BannerImageComp initialBannerData={data} updateEditBanner={updateEditBanner} key={index}/>
    })}
      </div>
    </div>
  );
}
