import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { setupPopupHandler } from "../utils/popup";
import { setupPointerHandler } from "../utils/pointer";
import { onMapLoad } from "../utils/onMapLoad";
import { LegendItem } from "./LegendItem";

const CIRCLE_LAYER_ID = "universities_circle";

const MapView = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [circleVisible, setCircleVisible] = useState(true);

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    const map = new maplibregl.Map({
      container: mapContainerRef.current!,
      style: "styles/style.json",
      center: [137.071, 36.243],
      zoom: 6,
      minZoom: 4,
      pitch: 60,
      hash: true,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => onMapLoad(map));

    setupPopupHandler(map);
    setupPointerHandler(map);

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (map.getLayer(CIRCLE_LAYER_ID)) {
      map.setLayoutProperty(
        CIRCLE_LAYER_ID,
        "visibility",
        circleVisible ? "visible" : "none"
      );
    }
  }, [circleVisible]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1,
          background: "rgba(255,255,255,0.8)",
          padding: "6px 12px",
          borderRadius: "4px",
        }}
      >
        <label>
          <input
            type="checkbox"
            checked={circleVisible}
            onChange={(e) => setCircleVisible(e.target.checked)}
          />
          柱状表示
        </label>
      </div>
      <div
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
          zIndex: 1,
          background: "rgba(255,255,255,0.85)",
          padding: "8px 14px",
          borderRadius: "4px",
          fontSize: "14px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 4 }}>大学偏差値凡例</div>
        <div style={{ fontSize: "12px", marginBottom: 4 }}>※文系偏差値は-7補正</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <LegendItem color="rgb(255, 217, 102)" label="70-" />
          <LegendItem color="rgb(255, 247, 209)" label="65–69" />
          <LegendItem color="rgb(231, 99, 80)" label="60–64" />
          <LegendItem color="rgb(118, 166, 77)" label="50–59" />
          <LegendItem color="rgb(91, 155, 213)" label="-49" />
        </div>
      </div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
    </>
  );
};

export default MapView;
