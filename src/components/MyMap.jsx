import React, { useEffect, useRef, useState, memo, useMemo, useCallback } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { googleMapsApiKey } from "../utils/MapUtils/MapConfig";
import { googleMapsLibraries } from "../utils/MapUtils/MapConfig";


const mapContainerStyle = {
    height: "100%",
    width: "100%",
    padding: "200px 0px 200px 0px"
};

// Static libraries array to prevent unnecessary reloads
const libraries = ["marker"];

const MyMap = memo(function MyMap({ coordinates }) {

    console.log(coordinates, "Comming Coordinates")
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [debugInfo, setDebugInfo] = useState("");

    // Debug: Check API key
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey, // Provide fallback to prevent errors
        libraries: googleMapsLibraries,
    });

    // Memoize center to prevent unnecessary re-renders
    const center = useMemo(() => {
        if (coordinates && Array.isArray(coordinates) && coordinates.length >= 2) {
            return { lat: coordinates[1], lng: coordinates[0] };
        }
        return { lat: 43.65107, lng: -79.347015 }; // fallback Toronto
    }, [coordinates]);

    // Debug logging
    useEffect(() => {
        if (loadError) {
            console.error("Google Maps load error:", loadError);
            setDebugInfo(`Load Error: ${loadError.message}`);
        } else if (!apiKey || apiKey === "your_google_maps_api_key_here") {
            setDebugInfo("Missing Google Maps API Key - Please add REACT_APP_GOOGLE_MAPS_API_KEY to your .env file");
        } else if (!isLoaded) {
            setDebugInfo("Loading Google Maps...");
        } else {
            setDebugInfo("Google Maps loaded successfully");
        }
    }, [isLoaded, loadError, apiKey]);

    // Initialize map only once when loaded
    useEffect(() => {
        if (isLoaded && mapRef.current && !map) {
            try {
                const newMap = new window.google.maps.Map(mapRef.current, {
                    center: center,
                    zoom: 13,
                    mapId: "DEMO_MAP_ID", // Required for Advanced Markers
                });
                setMap(newMap);
            } catch (error) {
                console.error("Error creating map:", error);
                setDebugInfo(`Map creation error: ${error.message}`);
            }
        }
    }, [isLoaded, map]); // Removed center dependency to prevent re-creation

    // Create marker when map is ready
    const createMarker = useCallback(async () => {
        if (!map || !isLoaded) return;

        try {
            // Clean up existing marker
            if (markerRef.current) {
                markerRef.current.map = null;
            }

            const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");

            const marker = new AdvancedMarkerElement({
                map: map,
                position: center,
                title: "Salon Location",
            });

            markerRef.current = marker;
        } catch (error) {
            console.error("Error creating advanced marker:", error);
            setDebugInfo(`Marker creation error: ${error.message}`);
        }
    }, [map, isLoaded, center]);

    // Create marker when map is ready
    useEffect(() => {
        if (map && isLoaded) {
            createMarker();
        }
    }, [map, isLoaded, createMarker]);

    // Update marker position when coordinates change
    useEffect(() => {
        if (markerRef.current && map) {
            markerRef.current.position = center;
        }
    }, [center, map]);

    // Show debug information
    if (loadError) {
        return (
            <div style={mapContainerStyle} className="flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <div>
                    <p className="font-bold">Error loading Google Maps</p>
                    <p className="text-sm">{loadError.message}</p>
                    <p className="text-sm mt-2">Debug: {debugInfo}</p>
                </div>
            </div>
        );
    }

    // Show placeholder when API key is missing
    if (!apiKey || apiKey === "your_google_maps_api_key_here") {
        return (
            <div style={mapContainerStyle} className="flex items-center justify-center bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <div>
                    <p className="font-bold">Google Maps API Key Required</p>
                    <p className="text-sm">Please add REACT_APP_GOOGLE_MAPS_API_KEY to your .env file</p>
                    <p className="text-sm mt-2">Debug: {debugInfo}</p>
                </div>
            </div>
        );
    }


    // Debug logging (only in development)
    if (process.env.NODE_ENV === 'development') {
        console.log("MyMap Debug:", {
            isLoaded,
            map: !!map,
            markerRef: !!markerRef.current,
            debugInfo,
            loadError,
            apiKey: !!apiKey,
            coordinates,

        });
    }
    if (!isLoaded) {
        return (
            <div style={mapContainerStyle} className="flex items-center justify-center bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
                <div>
                    <p className="font-bold">Loading Map...</p>
                    <p className="text-sm">Debug: {debugInfo}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div ref={mapRef} style={mapContainerStyle} />
            <div className="mt-2 text-xs text-gray-600">
                Debug: {debugInfo}
            </div>
        </div>
    );
});

export default MyMap;
