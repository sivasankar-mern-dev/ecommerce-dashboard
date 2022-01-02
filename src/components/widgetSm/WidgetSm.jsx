import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { userRequest } from '../../requestMethods';

export default function WidgetSm() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get("users");
        setUsers(res.data);
      } catch (e) {
        console.log(e)
      }
    }
    getUser();
  }, [])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {
          users.map(user => (
            <li className="widgetSmListItem" key={user._id}>
              <img
                src={user.img || "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"}
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
                <span className="widgetSmUserTitle">{user.email}</span>
              </div>
              <button className="widgetSmButton">
                <Visibility className="widgetSmIcon" />
                Display
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
