import { useContext, useEffect } from "react";
import { authContext } from "../context/authContext/AuthContext";
import AccountSummary from "./AccountSummary";
import AccountList from "./AccountList";


const AccountDashboard = () => {
  const {profile, fetchProfileAction, error} = useContext(authContext);

  useEffect(()=>{
    fetchProfileAction();
  },[]);
  return (
    <>
      {error ? (<>
        <div
          className="bg-red-100 border text-center border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
          >
          <strong className="font-bold">Error!</strong> {""}
          <span className="block sm:inline ">{error}</span>
        </div>
        
      </>
      ) : (
        <>
          <AccountSummary accounts = {profile?.accounts}/>
          <AccountList accounts = {profile?.accounts}/>
        </>
      )}
      
    </>
  );
};

export default AccountDashboard;
