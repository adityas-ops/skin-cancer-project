import Prediction from '@/components/Prediction';
import Result from '@/components/Result';
import React from 'react';
import { useState } from 'react';

const Predict = () => {
    const [result, setResult] = useState(null);

    return (
        <div>
           {
                result ? (
                     <div>
                        <Result setResult={setResult} result={result}/>
                     </div>
                ) : (
                     <div>
                     <Prediction  setResult={setResult} />
                     </div>
                )
           }
        </div>
    );
}

export default Predict;
