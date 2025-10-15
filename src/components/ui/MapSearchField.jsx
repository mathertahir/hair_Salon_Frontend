import React, { useState, useEffect } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { CiLocationOn } from "react-icons/ci";
import { googleMapsApiKey, googleMapsLibraries } from "../../utils/MapUtils/MapConfig";


const MapSearchField = ({
    value = "",
    onChange,
    error,
    placeholder = "Search your address...",
}) => {
    const [autocomplete, setAutocomplete] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey, // Provide fallback to prevent errors
        libraries: googleMapsLibraries,
    });

    // 🗺️ Handle place change when user selects from autocomplete
    const handlePlaceChanged = () => {
        if (!autocomplete) return;
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        let postalCode = "";
        let state = "";
        let city = "";
        let streetAddress = "";

        if (place.address_components) {
            for (const component of place.address_components) {
                const types = component.types;
                if (types.includes("postal_code")) postalCode = component.long_name;
                if (types.includes("administrative_area_level_1")) state = component.long_name;
                if (types.includes("locality")) city = component.long_name;
                if (types.includes("route") || types.includes("street_number"))
                    streetAddress += component.long_name + " ";
            }
        }

        const fullAddress = place.formatted_address || streetAddress.trim();

        onChange({
            latitude,
            longitude,
            postalCode,
            state,
            city,
            streetAddress: fullAddress,
        });
    };

    // 📍 Auto-detect current location if no value provided
    useEffect(() => {
        if (!value && navigator.geolocation && isLoaded) {
            setLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        // Reverse geocode coordinates -> address
                        const geocoder = new window.google.maps.Geocoder();
                        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
                            if (status === "OK" && results[0]) {
                                const place = results[0];
                                let postalCode = "";
                                let state = "";
                                let city = "";
                                let streetAddress = "";

                                if (place.address_components) {
                                    for (const component of place.address_components) {
                                        const types = component.types;
                                        if (types.includes("postal_code")) postalCode = component.long_name;
                                        if (types.includes("administrative_area_level_1")) state = component.long_name;
                                        if (types.includes("locality")) city = component.long_name;
                                        if (types.includes("route") || types.includes("street_number"))
                                            streetAddress += component.long_name + " ";
                                    }
                                }

                                onChange({
                                    latitude,
                                    longitude,
                                    postalCode,
                                    state,
                                    city,
                                    streetAddress: place.formatted_address || streetAddress.trim(),
                                });
                            }
                        });
                    } catch (err) {
                        console.error("Geocode error:", err);
                    } finally {
                        setLoadingLocation(false);
                    }
                },
                (err) => {
                    console.error("Location permission denied:", err);
                    setLoadingLocation(false);
                }
            );
        }
    }, [value, isLoaded]);

    if (!isLoaded) return <p>Loading map...</p>;

    return (
        <div className="p-[10px] border border-white-E9 rounded-[5px] w-full">
            <div className="flex gap-3 items-center">
                <div className="text-blueCD">
                    <CiLocationOn size={22} />
                </div>
                <Autocomplete onLoad={setAutocomplete} onPlaceChanged={handlePlaceChanged} className="w-full">
                    <input
                        type="text"
                        name="streetAddress"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange({ streetAddress: e.target.value })}
                        className="focus:outline-none border-none w-full bg-transparent "
                    />
                </Autocomplete>
            </div>

            {loadingLocation && (
                <p className="text-sm text-gray-500 mt-1">Detecting your current location...</p>
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default MapSearchField;
