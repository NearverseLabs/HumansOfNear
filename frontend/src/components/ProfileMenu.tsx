import React, { useState } from "react";
import { Menu, Typography, Stack, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "store";
import { changeUser } from "store/reducers/auth";
import useApi from "hooks/useApi";
import { UserType } from "types";
import snackbar from "utils/snackbar";
import { SOCIAL, TWITTER } from "config";

const ProfileMenu = (props: any) => {
  const { anchorEl, setAnchorEl } = props;
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { changeProfile } = useApi();

  const { social, twitter, name, accountId } = user;
  const [displayName, setDisplayName] = useState<string>(
    name ? name : accountId
  );
  const [mySocial, setMySocial] = useState<string>(social);
  const [myTwitter, setMyTwitter] = useState<string>(twitter);

  const changeName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 12) setDisplayName(e.target.value);
  };

  const changeSocial = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.indexOf(SOCIAL) === 0) setMySocial(e.target.value);
  };

  const changeTwitter = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.indexOf(TWITTER) === 0) setMyTwitter(e.target.value);
  };

  const handleSaveBtn = async () => {
    const { data }: { data: UserType } = await changeProfile({
      name: displayName,
      social: mySocial,
      twitter: myTwitter,
    });
    snackbar({ message: "success", variant: "alert" });
    dispatch(changeUser(data));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          mt: 2,
          padding: 3,
          width: 400,
        },
      }}
    >
      <Stack gap={9.75}>
        <Stack>
          <Stack gap={2}>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Your Profile
            </Typography>
            <Typography>Be careful with your public data.</Typography>
          </Stack>
          <Stack gap={2} mt={3}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Display Name
            </Typography>
            <TextField
              placeholder="display name"
              value={displayName}
              onChange={changeName}
            />
          </Stack>
          <Stack gap={2} mt={3}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Near Social
            </Typography>
            <TextField
              placeholder="near social link"
              value={mySocial}
              onChange={changeSocial}
            />
          </Stack>
          <Stack gap={2} mt={3}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Twitter
            </Typography>
            <TextField
              placeholder="username: @demoacc"
              value={myTwitter}
              onChange={changeTwitter}
            />
          </Stack>
        </Stack>
        <Stack sx={{ alignItems: "flex-end" }}>
          <Button
            variant="contained"
            color="secondary"
            disabled={
              displayName === (name ? name : accountId) &&
              mySocial === social &&
              myTwitter === twitter
            }
            sx={{ width: "fit-content" }}
            onClick={handleSaveBtn}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </Menu>
  );
};
export default ProfileMenu;
