import React, { createContext } from "react";
import axios from "utils/axios";
import {
  ApiContextType,
  SigninDataType,
  ProfileType,
  MarkerProps,
} from "types";

const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider = ({ children }: { children: React.ReactElement }) => {
  //auth
  const signin = async (data: SigninDataType) => {
    return await axios.post("auth", data);
  };
  const changeProfile = async (data: ProfileType) => {
    return await axios.put("auth", data);
  };

  //location
  const getLocations = async () => {
    return await axios.get("location");
  };
  const saveMyLocation = async (data: MarkerProps) => {
    return await axios.post("location", data);
  };

  return (
    <ApiContext.Provider
      value={{
        signin,
        changeProfile,
        getLocations,
        saveMyLocation,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
