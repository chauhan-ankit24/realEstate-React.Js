import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();

  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      console.log("hitted logout");
      navigate("/chat");  
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          {/* User Information Section */}
          <div className="userSection">
            <div className="userInfo">
              <div className="avatarContainer">
                <img 
                  src={currentUser.avatar || "/noavatar.jpeg"} 
                  alt="User Avatar" 
                  className="userAvatar"
                />
              </div>
              <div className="userDetails">
                <h1 className="userName">{currentUser.username}</h1>
                <p className="userEmail">{currentUser.email}</p>
                <div className="userActions">
                  <Link to="/profile/update">
                    <button className="updateBtn">Update Profile</button>
                  </Link>
                  <button onClick={handleLogout} className="logoutBtn">Logout</button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="contentSections">
            <div className="section">
              <div className="sectionHeader">
                <h2>My Properties</h2>
                <Link to="/add">
                  <button className="actionBtn">Create New Post</button>
                </Link>
              </div>
              <div className="sectionContent">
                <Suspense fallback={<div className="loading">Loading properties...</div>}>
                  <Await
                    resolve={data.postResponse}
                    errorElement={<div className="error">Error loading posts!</div>}
                  >
                    {(postResponse) => <List posts={postResponse.data.userPosts} />}
                  </Await>
                </Suspense>
              </div>
            </div>

            <div className="section">
              <div className="sectionHeader">
                <h2>Saved Properties</h2>
              </div>
              <div className="sectionContent">
                <Suspense fallback={<div className="loading">Loading saved properties...</div>}>
                  <Await
                    resolve={data.postResponse}
                    errorElement={<div className="error">Error loading posts!</div>}
                  >
                    {(postResponse) => <List posts={postResponse.data.savedPosts} />}
                  </Await>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <div className="chatSection">
            <h3>Messages</h3>
            <div className="chatContent">
              <Suspense fallback={<div className="loading">Loading chats...</div>}>
                <Await
                  resolve={data.chatResponse}
                  errorElement={<div className="error">Error loading chats!</div>}
                >
                  {(chatResponse) => <Chat chats={chatResponse.data}/>}
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;