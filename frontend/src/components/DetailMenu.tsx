import React, { useState, useEffect } from "react";
import { Menu, Typography, Stack, IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import { DetailIcon, SocialIcon } from "ui-component/SvgIcon";
import { SOCIAL, TWITTER } from "config";

const DetailMenu = ({ marker, setMarker }: any) => {
  const { anchorEl } = marker;
  const open = Boolean(anchorEl);

  const [title, setTitle] = useState<string>("");

  const handleClose = () => {
    setMarker(null);
  };

  const handleLink = (newLink: string) => {
    window.open(newLink, "_blank");
  };

  useEffect(() => {
    const near = marker.account.indexOf(".near");
    if (marker.name) setTitle(marker.name);
    else if (near !== -1) setTitle(marker.account);
    else setTitle(`${marker.account.slice(0, 12)}...`);
  }, [marker]);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          padding: "20px",
        },
      }}
    >
      <Stack gap={1.5} flexDirection="row">
        <DetailIcon />
        <Stack gap={1.75}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {title}
          </Typography>
          <Stack gap={2} flexDirection="row">
            <IconButton
              sx={{ padding: 0 }}
              disabled={marker.social === SOCIAL}
              onClick={() => handleLink(marker.social)}
            >
              <SocialIcon />
            </IconButton>
            <IconButton
              sx={{ padding: 0 }}
              disabled={marker.twitter === TWITTER}
              onClick={() => handleLink(marker.twitter)}
            >
              <TwitterIcon fontSize="small" sx={{ fontSize: 30 }} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </Menu>
  );
};
export default DetailMenu;
