import { useThemeColors } from "@/hooks/use-theme";
import { Image } from "expo-image";
import { LucideIcon } from "lucide-react-native";
import React from "react";

export type IconProps = React.ComponentProps<LucideIcon> & {
	icon: LucideIcon | `http://${string}` | `https://${string}`;
};

export default function Icon(
	{ icon: IconComponent, color, ...props }: IconProps,
) {
	const colors = useThemeColors();

	if (typeof IconComponent === "string" && IconComponent.startsWith("http")) {
		return (
			<Image
				source={{
					uri: IconComponent,
				}}
				cachePolicy="disk"
				contentFit="contain"
				style={{ width: 24, height: 24 }}
			/>
		);
	}

	if (typeof IconComponent === "function") {
		return (
			<IconComponent
				color={color ?? (colors.text)}
				{...props}
			/>
		);
	}

	return null;
}
