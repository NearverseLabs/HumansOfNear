import * as React from "react";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { AppBar, Box, CssBaseline, Toolbar, Stack } from "@mui/material";
import Header from "./Header";

const MainLayout = () => {
  const header = useMemo(
    () => (
      <Toolbar sx={{ height: "100%", p: "30px 40px !important" }}>
        <Header />
      </Toolbar>
    ),
    []
  );

  return (
    <>
      <CssBaseline />
      <AppBar
        sx={{ width: "100%", position: "absolute", zIndex: 1 }}
        color="inherit"
        elevation={0}
        position="relative"
      >
        {header}
      </AppBar>
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default MainLayout;
