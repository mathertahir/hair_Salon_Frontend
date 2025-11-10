import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCrosshairs } from "react-icons/fa";
import { useJsApiLoader } from "@react-google-maps/api";
import { googleMapsApiKey, googleMapsLibraries } from "../utils/MapUtils/MapConfig";

const LocationModal = ({ visible, onClose, onLocationChange }) => {
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const autocompleteService = useRef(null);
    const placesService = useRef(null);

    // Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey,
        libraries: googleMapsLibraries,
    });

    // Initialize Google Places API
    useEffect(() => {
        if (isLoaded && window.google && window.google.maps) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
            placesService.current = new window.google.maps.places.PlacesService(
                document.createElement("div")
            );
        }
    }, [isLoaded]);

    const handleLocate = () => {
        if (!window.google || !window.google.maps) {
            alert("Google Maps API not loaded yet.");
            return;
        }

        if (navigator.geolocation) {
            setLoading(true);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const geocoder = new window.google.maps.Geocoder();
                    const latlng = { lat: latitude, lng: longitude };

                    geocoder.geocode({ location: latlng }, (results, status) => {
                        setLoading(false);

                        if (status === "OK" && results[0]) {
                            setLocation(results[0].formatted_address);
                            setSelectedLocation({
                                name: results[0].address_components[0].long_name,
                                address: results[0].formatted_address,
                                lat: latitude,
                                lng: longitude,
                                placeId: results[0].place_id,
                            });
                            setSearchResults([]);
                            setShowDropdown(false);
                            alert("Location detected successfully!");
                        } else {
                            alert("Failed to retrieve address from your location");
                        }
                    });
                },
                () => {
                    setLoading(false);
                    alert(
                        "Location access denied. Please enable location permissions in your browser."
                    );
                }
            );
        } else {
            alert("Geolocation is not supported by this browser");
        }
    };

    // Handle search input changes
    const handleSearchChange = (value) => {
        setLocation(value);
        setSelectedLocation(null);

        if (!value.trim() || !autocompleteService.current) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }

        autocompleteService.current.getPlacePredictions(
            {
                input: value,
                types: ["geocode", "establishment"],
            },
            (predictions, status) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK &&
                    predictions
                ) {
                    setSearchResults(predictions);
                    setShowDropdown(true);
                } else {
                    setSearchResults([]);
                    setShowDropdown(false);
                }
            }
        );
    };

    // Handle location selection
    const handleLocationSelect = (placeId) => {
        if (!placesService.current) return;

        placesService.current.getDetails(
            {
                placeId: placeId,
                fields: ["name", "formatted_address", "geometry", "place_id"],
            },
            (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                    const locationData = {
                        name: place.name,
                        address: place.formatted_address,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        placeId: place.place_id,
                    };

                    setSelectedLocation(locationData);
                    setLocation(place.formatted_address);
                    setShowDropdown(false);
                    setSearchResults([]);
                }
            }
        );
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!selectedLocation) {
    //         alert("Please select a location from the dropdown");
    //         return;
    //     }

    //     setLoading(true);
    //     try {
    //         await new Promise((resolve) => setTimeout(resolve, 1000));
    //         onLocationChange(selectedLocation);
    //         alert("Location updated successfully!");
    //         onClose();
    //     } catch (error) {
    //         alert("Failed to update location");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedLocation) {
            alert("Please select a location from the dropdown");
            return;
        }

        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // ✅ Save to localStorage
            localStorage.setItem("userLocation", JSON.stringify(selectedLocation));

            // ✅ Trigger custom event so other components know location changed
            window.dispatchEvent(new Event("userLocationChanged"));

            // Optional: callback if parent wants
            onLocationChange?.(selectedLocation);

            alert("Location updated successfully!");
            onClose();
        } catch (error) {
            alert("Failed to update location");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setLocation("");
        setSelectedLocation(null);
        setSearchResults([]);
        setShowDropdown(false);
        onClose();
    };

    if (!visible) return null;

    if (!isLoaded) {
        return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-lg w-[400px] p-6 text-center">
                    <div className="animate-spin border-4 border-gray-300 border-t-green-500 rounded-full w-10 h-10 mx-auto mb-3"></div>
                    <p className="text-gray-600">Loading location services...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[420px] p-6 relative">
                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                    onClick={handleClose}
                >
                    <IoIosCloseCircleOutline size={26} />
                </button>

                <h2 className="text-xl font-semibold mb-4">Add Location</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Input */}
                    <div className="relative">
                        <CiSearch className="absolute left-3 top-3.5 text-gray-400 text-xl" />
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search location..."
                            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <FaCrosshairs
                            onClick={handleLocate}
                            className="absolute right-3 top-3.5 text-gray-500 cursor-pointer hover:text-green-600"
                        />
                    </div>

                    {/* Dropdown */}
                    {showDropdown && searchResults.length > 0 && (
                        <div className="max-h-52 overflow-y-auto border border-gray-200 rounded-lg shadow-sm">
                            {searchResults.map((item) => (
                                <div
                                    key={item.place_id}
                                    onClick={() => handleLocationSelect(item.place_id)}
                                    className="px-4 py-2 cursor-pointer hover:bg-green-50 transition"
                                >
                                    <p className="text-sm font-medium">
                                        {item.structured_formatting?.main_text || item.description}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.structured_formatting?.secondary_text || ""}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Selected Location Display */}
                    {selectedLocation && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                                <FaMapMarkerAlt className="text-green-600 mt-1" />
                                <div>
                                    <div className="font-medium text-sm">{selectedLocation.name}</div>
                                    <div className="text-xs text-gray-600">
                                        {selectedLocation.address}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Lat: {selectedLocation.lat.toFixed(6)}, Lng:{" "}
                                        {selectedLocation.lng.toFixed(6)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    {location && (
                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                disabled={!selectedLocation || loading}
                                className={`px-5 py-2 rounded-lg text-white font-medium ${loading
                                    ? "bg-green-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700"
                                    }`}
                            >
                                {loading ? "Updating..." : "Update Location"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LocationModal;




