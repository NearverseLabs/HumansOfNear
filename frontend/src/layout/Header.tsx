import React, { useEffect } from "react";
import { Stack, Box, Button, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "store";
import { setSignin } from "store/reducers/auth";

import LogoImg from "assets/images/logo.svg";
import useWallet from "hooks/useWallets";

const Header = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const signIn = () => {
    if (!wallet) return;
    dispatch(setSignin(true));
    wallet.requestSignIn({});
  };

  const signOut = () => {
    if (!wallet) return;
    disconnectWallet();
  };

  useEffect(() => {
    if (wallet) connectWallet();
  }, [wallet]);

  return (
    <>
      {/* <Container> */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: "100%",
        }}
      >
        <a href={"/"} style={{ display: "flex", cursor: "pointer" }}>
          <Box className="Logo">
            <Box component="img" src={LogoImg} />
          </Box>
        </a>

        <Button
          variant="contained"
          sx={{
            gap: 1,
          }}
          onClick={() => {
            if (!isLoggedIn) signIn();
            else signOut();
          }}
        >
          {!wallet && loading && <CircularProgress size={20} />}
          {`${!isLoggedIn ? "Connect" : "DISCONNECT"} Wallet`}
        </Button>
      </Stack>
    </>
  );
};

export default Header;
