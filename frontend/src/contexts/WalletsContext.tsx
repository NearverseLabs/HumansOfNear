import React, { createContext, useEffect, useState } from "react";
import { WalletConnection, connect } from "near-api-js";
import { config } from "config";
import { useSelector, useDispatch } from "store";
import {
  removeAccount,
  setAccount,
  setLoading,
  showDialog,
} from "store/reducers/auth";
import { WalletType, WalletContextType, ResUserType } from "types";
import useApi from "hooks/useApi";
import axios from "axios";

const NearContext = createContext<WalletContextType | null>(null);

export const NearProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { signinState } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [wallet, setWallet] = useState<WalletType>(null);
  const { signin } = useApi();

  useEffect(() => {
    (async () => {
      const _near = await connect(config);
      const _wallet = new WalletConnection(_near, "my-app");
      setWallet(_wallet);
    })();
  }, []);

  //@ts-ignore
  const getTransactionHistory = async (
    accountId: string,
    limit: number,
    cursor: any = null
  ) => {
    try {
      const jsonObject: any = {
        "0": {
          accountId: accountId,
          // receipt_id : "fractal.i-am-human.near",
          limit: limit,
        },
      };

      if (cursor) {
        jsonObject[0].cursor = cursor;
      }

      const jsonString = JSON.stringify(jsonObject);
      const response = await axios.get(
        "https://explorer-backend-mainnet-prod-24ktefolwq-uc.a.run.app/trpc/transaction.listByAccountId",
        {
          params: {
            batch: 0,
            input: jsonString,
          },
        }
      );
      const res = response.data[0].result;

      if (!res.data.items.length) return false;

      const index = res.data.items.findIndex(
        (item: any) =>
          item.receiverId === "fractal.i-am-human.near" &&
          item.status === "success" &&
          item.actions[0].args.methodName === "sbt_mint"
      );

      if (index !== -1) return true;
      else if (index === -1 && res.data.items.length < 100) return false;
      else if (index === -1 && res.data.items.length === 100) {
        return await getTransactionHistory(accountId, limit, res.data.cursor);
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const disconnectWallet = async () => {
    if (!wallet) return;

    wallet.signOut();
    dispatch(removeAccount());
  };

  const connectWallet = async () => {
    try {
      if (!wallet) return;

      const walletAccountId = wallet.getAccountId();
      if (!walletAccountId) return;

      // const { accessKey }: any = await account.findAccessKey(
      //   "fractal.i-am-human.near"
      // );
      dispatch(setLoading(true));
      const state = await getTransactionHistory(walletAccountId, 100);

      if (!state) {
        disconnectWallet();
        dispatch(showDialog("failed"));
      } else {
        const param = {
          accountId: walletAccountId,
        };
        await signin(param).then(({ data }: { data: ResUserType }) => {
          if (signinState) dispatch(showDialog("signin"));
          dispatch(setAccount(data));
          return;
        });
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  return (
    <NearContext.Provider value={{ wallet, connectWallet, disconnectWallet }}>
      {children}
    </NearContext.Provider>
  );
};

export default NearContext;
