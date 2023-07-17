import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ navigation, route }) => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    if (route.params) {
      setLocation(route.params.location);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {location && <Marker title={location.title} coordinate={location} />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
