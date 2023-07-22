import React, { useState, MouseEvent } from "react";
import { Box, Button, Stack } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "store";
import useApi from "hooks/useApi";

import MapComponent from "components/Map";
import DialogWrapper from "components/Dialog";
import ProfileMenu from "components/ProfileMenu";
import { MarkerProps } from "types";

const HomePage = () => {
  const { saveMyLocation } = useApi();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [edit, setEdit] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [myLocation, setMyLocation] = useState<MarkerProps | null>(null);

  const handleProfileClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditLocation = () => {
    setEdit(!edit);
    if (edit && myLocation) {
      saveMyLocation(myLocation);
    }
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <Box>
            <Button
              variant="contained"
              endIcon={<ArrowDropDownIcon />}
              sx={{
                position: "fixed",
                left: 40,
                top: 130,
                zIndex: 1,
                "& svg": {
                  fontSize: "30px !important",
                },
              }}
              onClick={handleProfileClick}
            >
              Profile
            </Button>
            <Stack justifyContent="center" alignItems="center">
              <Button
                endIcon={<LocationOnIcon />}
                variant={!edit ? "text" : "contained"}
                color="secondary"
                sx={{
                  position: "fixed",
                  bottom: 50,
                  zIndex: 1,
                  "& svg": {
                    fontSize: "22px !important",
                  },
                }}
                onClick={handleEditLocation}
              >
                {`${!edit ? "Edit" : "Save"} location`}
              </Button>
            </Stack>
          </Box>

          <ProfileMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </>
      )}

      <Stack
        sx={{
          flexDirection: "row",
          width: "100vw",
          height: "100vh",
        }}
      >
        <MapComponent
          lng={0}
          lat={30}
          zoom={1.7}
          edit={edit}
          setMyLocation={setMyLocation}
        />
      </Stack>

      <DialogWrapper />
    </>
  );
};
export default HomePage;
