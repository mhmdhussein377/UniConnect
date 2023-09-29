import { handleRequestAction } from "../../utils/handleNotification";
import NotificationButton from "./../../components/NotificationButton"
import ProfilePicture from "./../../assets/ProfilePicture.jpg"

const index = ({ notification, setNotifications, getCommunities }) => {
  const { content, sender, type, _id, community } = notification;

  console.log(notification, "notification")

  const handleAction = (e, action) => {
    handleRequestAction(
      e,
      action,
      type,
      sender,
      community,
      setNotifications,
      _id
    );
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-full flex items-center justify-center overflow-hidden">
          <img
            className="object-cover min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-full flex items-center justify-center overflow-hidden"
            src={sender.profile.profileImage || ProfilePicture}
            alt="profile-picture"
          />
        </div>
        <div className="flex flex-row items-center gap-2 flex-wrap">
          {content}
        </div>
      </div>
      {!type.split(" ").includes("accepted") ? (
        <div className="flex items-center gap-4">
          <NotificationButton
            text={"Accept"}
            handleAction={handleAction}
            action={"accept"}
          />
          <NotificationButton
            text={"Reject"}
            handleAction={handleAction}
            action={"reject"}
          />
        </div>
      ) : null}
    </div>
  );
};

export default index;
