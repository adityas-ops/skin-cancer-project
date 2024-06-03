import axios from "axios";
import React, { useState,useContext, useEffect } from "react";
import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import ImageContext from "@/provider/ImageProvider";
import useDelay from '@/hooks/useDelay';


const Home = ({setResult,setLoading}) => {

  const {onFileChange,image,setImage,selectedFile,setSelectFile} = useContext(ImageContext)

  const [delayedResult, setDelayedResult] = useState(null);

//   const onFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//     const reader = new FileReader();
//     reader.readAsDataURL(event.target.files[0]);
//     reader.onloadend = () => {
//       const image = reader.result;
//       setImage(image);
//     };
//   };




  console.log(image, "image");
  // const uploadFile = async () => {
  //   try {
  //     setLoading(true);
  //     const formData = new FormData();

  //       formData.append("file", selectedFile);
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/predict",
  //       // "https://skin-cancer-apis.onrender.com/predict",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     console.log(response?.data, "response");
  //     setLoading(false);

  //     if (!response) {
  //       throw new Error("Failed to upload file");
  //     }

  //     console.log("final result --->", response?.data);
  //       setResult(response?.data);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };
  const uploadFile = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        // "https://skin-cancer-apis.onrender.com/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response?.data, "response");
      if (!response) {
        throw new Error("Failed to upload file");
      }

      console.log("final result --->", response?.data);
      setResult(response?.data);
      setDelayedResult(response?.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  useDelay(() => {
    if (delayedResult) {
      setResult(delayedResult);
    }
  }, 3000);


  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-neutral-100 w-full flex-col gap-5">
        <div className="flex flex-col w-full h-full items-center justify-center">
          <div className="bg-white w-[40rem] h-full rounded-xl flex flex-col gap-5 p-5">
            {image !== "" ? (
              <></>
            ) : (
              <div className="border-dashed relative top-0 left-0 right-0 bottom-0 border-2 border-neutral-400 w-full h-[23rem] rounded-xl flex items-center justify-center gap-2 flex-col">
                <div className="absolute  top-7 w-full h-full">
                  <div className="flex flex-col items-center justify-center gap-4 w-full h-full text-neutral-500">
                    <ArrowUpTrayIcon className="text-sky-500 w-20" />
                    <span className="text-xl font-medium text-neutral-700">
                      Drag your image or Drop
                    </span>
                    <h2 className="text-sm ">Supports: jpg,png,jpeg</h2>
                  </div>
                  <input
                    className="z-2 absolute left-0 right-0 bottom-0 top-0 w-full h-full cursor-pointer opacity-0"
                    type="file"
                    onChange={onFileChange}
                  />
                </div>
              </div>
            )}
            {image !== "" ? (
              <div className="flex flex-col items-center gap-5 justify-center w-full p-3 rounded-xl border-2 border-dashed border-neutral-300">
                <div className="relative aspect-square w-full h-[20rem]  object-cover">
                  <Image
                    fill
                    src={image}
                    alt={image}
                    className="aspect-square w-14 rounded-xl object-cover"
                  />
                </div>
                <div className="w-full flex items-center gap-4">
                  <div
                    onClick={() => setImage("")}
                    className="py-2 px-3 w-1/2 rounded-xl flex gap-2 justify-center items-center bg-red-500 text-white cursor-pointer hover:bg-red-600 duration-150"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <button type="button" className="">
                      Delete
                    </button>
                  </div>
                  <button
                    className="w-1/2 rounded-xl py-2 px-3 text-white bg-green-500 hover:bg-green-600 duration-150"
                    onClick={() => uploadFile()}
                  >
                    Start Analysis
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* <div className="text-red-700 text-3xl font-medium">
            Cancer type: {res ? res?.prediction : "Loading..."}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;