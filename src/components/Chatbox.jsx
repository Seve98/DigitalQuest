import { useContext, useEffect, useRef, useState } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import Icon from "@mui/material/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";




export default function Chatbox({ data, setShowChat }) {
  const { session } = useContext(SessionContext);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);



  // 🔹 Scroll automatico quando arrivano nuovi messaggi
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 🔹 Recupero messaggi iniziali
  useEffect(() => {
    if (!data?.id) return;

    const fetchMessages = async () => {
      const { data: initialMessages, error } = await supabase
        .from("messages")
        .select("*")
        .eq("game_id", data.id)
      

      if (error) {
        console.error("Errore fetch messaggi:", error);
        setError(error.message);
      } else {
        setMessages(initialMessages || []);
      }
    };

    fetchMessages();
  }, [data?.id]);

  // 🔹 Subscription in tempo reale
  useEffect(() => {
    if (!data?.id) return;

    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (payload.new.game_id === data.id) {
            setMessages((prev) => [...prev, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      channel.unsubscribe();
    };
  }, [data?.id]);

  // 🔹 Invio messaggio
  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const { message } = Object.fromEntries(new FormData(form));

    if (typeof message === "string" && message.trim().length !== 0) {
      const { error } = await supabase.from("messages").insert([
        {
          profile_id: session?.user.id,
          profile_username: session?.user.user_metadata.username,
          game_id: data.id,
          context: message,
        },
      ]);

      if (error) {
        console.error("Errore invio messaggio:", error);
        setError(error.message);
      } else {
        form.reset();
      }
    }
  };

  return (
    <>
    <div className="flex justify-between align-center mb-2">
       <h4>Chat</h4>
       <button className="btn btn-custom" onClick={() => setShowChat(false)}>
        <FontAwesomeIcon icon={faXmark} />
       </button>
      
    </div>
     

      <div
        className="chatContainer"
        style={{
            width: "100%",
          maxHeight: "300px",
          overflowY: "auto",
         
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}

        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: "10px",
              padding: "6px",
              borderRadius: "8px",
              backgroundColor:
                msg.profile_id === session?.user.id ? "#e0ffe0" : "#f0f0f0",
              textAlign: msg.profile_id === session?.user.id ? "right" : "left",
            }}
          >
            <strong className="cp">{msg.profile_username}</strong>
            <p className="cp" style={{ margin: "4px 0" }}>{msg.context}</p>
            
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleMessageSubmit} className="flex">
        <fieldset role="group" style={{ display: "flex", width: "100%" }}>
          <input
            name="message"
            type="text"
            placeholder="Scrivi un messaggio..."
            style={{ flex: 1, padding: "8px" }}
          />
          <button className="btn btn-custom" type="submit" style={{ padding: "8px 12px" }}>
            Invia
          </button>
        </fieldset>
      </form>
    </>
  );
}
