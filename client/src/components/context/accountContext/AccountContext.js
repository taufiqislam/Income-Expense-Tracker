import axios from "axios";
import { createContext, useReducer } from "react";
import { API_URL_ACCOUNT } from "../../../utils/apiURL";
import { ACCOUNT_CREATION_FAIL, ACCOUNT_CREATION_SUCCES, ACCOUNT_DETAILS_FAIL, ACCOUNT_DETAILS_SUCCESS } from "./accountActionTypes";

export const accountContext = createContext();

const INITIAL_STATE = {
    userAuth: JSON.parse(localStorage.getItem("userAuth")),
    account: null,
    accounts: [],
    loading: false,
    error: null,
};

const accountReducer = (state, action)=>{
    const {type, payload} = action;
    switch(type){
        case ACCOUNT_CREATION_SUCCES:
            return {
                ...state,
                account: payload,
                loading: false,
                error: null,
            }
        case ACCOUNT_CREATION_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
            }
        case ACCOUNT_DETAILS_SUCCESS:
            return {
                ...state,
                account: payload,
                loading: false,
                error: null,
            }
        case ACCOUNT_DETAILS_FAIL:
            return {
                ...state,
                account: null,
                loading: false,
                error: payload,
            }
        default:
            return state;
    }

    
}


export const AccountContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);
    console.log(state);
    const getAccountDetailsAction = async (id) => {
        const config = {
            headers: {
                authorization: `Bearer ${state?.userAuth?.token}`,
                "Content-Type": "application/json",
            }
        }
        try {
            const res = await axios.get(`${API_URL_ACCOUNT}/${id}`,config);
            if(res?.data?.status === "success"){
                dispatch({
                    type: ACCOUNT_DETAILS_SUCCESS,
                    payload: res?.data,
                });
            }
            
        } catch (error) {
            dispatch({
                type: ACCOUNT_DETAILS_FAIL,
                payload: error?.response?.data?.message,
            })
        }
    };

    const createAccountAction = async (formData) => {
        
        const config = {
            headers: {
                authorization: `Bearer ${state?.userAuth?.token}`,
                "Content-Type": "application/json",
            }
        }
        try {
            console.log(formData);
            const res = await axios.post(`${API_URL_ACCOUNT}`,formData,config);
            if(res?.data?.status === "success"){
                dispatch({
                    type: ACCOUNT_CREATION_SUCCES,
                    payload: res?.data,
                });
            }
            window.location.href = '/dashboard';
            
        } catch (error) {
            console.log(error);
            dispatch({
                type: ACCOUNT_CREATION_FAIL,
                payload: error?.response?.data?.message,
            })
        }
    };

    return (
        <accountContext.Provider value={{
            getAccountDetailsAction, 
            account: state?.account?.data,
            error: state?.error,
            createAccountAction,
        }}>
            {children}
        </accountContext.Provider>
    );
};