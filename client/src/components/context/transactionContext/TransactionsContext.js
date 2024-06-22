import React, { createContext, useReducer } from "react";
import axios from "axios";
import {
  TRANSACTION_CREATION_STARTED,
  TRANSACTION_CREATION_SUCCES,
  TRANSACTION_CREATION_FAIL,
  TRANSACTION_UPDATE_SUCCES,
  TRANSACTION_UPDATE_FAIL,
  TRANSACTION_DELETE_SUCCES,
  TRANSACTION_DELETE_FAIL,
} from "./transactionActionTypes";
import { API_URL_TRANSACTION } from "../../../utils/apiURL";

export const transactionContext = createContext();

const INITIAL_STATE = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("userAuth")),
};
const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_CREATION_SUCCES:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case TRANSACTION_UPDATE_SUCCES:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case TRANSACTION_DELETE_SUCCES:
      return {
        ...state,
        loading: false,
        transaction: null,
      };
    case TRANSACTION_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, INITIAL_STATE);

  //create account
  const createTransactionAction = async accountData => {
    try {
      //header
      console.log(accountData.account);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.post(API_URL_TRANSACTION, accountData, config);
      console.log(res);
      if (res?.data?.status === "success") {
        dispatch({ type: TRANSACTION_CREATION_SUCCES, payload: res?.data });
      }
      window.location.href = `/account-details/${accountData.account}`;
    } catch (error) {
      console.log(error);
      dispatch({
        type: TRANSACTION_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  const editTransactionAction = async (accountData,id) => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.put(`${API_URL_TRANSACTION}/${id}`, accountData, config);
      console.log(res);
      if (res?.data?.status === "success") {
        dispatch({ type: TRANSACTION_UPDATE_SUCCES, payload: res?.data });
      }
      window.location.href = `/account-details/${accountData.account}`;
    } catch (error) {
      console.log(error);
      dispatch({
        type: TRANSACTION_UPDATE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  const deleteTransactionAction = async (accountId,id) => {
    try {
      //header
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };
      //request
      const res = await axios.delete(`${API_URL_TRANSACTION}/${id}`, config);
      console.log(res);
      if (res?.data?.status === "success") {
        dispatch({ type: TRANSACTION_DELETE_SUCCES, payload: res?.data });
      }
      window.location.href = `/account-details/${accountId}`;
    } catch (error) {
      console.log(error);
      dispatch({
        type: TRANSACTION_DELETE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <transactionContext.Provider
      value={{
        transaction: state.transaction,
        transactions: state.transactions,
        createTransactionAction,
        error: state?.error,
        editTransactionAction,
        deleteTransactionAction,
      }}
    >
      {children}
    </transactionContext.Provider>
  );
};
