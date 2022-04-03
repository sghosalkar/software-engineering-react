import React, {useEffect, useState} from "react";
import {useNavigate, Route, Routes, Link, useLocation} from "react-router-dom";
import * as service from "../../services/auth-service";
import MyTuits from "./my-tuits";
import TuitsAndReplies from "./tuits-and-replies";
import Media from "./media";
import MyLikes from "./my-likes";
import MyDislikes from "./my-dislikes";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await service.profile();
        setProfile(user);
      } catch (e) {
        navigate('/login');
      }
    }
    fetchData();
  }, []);
  const logout = () => service.logout().then(() => navigate('/login'));

  return(
    <div>
      <h4>{profile.username}</h4>
      <h6>@{profile.username}</h6>
      <button onClick={logout}>Logout</button>

      <ul className="mt-4 nav nav-pills nav-fill">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname.indexOf('mytuits') >= 0 ? 'active':''}`}
                to="/profile/mytuits">Tuits</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname.indexOf('tuits-and-replies') >= 0 ? 'active':''}`}
                to="/profile/tuits-and-replies">Tuits & replies</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname.indexOf('media') >= 0 ? 'active':''}`}
                to="/profile/media">Media</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname.indexOf('mylikes') >= 0 ? 'active':''}`}
                to="/profile/mylikes">Likes</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname.indexOf('mydislikes') >= 0 ? 'active':''}`}
                to="/profile/mydislikes">Dislikes</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/mytuits" element={<MyTuits/>}/>
        <Route path="/tuits-and-replies" element={<TuitsAndReplies/>}/>
        <Route path="/media" element={<Media/>}/>
        <Route path="/mylikes" element={<MyLikes/>}/>
        <Route path="/mydislikes" element={<MyDislikes/>}/>
      </Routes>

    </div>
  );
};
export default Profile;
