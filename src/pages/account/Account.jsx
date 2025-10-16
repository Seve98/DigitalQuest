import { useNavigate } from "react-router"
import { set } from "zod";
import supabase  from "../../supabase/supabase-client";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/Avatar";
import toast from "react-hot-toast";


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
        toast.error(error.message);
      }
      setLoading(false);
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-md mx-auto rounded-2xl shadow-xl p-8 bg-transparent backdrop-blur-2xl">
            <h2 className="text-3xl mb-3 text-center">Impostazioni Profilo</h2>
            <form onSubmit={updateProfile}>
                <div className="mb-3">
                <Avatar url={avatar_url}
                size={150}
                onUpload={(event,url)=>{
                    updateProfile(event,url);
                }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input
                    className="w-full px-4 py-3 bgp rounded-lg cursor-not-allowed"
                        id="email"
                        type="text"
                        value={session?.user.email}
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="username">Username</label>
                    <input
                    className="w-full px-4 py-3 rounded-lg bgp "
                        id="username"
                        type="text"
                        value={username || ""}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="first_name">Nome</label>
                    <input
                    className="w-full px-4 py-3 rounded-lg bgp "
                        id="first_name"
                        type="text"
                        value={first_name || ""}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name">Cognome</label>
                    <input
                    className="w-full px-4 py-3 rounded-lg bgp "
                        id="last_name"
                        type="text"
                        value={last_name || ""}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                
                <button type="submit" disabled={loading} className="w-full bga  py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer transform hover:-translate-y-0.5" >
                    {loading?"Sto aggiornando...":"Aggiorna"}
                </button>
            </form>
            </div>
        </div>
    );
}