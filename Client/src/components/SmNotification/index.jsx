import { handleRequestAction } from "../../utils/handleNotification";
import NotificationButton from "./../../components/NotificationButton"

const index = ({ _id, sender, content, community, type, setNotifications }) => {
  
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
    <div className="notification flex flex-col gap-3 border-b-2 border-b-grayHard px-4 py-4">
      <div>{content}</div>
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
