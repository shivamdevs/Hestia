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
	{ icon: IconComponent, color, size = 24, spin, ...props }: IconProps,
) {
	const colors = useThemeColors();

	if (typeof IconComponent === "string" && IconComponent.startsWith("http")) {
		return (
			<View
				style={{
					width: size,
					height: size,
					justifyContent: "center",
					alignItems: "center",
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
						width: size as DimensionValue,
						height: size as DimensionValue,
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
			{(IconComponent as any) && (
				<IconComponent
					color={color ?? (colors.onSurface)}
					size={size}
					{...props}
				/>
			)}
		</View>
	);
}
