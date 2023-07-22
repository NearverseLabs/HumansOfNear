import React, { useState, MouseEvent, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import { IconButton } from "@mui/material";
import { useSelector } from "store";
import useApi from "hooks/useApi";

import DetailMenu from "./DetailMenu";
import { HumanIcon } from "ui-component/SvgIcon";
import { MapProps, MyMarker, SelectedMarker, locationType } from "types";

import CursorImg from "assets/images/Cursor.png";

//@ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
const MAP_STYLE = process.env.REACT_APP_MAP_BOX_STYLE;

const MapComponent: React.FC<MapProps> = ({
  lng,
  lat,
  zoom,
  edit,
  setMyLocation,
}) => {
  const { getLocations } = useApi();

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { accountId, social, twitter, name } = user;

  const [markers, setMarkers] = useState<MyMarker>({});
  const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(
    null
  );

  const handleMapClick = (event: any) => {
    if (!isLoggedIn || !edit) return;
    if (selectedMarker) return;

    const { lngLat } = event;
    const location = { longitude: lngLat.lng, latitude: lngLat.lat };
    setSelectedMarker(null);
    setMyLocation(location);
    setMarkers({
      ...markers,
      [accountId]: {
        location,
        social,
        twitter,
        name,
      },
    });
  };

  const handleIconClick = (
    event: MouseEvent<HTMLButtonElement>,
    account: any,
    data: any
  ) => {
    setSelectedMarker({
      anchorEl: event.currentTarget,
      account,
      location: data.location,
      name: data.name,
      social: data.social,
      twitter: data.twitter,
    });
  };

  useEffect(() => {
    (async () => {
      await getLocations().then(({ data }: { data: locationType[] }) => {
        const result: MyMarker = {};
        data.forEach((item: locationType) => {
          const { latitude, longitude } = item;
          const { accountId, social, name, twitter } = item.user;
          result[accountId] = {
            location: { latitude, longitude },
            name,
            social,
            twitter,
          };
        });
        setMarkers(result);
      });
    })();
  }, []);

  return (
    <Map
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom,
      }}
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
      }}
      mapStyle={MAP_STYLE}
      onClick={handleMapClick}
      cursor={edit ? `url('${CursorImg}') 15 11, auto` : ""}
      mapboxAccessToken={ACCESS_TOKEN}
      interactiveLayerIds={["points"]}
    >
      {markers &&
        Object.entries(markers)
          .filter(([account, data]) => !!data.location?.latitude)
          .map(([account, data]) => (
            <Marker
              longitude={data.location.longitude}
              latitude={data.location.latitude}
              anchor="bottom"
              key={account}
            >
              <IconButton
                sx={{ color: account === accountId ? "yellow" : "white" }}
                onClick={(e) => handleIconClick(e, account, data)}
              >
                <HumanIcon />
              </IconButton>
            </Marker>
          ))}
      {selectedMarker && (
        <DetailMenu marker={selectedMarker} setMarker={setSelectedMarker} />
      )}
    </Map>
  );
};

export default MapComponent;
