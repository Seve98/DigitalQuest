import { useEffect } from "react";
import supabase from "../supabase/supabase-client";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Avatar({url,size,onUpload}) {
const [avatarUrl, setAvatarUrl] = useState(null);
const[uploading, setUploading] = useState(false);

useEffect(() => {
    if(url) {
        downloadImage(url);
      
    }
}, [url]);

const downloadImage=async(path) =>{
    try{
        const {data,error}=await supabase.storage.from('avatars').download(path);
        if(error){
            throw error;
            const url=URL.createObjectURL(data);
            setAvatarUrl(url);
        }
        const url=URL.createObjectURL(data);
        setAvatarUrl(url);
    }catch(error){
        console.log("Error downloading image:",error.message);
    }
}
const uploadAvatar=async(e)=>{
    try{
        setUploading(true);
        if(!e.target.files || e.target.files.length===0){
            throw Error("You must select an image to upload");
        }
        const file=e.target.files[0];
        const fileExt=file.name.split(".").pop();
        const fileName=`${Math.random()}.${fileExt}`;
        const filePath=`${fileName}`;

        const{error:uploadError}=await supabase.storage
        .from('avatars')
        .upload(filePath,file);
        if(uploadError){
            throw uploadError;
        }
        await downloadImage(filePath);


        onUpload(e,filePath)
    }catch(error){
        toast.error(error.message);
    }finally{
        setUploading(false);
    }
}
    return (
        <div className="flex flex-col items-center justify-center relative">
            {avatarUrl?(<img className="avatar image" src={avatarUrl} style={{height:size,width:size,borderRadius:"50%"}} />):(
                <div className="avatar no-image" style={{height:size,width:size}} />
            )}
            <div className="mt-4">
                <label htmlFor="single" className="btn btn-custom">Upload</label>
                <input id="single" className="hidden" type="file" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
            </div>
        </div>
    )
}