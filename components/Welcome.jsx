import React from 'react';
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useRouter } from 'next/router';

const Welcome = () => {
    const router = useRouter();
    return (
        <div className=' w-full h-screen flex justify-center items-center '>
                <div className='h-[80vh] w-[80vw]  border shadow-2xl flex rounded-lg'>
                <div className='flex flex-col w-[60%] p-10 items-center justify-center  h-full'>
                    <p className='text-blue-500 font-bold text-center text-8xl'> Skin Cancer</p>
                    <p className='text-blue-500 font-bold text-center text-8xl'>Classification</p>
                    <div className='h-[200px] w-full flex justify-center items-center '>
                            <button onClick={()=>{ router.push('/predict')}} className=' text-white font-[400] text-xl hover:scale-[1.05] duration-500 w-fit h-fit cursor-pointer py-2 px-8 rounded-lg bg-[#DE076E]'>
                                    Start Predicting
                            </button>
                    </div>
                   
                </div>
                <div className='w-[40%] h-full'>
                <div className="w-[400px] mt-[70px]  h-[400px]">
                <Player autoplay loop src="/welcome.json" speed={0.5} />
              </div>
                </div>
              
                </div>
        </div>
    );
}

export default Welcome;
