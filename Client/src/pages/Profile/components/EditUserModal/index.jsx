import {GrClose} from "react-icons/gr";
import Input from "./../../../../components/Input"
import {handleCloseModal} from "../../../../utils/closeModal";
import {useContext, useRef, useState} from "react";
import {handleChange} from "../../../../utils/handleChange";
import {postRequest} from "../../../../utils/requests";
import {AuthContext} from "../../../../Context/AuthContext";
import GooglePlacesAutocomplete from "react-google-places-autocomplete"

const index = ({setShowEditUserModal}) => {

    const {user, dispatch} = useContext(AuthContext);
    const {name} = user;
    const {location, bio, nickname} = user.profile;
    const [value,
        setValue] = useState(null)

    let [inputs,
        setInputs] = useState({
        name: name || "",
        nickname: nickname || "",
        location: location || "",
        bio: bio || ""
    });
    const boxRef = useRef();

    const handleInputChange = (e) => {
        handleChange(e, setInputs)
    };

    const handleEditUserInfo = async() => {
        dispatch({type: "EDIT_USER_INFO", payload: inputs});
        setShowEditUserModal(false)

        await postRequest("/user/edit-profile", inputs)
    }

    const closeModal = (e) => handleCloseModal(e, boxRef, setShowEditUserModal);

    return (
      <div
        onClick={closeModal}
        className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen bg-black/40 dark:bg-black/60 z-50 flex items-center justify-center px-2 overflow-hidden max-h-screen"
      >
        <form
          onSubmit={handleEditUserInfo}
          ref={boxRef}
          className="flex flex-col gap-6 p-4 bg-white rounded-md w-full max-w-[650px] dark:bg-grayMedium"
        >
          <div className="flex items-center justify-between pb-2 border-b-2 dark:border-black">
            <div className="text-lg font-semibold text-primary">
              Edit your profile data
            </div>
            <div
              onClick={() => setShowEditUserModal(false)}
              className="bg-gray-200 w-[35px] h-[35px] flex items-center justify-center rounded-full cursor-pointer"
            >
              <GrClose size={20} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Input
              label="Name"
              name="name"
              value={inputs.name}
              handleChange={handleInputChange}
            />
            <Input
              label="Nickname"
              name="nickname"
              value={inputs.nickname}
              handleChange={handleInputChange}
            />
            <Input
              label="Location"
              name="location"
              value={inputs.location}
              handleChange={handleInputChange}
            />
            {/* <GooglePlacesAutocomplete
              apiKey="AIzaSyDnPR28CLrGzTeXpjJtKM_Gasr79C6Yky0"
              selectProps={{
                value,
                onChange: setValue,
              }}
            /> */}
            <div className="flex flex-col gap-1">
              <label className="text-md font-medium" htmlFor="about">
                About
              </label>
              <textarea
                id="about"
                onChange={handleInputChange}
                name="bio"
                className="p-2 rounded-md border-2 bg-transparent dark:border-black outline-none scrollbar-hide h-[100px]"
                type="text"
                value={inputs.bio}
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-primary text-white p-2 rounded-md mt-4 font-medium"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    );
};

export default index;
