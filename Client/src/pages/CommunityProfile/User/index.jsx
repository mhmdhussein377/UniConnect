import {Link} from "react-router-dom";

const index = ({member, handleChange}) => {

    const {name, username, _id} = member;

    return (
        <div className="flex items-center justify-center gap-2 cursor-pointer">
            <Link to={`/profile/${username}`} className="flex items-center gap-2 flex-1">
                <div
                    className="rounded-full flex items-center justify-center overflow-hidden w-[45px] h-[45px]">
                    <img
                        src="https://img.freepik.com/free-photo/profile-shot-aristocratic-girl-blouse-with-frill-lady-with-flowers-her-hair-posing-proudly-against-blue-wall_197531-14304.jpg?w=360&t=st=1693254715~exp=1693255315~hmac=11fc761d3797e16d0e4b26b5b027e97687491af623985635a159833dfb9f7826"
                        alt="profile-picture"/>
                </div>
                <div className="flex flex-col gap-0">
                    <div>{name}</div>
                    <p className="text-sm">{username}</p>
                </div>
            </Link>
            <div>
                <input
                    value={_id}
                    onChange={handleChange}
                    type="checkbox"
                    className="w-[20px] h-[20px] cursor-pointer"/>
            </div>
        </div>
    );
}

export default index