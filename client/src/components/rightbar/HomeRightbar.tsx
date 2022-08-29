import { FC, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PC } from "../../globals";
// import { AuthContext } from "../../context/auth.context";
import { OnlineFriend } from "../onlineFriend/OnlineFriend";

interface HomeRightbarProps {}

export const HomeRightbar: FC<HomeRightbarProps> = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  // const { user } = useContext(AuthContext);

  // useEffect(() => {
  //   // let followingIds = user.followingObj.map((u: any) => u._id);
  //   ws.on("get-users", (users: any) => {
  //     console.log(users);
  //     setOnlineUsers(
  //       user.followingObj.filter((f: any) => users.some((u: any) => u.userId === f._id)) /* followingIds.filter((f: any) => users.some((u: any) => u.userId === f)) */
  //     );
  //   });
  // }, [user.followingObj, ws]);

  return (
    <>
      <div className="rightbarBirthdays">
        <img
          src={`${PC}assets/images/gift.png`}
          alt="Birthday gift"
          className="rightbarBirthdayImage"
          draggable={false}
        />
        <span className="rightbarBirthdayText">
          <b>Abdeljalil</b> and <b>2 other friends</b> have a birthday today.
        </span>
      </div>
      <div className="rightbarAds">
        <span className="rightbarAdText">Advertisement</span>
        <Link to="/" draggable={false}>
          <img
            src={`${PC}assets/images/schema.png`}
            alt="MyMedia Ads"
            className="rightbarAdImage skeleton"
            draggable={false}
          />
        </Link>
      </div>
      <div className="rightbarOnline">
        <h4 className="rightbarOnlineTitle">Online Friends</h4>
        <div className="rightbarOnlineList">
          {onlineUsers?.map((u, i) => (
            <OnlineFriend key={i} user={u} />
          ))}
        </div>
      </div>
    </>
  );
};
