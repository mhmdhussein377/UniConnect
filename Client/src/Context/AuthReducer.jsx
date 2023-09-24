const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {user: null, isFetching: true, error: false};
        case "LOGIN_SUCCESS":
            return {user: action.payload, isFetching: false, error: false};
        case "LOGIN_FAILURE":
            return {user: null, isFetching: false, error: true};
        case "EDIT_EDUCATIONAL_INFO":
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: {
                        ...state.user.profile,
                        university: action.payload.university,
                        major: action.payload.major
                    }
                }
            };
        case "EDIT_SKILLS":
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: {
                        ...state.user.profile,
                        skills: action.payload
                    }
                }
            };
        case "EDIT_PROFILE_IMAGES":
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: {
                        ...state.user.profile,
                        ...(action.payload.profileImage && {profileImage: action.payload.profileImage}),
                        ...(action.payload.coverImage && {coverImage: action.payload.coverImage})
                    }
                }
            }
        case "EDIT_LANGUAGES":
            return {
                ...state,
                user: {
                    ...state.user,
                    profile: {
                        ...state.user.profile,
                        languages: action.payload
                    }
                }
            };
        case "EDIT_USER_INFO":
            let {name, ...others} = action.payload;
            return {
                ...state,
                user: {
                    ...state.user,
                    name,
                    profile: {
                        ...state.user.profile,
                        ...others
                    }
                }
            };
        case "SET_JOINED_COMMUNITIES":
            return {
                ...state,
                user: {
                    ...state.user,
                    joinedCommunities: action.payload
                }
            }
        case "LEAVE_COMMUNITY":
            return {
                ...state,
                user: {
                    ...state.user,
                    joinedCommunities: state.user.joinedCommunities.filter(comm => comm._id !== action.payload)
                }
            }
        // case "JOIN_COMMUNITY":
        //     return {
        //         ...state,
        //         user: {
        //             ...state.user,
        //             joinedCommunities: state.user.joinedCommunities.push(action.payload)
        //         }
        //     }
        case "CREATE_COMMUNITY":
            console.log(action.payload)
            return {
                ...state,
                user: {
                    ...state.user,
                    createdCommunities: [action.payload, ...state.user.createdCommunities]
                }
            }
        case "DELETE_COMMUNITY":
            return {
                ...state,
                user: {
                    ...state.user,
                    createdCommunities: state.user.createdCommunities.filter(comm => comm._id !== action.payload)
                }
            }
        case "LOGOUT":
            return {user: null, isFetching: false, error: false};
        default:
            return state;
    }
};

export default AuthReducer;
