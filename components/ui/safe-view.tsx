import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewProps } from "react-native";
import { cn } from "@/lib/utils";
import { useThemeColors } from "@/hooks/use-theme";

function SafeView({ className, children, style, ...props }: ViewProps) {
	const colors = useThemeColors();
	return (
		<SafeAreaView 
			className={cn("flex-1", className)} 
			style={[{ flex: 1, backgroundColor: colors.surface }, style]}
			{...props}
		>
			{children}
		</SafeAreaView>
	);
}

export { SafeView };
