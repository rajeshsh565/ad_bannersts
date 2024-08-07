"use client";
import { Banner, imgSuggestions } from "@/utils/bannersData";
import { motion } from "framer-motion";
import { useState } from "react";
import BannerImageComp from "./BannerImageComp";
import { EditBanner } from "@/app/page";

interface EditBannerBsProps {
  editBannerProps:EditBanner,
  updateEditBanner: (data:EditBanner|null)=>void
}

const EditBannerTemplateBs = ({ editBannerProps, updateEditBanner }:EditBannerBsProps) => {
  const bannerInfo = editBannerProps.bannerInfo;
  const setBannerInfo = editBannerProps.handleBannerInfo;
  const [initialData, setInitialData] = useState<Banner>(bannerInfo);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-50 bg-[rgba(0,0,0,0.5)] text-black`}
    >
      <div
        className="bg-red-200 w-11/12 xl:w-2/5 lg:w-2/4 md:w-3/4 rounded-xl"
        style={{ height: "90%" }}
      >
        <div
          className="flex justify-between items-center px-3 bg-white sticky top-0 left-0 rounded-t-xl"
          style={{ height: "10%" }}
        >
          <h3>Edit Banner</h3>
          <button
            className="w-8 h-8 font-extrabold font-sans border-2 border-black rounded-full"
            onClick={() => {
              updateEditBanner && updateEditBanner(null);
            }}
          >
            X
          </button>
        </div>
        <div
          className="overflow-auto px-3 py-5"
          style={{ height: "75%", width: "100%" }}
        >
          <div className="preview w-full flex justify-center pointer-events-none">
            <BannerImageComp
              initialBannerData={initialData}
              updateEditBanner={updateEditBanner}
              isPreview={true}
            />
          </div>
          <h4 className="my-3">Images</h4>
          <div className="flex gap-2 overflow-auto">
              <input
                type="file"
                accept="image/*"
                id="f_upload"
                className="hidden"
                onChange={(e) =>{
                  const file = e.target.files?.[0] as File;
                  if(!file){
                    console.log("no file selected!");
                    return;
                  }
                      setInitialData({ ...initialData, img: URL.createObjectURL(file) });
                }}
              />
              <label htmlFor="f_upload" className="cursor-pointer h-16 w-16 min-w-16 rounded-full bg-slate-500 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
              </label>
            <div className="flex gap-2">
              {imgSuggestions.map((imgS, index) => {
                return (
                  <div
                    className={`h-16 w-16 overflow-hidden rounded-full ${
                      initialData.img === imgS.img
                        ? `border-4 border-red-700`
                        : `border-0`
                    }`}
                    onClick={() => {
                      setInitialData({ ...initialData, img: imgS.img });
                    }}
                    key={index}
                  >
                    <img src={imgS.img} className="object-fill" />
                  </div>
                );
              })}
            </div>
          </div>
          <h4 className="my-3">Title</h4>
          <input
            type="text"
            className="w-full h-10 border-1 px-2 rounded-md"
            defaultValue={initialData.title}
            onChange={(e) => {
              setInitialData({ ...initialData, title: e.target.value });
            }}
          />
          <h4 className="my-3">Description</h4>
          <input
            type="text"
            className="w-full h-10 border-1 px-2 rounded-md"
            defaultValue={initialData.desc}
            onChange={(e) => {
              setInitialData({ ...initialData, desc: e.target.value });
            }}
          />
          <h4 className="my-3">Button Text</h4>
          <input
            type="text"
            className="w-full h-10 border-1 px-2 rounded-md"
            defaultValue={initialData.ctaLabel}
            onChange={(e) => {
              setInitialData({ ...initialData, ctaLabel: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col items-center" style={{ height: "15%" }}>
          <button
            className="btn h-1/2 font-semibold hover:text-white border border-teal-700 hover:bg-teal-500 rounded-md"
            onClick={() => {
              setBannerInfo &&
                setBannerInfo(initialData);
              updateEditBanner && updateEditBanner(null);
            }}
            style={{ width: "90%" }}
          >
            Done
          </button>
          <button className="btn font-semibold hover:text-teal-700 h-1/2">
            Download
          </button>
        </div>
      </div>
    </motion.div>
  );
};
export default EditBannerTemplateBs;
