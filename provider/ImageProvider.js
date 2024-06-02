import { useState, createContext } from 'react';

const ImageContext = createContext();

//Contex Provider used to encapsulate only the components that needs the state in this context
export const ImageProvider = ({children})=>{

    const [image, setImage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    //Increase counter
    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onloadend = () => {
            const image = reader.result;
            setImage(image);
        };
    };


    return (
        <ImageContext.Provider value={{onFileChange, image, setImage,selectedFile,setSelectedFile}}>
            {children}
        </ImageContext.Provider>
    )
}

export default ImageContext;