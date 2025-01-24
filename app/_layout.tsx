import { Stack } from "expo-router";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import GlobalProvider from "../context/GlobalProvider";

export default function RootLayout() {
  return (
    <>
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="product_page/[id]"
            options={{ headerShown: false }}
          />
        </Stack>
      </GlobalProvider>
      <StatusBar style="light" />
    </>
  );
}
