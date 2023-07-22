import { ReactElement } from "react";
import { WalletConnection } from "near-api-js";

export type NetworkType = "mainnet" | "testnet";

export type MapProps = {
  lng: number;
  lat: number;
  zoom: number;
  edit: boolean;
  setMyLocation: any;
};

export type MarkerProps = {
  longitude: number;
  latitude: number;
};

export type MyMarker = {
  [key: string]: {
    location: MarkerProps;
    name: string;
    social: string;
    twitter: string;
  };
};

export type SelectedMarker = {
  anchorEl: null | HTMLElement;
  account: any;
  location: MarkerProps;
  name: string;
  social: string;
  twitter: string;
};

export type GuardProps = {
  children: ReactElement | null;
};

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export type UserType = {
  _id: string;
  accountId: string;
  avatar: string;
  name: string;
  social: string;
  twitter: string;
};

export type locationType = {
  longitude: number;
  latitude: number;
  user: UserType;
};

export type initialStateType = {
  token: string;
  user: UserType;
  dialog: "signin" | "failed" | "";
  isLoggedIn: boolean;
  loading: boolean;
  signinState: boolean;
};

export type ResUserType = {
  token: string;
  user: UserType;
};

export type SigninDataType = {
  accountId: string;
  // contracts: string;
};

export type ProfileType = {
  name: string;
  social: string;
  twitter: string;
};

export type WalletType = WalletConnection | null;

export type ApiContextType = {
  signin: (data: SigninDataType) => Promise<any>;
  changeProfile: (data: ProfileType) => Promise<any>;
  getLocations: () => Promise<any>;
  saveMyLocation: (data: MarkerProps) => Promise<any>;
};

export type WalletContextType = {
  wallet: WalletType;
  connectWallet: () => Promise<any>;
  disconnectWallet: () => Promise<any>;
};
