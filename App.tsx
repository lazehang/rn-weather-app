import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Pressable, View } from "react-native";
import * as Location from "expo-location";
import { API_KEY } from "./utils/WeatherAPIKey";
import Weather from "./components/Weather";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [temperature, setTemperature] = useState(0);

  const [weatherCondition, setWeatherCondition] = useState("");

  const [errors, setErrors] = useState(null);

  const fetchWeather = (lat = 25, lon = 25) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        setTemperature(json.main.temp);
        setWeatherCondition(json.weather[0].main);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    // Update the document title using the browser API
    Location.installWebGeolocationPolyfill();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setErrors("Error Gettig Weather Condtions");
      }
    );
  });

  const reload = () => {
    setIsLoading(true);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              textAlign: "center",
            }}
          >
            Fetching The Weather
          </Text>
        </View>
      ) : (
        <Weather weather={weatherCondition} temperature={temperature}>
          <Pressable
            onPress={reload}
            accessibilityLabel="Learn more about this purple button"
          >
            <Text style={{ fontSize: 20, color: "#fff" }}>Reload</Text>
          </Pressable>
        </Weather>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
