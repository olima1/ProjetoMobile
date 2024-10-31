import React, { useEffect, useRef, useState } from "react";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import { Text, View } from 'react-native'
import { styles } from "./styles";
import * as Location from "expo-location"
import { colors } from "../../styles/colors";
import {
    GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete,
    GooglePlacesAutocompleteRef
} from "react-native-google-places-autocomplete"
import MapViewDirections from "react-native-maps-directions";
import { apiLocation } from "../../services/data";
import { AxiosError } from "axios";

export function LocationMapOrDest() {
    const [location, setLocation] = useState<null | Location.LocationObject>(
        null
    );
    const [origin, setOrigin] = useState<Region>();
    const [region, setRegion] = useState<Region>();
    const [marker, setMarker] = useState<Region[]>();
    const [errorMsg, setErrorMsg] = useState<null | string>(null);
    const [destination, setDestination] = useState<Region | null>(null);
    const mapRef = useRef<MapView>(null)
    const placesRef = useRef<GooglePlacesAutocompleteRef>(null)
    const [reverse, setReverse] = useState<string>()

    useEffect(() => {
        const handleLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was danied");
                return;
            }
            let location = await Location.getCurrentPositionAsync();
            if (location) {
                try {
                    await apiLocation.store({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    })
                } catch (error) {
                    const err = error as AxiosError
                    console.log(err.response?.data)
                }
                setLocation(location);
                const reverseGeo = await Location.reverseGeocodeAsync(
                    { latitude: location.coords.latitude, longitude: location.coords.longitude }
                )
                if (reverseGeo && reverseGeo.length > 0) {
                    setReverse(`${reverseGeo[0].country}, ${reverseGeo[0].city}, ${reverseGeo[0].postalCode} `)
                    placesRef.current?.setAddressText(`${reverseGeo[0].country}, ${reverseGeo[0].city}, ${reverseGeo[0].postalCode} `)
                } else
                    console.log('erro')
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004,
                })
            }
            const localiza = await apiLocation.index()
            if (localiza.data.length > 0) {
                for (const element of localiza.data) {
                    if (marker) {
                        setMarker([...marker, {
                            latitude: element.latitude as unknown as number,
                            longitude: element.longitude as unknown as number,
                            latitudeDelta: 0.004,
                            longitudeDelta: 0.004
                        }])
                    } else {
                        setMarker([{
                            latitude: element.latitude as unknown as number,
                            longitude: element.longitude as unknown as number,
                            latitudeDelta: 0.004,
                            longitudeDelta: 0.004
                        }])
                    }
                }
            }
        }
        handleLocation();
    }, []);
    async function handleOrigin(data: GooglePlaceData, details: GooglePlaceDetail | null) {
        if (details && data) {
            setOrigin({
                latitude: details?.geometry.location.lat,
                longitude: details?.geometry.location.lng,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
            })
            if (marker) {
                setMarker([...marker, {
                    latitude: details?.geometry.location.lat,
                    longitude: details?.geometry.location.lng,
                    latitudeDelta: 0.004,
                    longitudeDelta: 0.004
                }])
            }
        }
    }

    function handleClickMarker(e: LatLng) {
        if (marker) {
            setMarker([...marker, {
                latitude: e.latitude,
                longitude: e.longitude,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
            }])
        } else {
            setMarker([{
                latitude: e.latitude,
                longitude: e.longitude,
                latitudeDelta: 0.004,
                longitudeDelta: 0.004
            }])
        }
    }

    let text = "Waiting..";
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    console.log(region)
    return (
        <View style={styles.container}>
            {reverse && (<GooglePlacesAutocomplete
                ref={placesRef}
                styles={{ container: styles.searchContainerOrigin, textInput: styles.searchInput }}
                placeholder="Origem"
                fetchDetails={true}
                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                enablePoweredByContainer={false}
                query={{
                    key: '',
                    language: 'pt-BR'
                }}
                GoogleReverseGeocodingQuery={{ language: 'pt-BR' }}
                onFail={setErrorMsg}
                onPress={handleOrigin}
            />
            )}
            <GooglePlacesAutocomplete
                styles={{ container: styles.searchContainerDestination, textInput: styles.searchInput }}
                placeholder="Destino"
                fetchDetails={true}
                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                enablePoweredByContainer={false}
                query={{
                    key: '',
                    language: 'pt-BR'
                }}
                onFail={setErrorMsg}
                onPress={handleOrigin}
            />
            {!origin && !reverse && <Text style={styles.paragraph}>{text}</Text>}
            {origin && reverse && (
                <MapView style={styles.map} region={origin} showsUserLocation={true}
                    ref={mapRef} onPress={(e) => handleClickMarker(e.nativeEvent.coordinate)}>
                    {marker &&
                        marker.map((item) => (
                            <Marker key={item.latitude} coordinate={item} />
                        ))}
                    {destination && (
                        <MapViewDirections
                            origin={origin}
                            destination={destination}
                            apikey=''
                            strokeColor={colors.black}
                            strokeWidth={7}
                            lineDashPattern={[0]}
                            onReady={(result) => {
                                mapRef.current?.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        top: 24,
                                        bottom: 24,
                                        left: 24,
                                        right: 24
                                    }
                                })
                            }}
                        />
                    )}
                </MapView>
            )}
        </View>
    );
}