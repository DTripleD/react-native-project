import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.conteiner}
        initialRegion={{
          latitude: latitude || 24,
          longitude: longitude || 25,
          latitudeDelta: 0.001,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          title="Travel point"
          coordinate={{
            latitude: latitude || 24,
            longitude: longitude || 25,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
});
