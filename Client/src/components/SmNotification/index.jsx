import {handleRequestAction} from "../../utils/handleNotification";
import NotificationButton from "./../../components/NotificationButton"
import ProfilePicture from "./../../assets/ProfilePicture.jpg"

const index = ({
    _id,
    sender,
    content,
    community,
    type,
    setNotifications
}) => {

    const handleAction = (e, action) => {
        handleRequestAction(e, action, type, sender, community, setNotifications, _id);
    };

    return (
      <div className="notification flex flex-col gap-3 border-b-2 border-b-grayHard px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-full flex items-center justify-center overflow-hidden">
            <img
              className="object-cover min-w-[35px] min-h-[35px] max-w-[35px] max-h-[35px] rounded-full flex items-center justify-center overflow-hidden"
              src={sender.profile.profileImage || ProfilePicture}
              alt="profile-picture"
            />
          </div>
          <div>{content}</div>
        </div>
        {!type.split(" ").includes("accepted") ? (
          <div className="flex gap-4">
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
