import React, { useRef, useState } from 'react'
import {Pen, User, Trash} from 'lucide-react'
const ProfilePhoto = ({image, setImage, preview, setPreview}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const handleImageChange = (event)=>{
        const file = event.target.files[0];
        if(file){
            setImage(file);
            const preview = URL.createObjectURL(file);
            if(setPreview){
                setPreview(preview)
            }
            setPreviewUrl(preview)
        }
    }
    const handleRemoveImage = ()=>{
        setImage(null);
        setPreviewUrl(null);
        if(setPreview){
            setPreview(null)
        }
    }
    const onChooseFile = ()=>{
        inputRef.current.click();
    }
    return (
        <div className='flex items-center justify-center text-center'>
            <input 
                type="file"
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
            className='hidden'/>
            {!image?(
                <div className='bg-slate-200 w-[80px] h-[80px] rounded-full relative'>
                <User className='absolute top-5 left-5' size={40}/>
                <button className='bg-black rounded-full absolute p-2 top-12 left-14'
                type='button'
                onClick={onChooseFile}>
                    <Pen size={20} className='text-white'/>
                </button>
            </div>
            ):(
                <div className='relative'>
                    <img src={preview || previewUrl} alt="profile photo" className='w-20 h-20 rounded-full object-cover'/>
                    <button type='button' onClick={handleRemoveImage} className='p-1 items-center justify-center  bg-red-100 rounded-2xl bottom-1 left-12 absolute text-xl text-red-500'>
                        <Trash/>
                    </button>
                </div>
            )}
            
        </div>
    )
}

export default ProfilePhoto