import { useNavigate } from "react-router"
import { set } from "zod";
import supabase  from "../../supabase/supabase-client";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/Avatar";


export default function Account() {
    const {session}=useContext(SessionContext);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        let ignore=false;
        const getProfile=async()=>{
            setLoading(true);
            const user = session?.user;

            if(!user){
                return <p>Caricando...</p>
            }

            const {data,error}=await supabase
            .from('profiles')
            .select('username,first_name,last_name,avatar_url')
            .eq('id',user.id)
            .single();

            if(!ignore){
                if(data){
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                }
                setLoading(false);
            }
        };
        getProfile();
        return ()=>{
            ignore=true;
        }
    }, [session]);

    const updateProfile=async(event,avatarUrl)=>{
        event.preventDefault()
        setLoading(true);
        const {user}=session;
        const updates={
            id:user.id,
            username,
            first_name,
            last_name,
            avatar_url:avatarUrl,
            updated_at:new Date(),
        };
      const {error}=await supabase.from('profiles').upsert(updates);
      if(error){
        alert(error.message);
      }
      setLoading(false);
    }

    return (
        <div className="grid place-items-center">
            <h2 className="text-3xl mb-3 text-center">Impostazioni Profilo</h2>
            <form onSubmit={updateProfile} className="form">
                <Avatar url={avatar_url}
                size={150}
                onUpload={(event,url)=>{
                    updateProfile(event,url);
                }} />
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                    className="input"
                        id="email"
                        type="text"
                        value={session?.user.email}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                    className="input"
                        id="username"
                        type="text"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="first_name">Nome</label>
                    <input
                    className="input"
                        id="first_name"
                        type="text"
                        value={first_name || ""}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name">Cognome</label>
                    <input
                    className="input"
                        id="last_name"
                        type="text"
                        value={last_name || ""}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                
                <button type="submit" disabled={loading} className="btn btn-custom" >
                    {loading?"Sto aggiornando...":"Aggiorna"}
                </button>
            </form>
        </div>
    );
}