/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { AppColors } from "@/lib/theme";
import { Platform } from "react-native";

export const Colors = AppColors;

export const Fonts = Platform.select({
  ios: {
    sans: "Inter-Regular",
    display: "Manrope-Bold",
    heading: "Manrope-SemiBold",
    mono: "ui-monospace",
  },
  android: {
    sans: "Inter_400Regular",
    display: "Manrope_700Bold",
    heading: "Manrope_600SemiBold",
    mono: "monospace",
  },
  default: {
    sans: "Inter_400Regular",
    display: "Manrope_700Bold",
    heading: "Manrope_600SemiBold",
    mono: "monospace",
  },
  web: {
    sans: "'Inter', system-ui, sans-serif",
    display: "'Manrope', system-ui, sans-serif",
    heading: "'Manrope', system-ui, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
});
