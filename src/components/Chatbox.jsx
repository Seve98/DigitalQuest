import supabase from "../supabase/supabase-client";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";
export default function Chatbox({data}) {
    const {session}=useContext(SessionContext);

    const handleMessageSubmit=async(e)=>{
        e.preventDefault();
      const inputMessage=e.currentTarget;
      const{message}= Object.fromEntries(new FormData(inputMessage));
      if(typeof message==="string" && message.trim().length!==0){
        const{error}=await supabase.from("messages").insert([{
            profile_id:session?.user.id,
            profile_username:session?.user.user_metadata.username,
            game_id:data.id,
            context:message,
        },
    ]).select();
    if(error){
        console.log(error);
    }
    else{
        inputMessage.reset();
    }
    }
    };



    return (
        <>
           <h4>Chat</h4>
           <div className="mt-50">

           </div>
           <div>
            <form onSubmit={handleMessageSubmit} className="flex">
                <fieldset role="group">
                <input
                    name="message"
                    type="text"
                    placeholder="Scrivi un messaggio..."
                />
                <button type="submit"> Invia </button>

                </fieldset>
            </form>
           </div>
        </>
    );
}