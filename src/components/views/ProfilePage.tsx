import React, { useEffect, useState } from "react";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import {json, useNavigate, useParams} from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/ProfilePage.scss";
import { User } from "types";



const Player = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user.username);
  const [editedBirthday, setEditedBirthday] = useState(user.birthday);

  const sendEdit = async () => {
    setIsEditing(false);
    try {
      const requestBody = JSON.stringify({ id:user.id, username: editedUsername, birthday: editedBirthday, token: userToken });
      const response = await api.put("/users", requestBody);

      const getUpdate = async () => {
        const response2 = await api.get(`/users/${user.id}`);
        console.log("GET response on Edit", response2);
        setEditedUsername(response2.data.username);
        setEditedBirthday(response2.data.birthday);
      }
      getUpdate();

    } catch (error) {
      setEditedUsername(user.username); // in case user not authorized to change or username taken
      setEditedBirthday(user.birthday);
      alert(
        `Something went wrong during updating the profile: \n${handleError(error)}`
      );
    }
  };

  return(
    <div className="player container">
      <div className="player details">
        <div className="player label">Username:</div>
        {isEditing ? (
          <input
            type="text"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
          />
        ) : (
          <div className="player value">
            {editedUsername}
          </div>
          )}
        </div>

      <div className="player details">
        <div className="player label">Online Status:</div>
        <div className="player value">{user.status}</div>
      </div>

      <div className="player details">
        <div className="player label">Creation Date:</div>
        <div className="player value">{user.creation_date}</div>
      </div>

      <div className="player details">
        <div className="player label">Birthday (DD-MM-YYYY):</div>
        {isEditing ? (
          <input
            type="text"
            value={editedBirthday}
            onChange={(e) => setEditedBirthday(e.target.value)}
          />
        ) : (
          <div className="player value">
            {editedBirthday}
          </div>
          )}
          
        </div>
      <span style={{ margin: "10px 0" }}></span>
        <div className="player details" >

        {isEditing ? (
          <Button width="100%"
            onClick={() =>
            sendEdit()}>
            Save
          </Button>


        ) : (
          <Button width="100%"
            onClick={() =>
              setIsEditing(true)}>
            Edit
          </Button>

        ) }
        <span style={{ margin: "0 5px" }}></span>
        <Button width="100%" onClick={() => navigate("/game")}>
          Go to Profilelist
        </Button>
        </div>

    </div>
  
  );
};

Player.propTypes = {
  user: PropTypes.object,
};

const ProfilePage = () => {
  // use react-router-dom's hook to access navigation, more info: https://reactrouter.com/en/main/hooks/use-navigate 
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(null);
  let userId = useParams();

  useEffect(() => {
    // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
    async function fetchData() {
      try {
        //const requestBody = null;
        let numericUserId = userId["*"];
      
        const response = await api.get(`/users/${numericUserId}`);
        
        await new Promise((resolve) => setTimeout(resolve, 200));

        // Get the returned users and update the state.
        setUsers(response.data);
        
        // This is just some data for you to see what is available.
        // Feel free to remove it.
        console.log("request to:", response.request.responseURL);
        console.log("status code:", response.status);
        console.log("status text:", response.statusText);
        console.log("requested data:", response.data);

        // See here to get more data.
        console.log(response);
        
      } catch (error) {
        console.error(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
        console.error("Details:", error);
        alert(
          `Something went wrong while fetching the users: \n${handleError(
            error
          )}`
        );
      }
    }

    fetchData();
  }, []);

  let content = <Spinner />;
  console.log("Render Data:", users);
  if (users) {
    content = (
      <div className="profilepage">
        <ul className="profilepage user-list">
          {
              <Player user={users}/>
          }
        </ul>

      </div>
    );
  }

  return (
    <BaseContainer className="profilepage container">
      <h2>Profile Page</h2>
      <p className="profilepage paragraph">
        User&apos;s credentials
      </p>
      {content}
    </BaseContainer>
  );
};

export default ProfilePage;
