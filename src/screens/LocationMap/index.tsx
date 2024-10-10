import React, { useEffect, useState } from 'react'
import MapView, { Marker, Polyline, Region } from 'react-native-maps'
import { Text, View } from 'react-native'
import { styles } from './styles'
import * as Location from "expo-location"
import { colors } from '../../styles/colors'

export function LocationMap() {
    const [location, setLocation] = useState<null | Location.LocationObject>(
        null
    );
    const [region, setRegion] = useState<Region>();
    const [marker, setMarker] = useState<Region[]>();
    const [errorMsg, setErrorMsg] = useState<null | string>(null);

    useEffect(() => {
        const handleLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was danied");
                return;
            }
            let location = await Location.getCurrentPositionAsync();
            if (location) {
                setLocation(location);
                setRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta:0.004,
                    longitudeDelta:0.004,
                });
                setMarker([
                    {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta:0.004,
                    longitudeDelta:0.004,
                    },
                ])
            }
        };
        handleLocation();
    }, []);
    let text ="Waiting..";
    if(errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location)
    }

    return(
        <View style={styles.container}>
            {!region && <Text style={styles.paragraph}>{text}</Text>}
            {region && (
                <MapView style={styles.map} region={region}
                    showsUserLocation={true}
                >
                    {marker && 
                        marker.map((item) => (
                            <Marker key={item.latitude} coordinate={item} />
                        ))}
                    <Polyline 
                        coordinates={[
                            { latitude: -21.5658470, longitude: -45.4370925},
                            { latitude: 22.356514, longitude: 114.13625300000001},
                        ]}
                        strokeColor={colors.black}
                        strokeWidth={7}
                    />
                </MapView>
            )}
        </View>
    );
}