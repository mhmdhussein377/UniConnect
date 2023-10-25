import React from "react";
import Member from "./../../components/Member"

const index = ({friends, currentUser}) => {
    return (
      <div className="bg-white dark:bg-black dark:text-white drop-shadow-lg max-w-full p-4 rounded-md h-fit flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="font-semibold text-lg text-primary">Friends</div>
          <div className="flex flex-col gap-4">
            {friends.length > 0 ? (
              friends.map((friend, index) => (
                <Member online={friend.online} key={index} member={friend} />
              ))
            ) : (
                <React.Fragment>
                    <div className="flex flex-col items-center gap-1 mt-2">
                        <h1 className="font-semibold text-xl">
                            {currentUser
                            ? "Your Friendship Story Begins Here"
                            : "A Blank Canvas"}
                        </h1>
                        <h3 className={`font-medium text-lg ${!currentUser && "text-center"}`}>
                            {currentUser
                            ? "Add Friends Today!"
                            : "This user's friendship palette is waiting for colors."}
                        </h3>
                    </div>
                </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
}

export default index