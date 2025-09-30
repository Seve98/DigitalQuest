import { useEffect } from "react";
import supabase from "../supabase/supabase-client";
import { useState } from "react";

export default function Avatar({url,size,onUpload}) {
const [avatarUrl, setAvatarUrl] = useState(null);
const[uploading, setUploading] = useState(false);

useEffect(() => {
    if(url) {
        setAvatarUrl(url);
    }
}, [url]);

const downloadImage=async(path) =>{
    try{
        const {data,error}=await supabase.storage.from('avatars').download(path);
        if(error){
            throw error;
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

        const{error:uploadError}=await supabase.storage.from('avatars').upload(filePath,file);
        if(uploadError){
            throw uploadError;
        }
        onUpload(e,filePath)
    }catch(error){
        alert(error.message);
    }finally{
        setUploading(false);
    }
}
    return (
        <div>
            {avatarUrl?(<img className="avatar image" src={avatarUrl} style={{height:size,width:size,borderRadius:"50%"}} />):(
                <div className="avatar no-image" style={{height:size,width:size}} />
            )}
            <div style={{width:size}}>
                
                <input id="single" className="btn" type="file" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
            </div>
        </div>
    )
}