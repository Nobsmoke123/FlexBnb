"use client";

import { useState, useEffect } from "react";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl/mapbox";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Loading from "./Loading";
import { Property } from "@/models/Property";

const PropertyMap: React.FC<{ property: Property }> = ({ property }) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mapError, setMapError] = useState("");

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY!,
    language: "en",
    outputFormat: OutputFormat.JSON,
    region: "us",
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        setIsLoading(true);
        const res = await fromAddress(
          `${property.location.street}${property.location.city}${property.location.state}${property.location.zipcode}`
        );

        const { lat, lng } = res.results[0].geometry.location;

        setLat(lat);
        setLng(lng);
        setViewport((prev) => ({ ...prev, latitude: lat, longitude: lng }));
      } catch (error) {
        console.log("The error is: ");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Map
      accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY!}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY!}
      style={{ width: viewport.width, height: viewport.height }}
      mapStyle={"mapbox://styles/mapbox/streets-v9"}
      scrollZoom={true}
      initialViewState={{
        latitude: lat,
        longitude: lng,
        zoom: 15,
      }}
      mapLib={import("mapbox-gl")}
    >
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <Image
          src={pin}
          width={0}
          height={0}
          sizes="100vw"
          className="size-10"
          alt="location_marker"
        />
      </Marker>
    </Map>
  );
};

export default PropertyMap;
