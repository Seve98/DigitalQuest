import { use, useCallback } from "react";
import { useEffect, useState } from "react";
export default function Fetch(initialUrl){
    const[url,updateUrl]=useState(initialUrl);
    const[loading,setLoading]=useState(false);
    const [data,setData]=useState(null);
    const[error,setError]=useState(null);

    const load =useCallback(async()=>{
        setData(null);
        if(!url){
            setError("Errore nell Url");
            return;
        }
        else{
            setError(null);
        }
        setLoading(true);
        try{
            const response=await fetch(url);
            if(!response.ok){
                throw new Error(response.statusText);
            }
            const json=await response.json();
            setData(json);
        }catch(error){
            setError(error.message);
            setData(null);
        }
        setLoading(false);
    },[url]);
    useEffect(()=>{
        load();
    },[load]);

    return {url,updateUrl,loading,data,error,load};
}