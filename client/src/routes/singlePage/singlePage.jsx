import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import Chat from "../../components/chat/Chat";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";


function SinglePage() {
  const post = useLoaderData();
  // console.log(post);

  const [chatId, setChatId] = useState(null);
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);
  const [chat, setChat] = useState(null);
  // console.log(chat)

  const navigate = useNavigate();
  const chatContainerRef = useRef();
  const { socket } = useContext(SocketContext);

  // Auto scroll to bottom of chat messages
  useEffect(() => {
    if (chat && chat.messages && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat?.messages]);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/messages/" + chatId, { text });
      setChat((prev) => ({ 
        ...prev, 
        messages: [...(prev.messages || []), res.data] 
      }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: post.userId,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenChat = async (id, receiver) => {
    try {
      if (!currentUser) {
        navigate("/login");
        return;
      }
      
      // console.log(id, receiver);
      const res = await apiRequest("/chats/between/" + id + "/" + receiver);
      // console.log(res.data);
      
      if (res.data && res.data.length > 0) {
        setChatId(res.data[0].id);
        
        // Get receiver information
        const receiverInfo = await apiRequest("/users/" + receiver);
        
        setChat({ 
          ...res.data[0], 
          receiver: receiverInfo.data 
        });
      }
    } catch (err) {
      console.log("Error opening chat:", err);
      // If chat doesn't exist, create a new one
      try {
        const newChatRes = await apiRequest.post("/chats", { receiverId: receiver });
        setChatId(newChatRes.data.id);
        
        // Get receiver information
        const receiverInfo = await apiRequest("/users/" + receiver);
        
        setChat({ 
          id: newChatRes.data.id,
          messages: [],
          receiver: receiverInfo.data 
        });
      } catch (createErr) {
        console.log("Error creating chat:", createErr);
      }
    }
  };
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          {/* Chat Section at Top */}
          <div className="chatSection">
            <p className="title">Contact Owner</p>
            <div className="buttons">
              <button onClick={() => handleOpenChat(currentUser.id, post.userId)}>
                <img src="/chat.png" alt="" />
                Send a Message
              </button>
              <button
                onClick={handleSave}
                style={{
                  backgroundColor: saved ? "#fece51" : "white",
                }}
              >
                <img src="/save.png" alt="" />
                {saved ? "Place Saved" : "Save the Place"}
              </button>
            </div>
          </div>

          {/* Chat Box */}
          {chat && (
            <div className="chatBox">
              <div className="top">
                <div className="user">
                  <img src={chat.receiver.avatar || "noavatar.jpeg"} alt="" />
                  {chat.receiver.username}
                </div>
                <span className="close" onClick={() => setChat(null)}>
                  X
                </span>
              </div>
              <div className="center" ref={chatContainerRef}>
                {chat && chat.messages && chat.messages.map((message, index) => (
                  <div
                    className="chatMessage"
                    style={{
                      alignSelf:
                        message.userId === currentUser.id ? "flex-end" : "flex-start",
                      textAlign:
                        message.userId === currentUser.id ? "right" : "left",
                    }}
                    key={message.id || index}
                  >
                    <p>{message.text}</p>
                    <span>{format(message.createdAt)}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="bottom">
                <textarea 
                  name="text" 
                  placeholder="Type your message here..."
                  rows="2"
                ></textarea>
                <button>Send</button>
              </form>
            </div>
          )}

          {/* Property Details Section */}
          <div className="propertyDetails">
            <p className="title">General</p>
            <div className="listVertical">
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="featureText">
                  <span>Utilities</span>
                  {post.postDetail.utilities === "owner" ? (
                    <p>Owner is responsible</p>
                  ) : (
                    <p>Tenant is responsible</p>
                  )}
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Pet Policy</span>
                  {post.postDetail.pet === "allowed" ? (
                    <p>Pets Allowed</p>
                  ) : (
                    <p>Pets not Allowed</p>
                  )}
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Income Policy</span>
                  <p>{post.postDetail.income}</p>
                </div>
              </div>
            </div>
            <p className="title">Sizes</p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>{post.postDetail.size} sqft</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>{post.bedroom} beds</span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="" />
                <span>{post.bathroom} bathroom</span>
              </div>
            </div>
            <p className="title">Nearby Places</p>
            <div className="listHorizontal">
              <div className="feature">
                <img src="/school.png" alt="" />
                <div className="featureText">
                  <span>School</span>
                  <p>
                    {post.postDetail.school > 999
                      ? post.postDetail.school / 1000 + "km"
                      : post.postDetail.school + "m"}{" "}
                    away
                  </p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Bus Stop</span>
                  <p>{post.postDetail.bus}m away</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Restaurant</span>
                  <p>{post.postDetail.restaurant}m away</p>
                </div>
              </div>
            </div>
            <p className="title">Location</p>
            <div className="mapContainer">
              <Map items={[post]} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SinglePage;
