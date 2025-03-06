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
          <Stack.Screen name="(create)" options={{ headerShown: false }} />
          <Stack.Screen
            name="events_page/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(manage)" options={{ headerShown: false }} />
          <Stack.Screen name={'search/[query]'} options={{ headerShown: false }} />
        </Stack>
      </GlobalProvider>
      <StatusBar style="dark" />
    </>
  );
}
