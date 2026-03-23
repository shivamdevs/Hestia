import { useThemeColors } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { Image, ImageStyle } from "expo-image";
import { LucideIcon } from "lucide-react-native";
import React from "react";
import { DimensionValue, StyleProp, View, ViewStyle } from "react-native";

export type IconProps = React.ComponentProps<LucideIcon> & {
	icon: LucideIcon | string;
	size?: number;
	spin?: boolean;
};

export default function Icon(
	{ icon: IconComponent, color, size = 32, spin, ...props }: IconProps,
) {
	const colors = useThemeColors();

	const OFFSET_SIZE = 4;

	if (typeof IconComponent === "string" && IconComponent.startsWith("http")) {
		return (
			<View
				style={{
					width: size,
					height: size,
					justifyContent: "center",
					alignItems: "center",
					padding: OFFSET_SIZE,
				} as StyleProp<ViewStyle>}
			>
				<Image
					source={{
						uri: IconComponent,
					}}
					cachePolicy="disk"
					contentFit="contain"
					{...props}
					style={{
						width: (size - OFFSET_SIZE * 2) as DimensionValue,
						height: (size - OFFSET_SIZE * 2) as DimensionValue,
						...(props.style as StyleProp<ImageStyle>),
					}}
				/>
			</View>
		);
	}

	return (
		<View
			className={cn("will-change-animation", {
				"animate-spin": spin,
			})}
			style={{
				width: size,
				height: size,
				justifyContent: "center",
				alignItems: "center",
			} as StyleProp<ViewStyle>}
		>
			<IconComponent
				color={color ?? (colors.text)}
				{...props}
			/>
		</View>
	);
}
