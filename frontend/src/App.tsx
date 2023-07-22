import React, { useMemo } from "react";

import AppRoutes from "./routes";
import { ApiProvider } from "contexts/ApiContext";
import { NearProvider } from "contexts/WalletsContext";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default function App() {
  return (
    // <ConnectionProvider endpoint={endpoint}>
    <ApiProvider>
      <NearProvider>
        <AppRoutes />
      </NearProvider>
    </ApiProvider>
    // </ConnectionProvider>
  );
}
