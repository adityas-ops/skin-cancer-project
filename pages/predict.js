import Prediction from '@/components/Prediction';
import Result from '@/components/Result';
import React from 'react';
import { useState } from 'react';


const Predict = () => {
    const [result, setResult] = useState(null);
    const [laoding,setLoading] = useState(false);

    return (
        <div>
           {
                laoding ? (<>
                    laoding...........
                </>)
                    :    
                result ? (
                     <div>
                        <Result setResult={setResult} result={result}/>
                     </div>
                ) : (
                     <div>
                     <Prediction setLoading={setLoading}  setResult={setResult} />
                     </div>
                )
           }
        </div>
    );
}

export default Predict;
