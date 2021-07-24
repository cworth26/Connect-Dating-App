import React, { createContext, useContext, useReducer } from 'react';
import { LOADING, LOGIN, LOGOUT, UPDATE_MESSAGES,SET_USER, UNSET_USER, SET_MESSAGES } from './actions';

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return {
        ...state,
        loading: true,
      };

    case SET_USER:
      return {
        ...state,
        user: action.user,
        loading: false,
      };

    case UNSET_USER:
      return {
        ...state,
        user: null,
        loading: false,
      };

    case LOADING: 
      return {
        ...state,
        loading: true
      }

    case SET_MESSAGES:

      return {
        ...state,
        chatRoomData: action.chatData
      }



    case UPDATE_MESSAGES:

      const newChatRoomData = state.chatRoomData.map(obj => {
        console.log("UPDATE_MESSAGES", obj.socketRoomName === action.message.socketRoomName)
        if(obj.socketRoomName === action.message.socketRoomName) {
          obj.messages.push(action.message);
        }
        return obj;
      });
  

      return {
        ...state,
        chatRoomData: newChatRoomData
      }

    default:
      return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    loading: false,
    chatRoomData: null
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
