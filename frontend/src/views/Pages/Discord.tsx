// import React, { useEffect, useRef, useState } from "react";

// import { useSearchParams, useNavigate } from "react-router-dom";
// import Loading from "ui-component/Loading";

// import { BASE_PATH } from "config";
// import useApi from "hooks/userApi";
// import { useDispatch, useSelector } from "store";
// import { Login } from "store/reducers/auth";

const DiscordLogin = () => {
    // const { loginDiscord } = useApi();
    // const { isLoggedIn } = useSelector((state) => state.auth);

    // const navigate = useNavigate();
    // const [searchParams] = useSearchParams();
    // const discordCode = searchParams.get("code") || "1234";

    // const getDiscordData = async () => {
    //     if (discordCode) {
    //         await loginDiscord(discordCode)
    //     };
    // }

    // useEffect((): void => {
    //     if (isLoggedIn) {
    //         navigate(BASE_PATH);
    //     } else {
    //         getDiscordData();
    //     }
    // }, [])

    // return (
    //     <Loading height={"calc(100vh - 10px)"} />
    // );
};
export default DiscordLogin;
