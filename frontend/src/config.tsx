import * as nearAPI from "near-api-js";

const { keyStores } = nearAPI;
const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const NEAR_ENV: string = "mainnet";

export const config =
  NEAR_ENV === "testnet"
    ? {
        networkId: "testnet",
        keyStore,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      }
    : {
        networkId: "mainnet",
        keyStore,
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
      };

export const VIEWER_ADDRESS: string =
  NEAR_ENV === "testnet" ? "s5.devx.testnet" : "fractal.i-am-human.near";

export const CONTRACT_ADDRESSES =
  NEAR_ENV === "testnet"
    ? ["t3.devx.testnet"]
    : [
        "secretskelliessociety.near",
        "grimms.secretskelliessociety.near",
        "estates.secretskelliessociety.near",
        "undead.secretskelliessociety.near",
      ];

export const STAKING_CONTRACT = "fractal.i-am-human.near";
export const HOME_PATH = "/";
export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:2003/api";

export const SOCIAL = "https://social.near.page/u/";
export const TWITTER = "https://twitter.com/";
