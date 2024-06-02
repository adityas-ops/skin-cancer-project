import ImageContext from "@/provider/ImageProvider";
import React, { useContext, useEffect, useState } from "react";


const Result = ({ result, setResult }) => {
  const { onFileChange, image, setImage, selectedFile, setSelectFile } =
    useContext(ImageContext);
  const class_labels = [
    { short_name: "nv", full_name: "Melanocytic nevi" },
    { short_name: "mel", full_name: "Melanoma" },
    { short_name: "bkl", full_name: "Benign keratosis-like lesions" },
    { short_name: "bcc", full_name: "Basal cell carcinoma" },
    { short_name: "vasc", full_name: "Vascular lesions" },
    {
      short_name: "akiec",
      full_name: "Actinic keratoses and intraepithelial carcinoma",
    },
    { short_name: "df", full_name: "Dermatofibroma" },
  ];
  const [predicted_class, setPredicted_class] = useState(null);
  const [otherClassData, setOtherClassData] = useState([]);
  const [isShown,setisShown] = useState(false);

  // useEffect(() => {
  //   if (result) {
  //     setPredicted_class(
  //       class_labels.find((item) => item.short_name === result?.prediction)
  //         .full_name
  //     );
  //      setisShown(result.confidence > 0.98 ? true : false);
  //   }
  //   if (result && result.class_probabilities) {
  //     const newOtherClassData = class_labels
  //       .filter((item) => item.short_name !== result?.prediction) // Remove the predicted class
  //       .map((item) => ({
  //         short_name: item.short_name,
  //         full_name: item.full_name,
  //         probability: result.class_probabilities[item.short_name],
  //       }));

  //     setOtherClassData(newOtherClassData);
  //   }
  // }, [result]);

  useEffect(() => {
    if (result) {
      const predictedClass = class_labels.find(
        (item) => item.short_name === result?.prediction
      ).full_name;
      setPredicted_class(predictedClass);
  
      const newOtherClassData = class_labels
        .filter((item) => item.short_name !== result?.prediction) // Remove the predicted class
        .map((item) => ({
          short_name: item.short_name,
          full_name: item.full_name,
          probability: result.class_probabilities[item.short_name],
        }));
  
      setOtherClassData(newOtherClassData);
  
      const highProbabilityClasses = newOtherClassData.filter(
        (item) => parseFloat(parseFloat(item.probability).toFixed(2)) > 0.00
      );
      console.log("highProbabilityClasses--->", highProbabilityClasses);
  
      setisShown(
        result.confidence > 0.98 && highProbabilityClasses.length <= 3
      );
    }
  }, [result]);
  

  // console.log("predicted_class", otherClassData);
  console.log("is shown",isShown)

  const handleSearch = () => {
    if (predicted_class.trim() !== "") {
      // Open a new tab with Google search for the selected skin cancer
      window.open(`https://www.google.com/search?q=${encodeURIComponent(predicted_class)}`, "_blank");
    }
  };

  return (
    <div className=" w-full h-screen flex items-center justify-center">
    {
      isShown ? (<>  <div className="h-[80vh] w-[80vw]  border shadow-2xl  p-10 rounded-lg ">
        <div className=" text-center  text-4xl font-bold text-blue-500">
          Result
        </div>
        <div className="flex gap-5 w-full mt-10 ">
          <img
            src={image}
            alt="result"
            className="w-[400px] h-[400px] rounded-[12px]"
          />
          <div>
            <div className="  justify-start flex gap-2 ">
              <p className="text-3xl font-bold text-center leading-[1.5] ">
                <span className=" text-pink-600 font-bold">
                  {" "}
                  Predicted Class:- {"   "}
                </span>
              </p>
              <div className="px-8 py-2 text-2xl font-bold h-fit rounded-full ">
                {predicted_class}
                <span>
                  {result?.confidence ? (
                    <span className="text-lg ml-1 font-semibold text-blue-500">
                      {((result.confidence * 100) / 100).toFixed(2)}%
                    </span>
                  ) : null}
                </span>
              </div>
            </div>
            {/* other classes */}
            <div className="mt-7">
              <div className="text-2xl font-bold underline  leading-[1.5] text-black">
                Other Classes Probabilities
              </div>
              <div className=" grid grid-cols-2 gap-10 mt-5">
                {otherClassData.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start"
                  >
                    <p className="text-base font-bold">{item.full_name}</p>
                    <div className="px-5  text-base  h-fit rounded-full bg-black text-white">
                      {(item.probability * 100/100).toFixed(2)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10">
            <button
                onClick={() => {
                setResult(null);
                setImage("");
                }}
                className="mt-10 text-white font-[400] text-xl hover:scale-[1.05] duration-500 w-fit h-fit cursor-pointer py-2 px-8 rounded-lg bg-[#DE076E]"
            >
                Predict Again
            </button>
            <button
                onClick={handleSearch}
                className="mt-10 text-white font-[400] text-xl hover:scale-[1.02] duration-500 w-fit h-fit cursor-pointer py-2 px-8 rounded-lg bg-green-800"
            >
                learn More about {predicted_class}
            </button>
        </div>
      </div></>)
      :(<>
        <div className="h-[30vh] w-[70vw] flex flex-col items-center justify-center  border shadow-2xl  p-10 rounded-lg ">
          <p className="text-3xl font-bold text-center leading-[1.5] ">
            Please upload a valid image (only use skin cancer images)
          </p>
          <button
                onClick={() => {
                setResult(null);
                setImage("");
                }}
                className="mt-10 text-white font-[400] text-xl hover:scale-[1.05] duration-500 w-fit h-fit cursor-pointer py-2 px-8 rounded-lg bg-[#DE076E]"
            >
                Predict Again
            </button>
        </div>
      </>)
    }
    </div>
  );
};

export default Result;
