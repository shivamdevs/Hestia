import { useThemeColors } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import {
	Pressable,
	type PressableProps,
	View,
	type ViewProps,
} from "react-native";

const cardVariants = cva(
	"rounded-3xl overflow-hidden",
	{
		variants: {
			variant: {
				default: "",
				high: "",
				lowest: "",
				outline: "border",
			},
			padding: {
				none: "p-0",
				sm: "p-3",
				md: "p-4",
				lg: "p-5",
				xl: "p-6",
			},
		},
		defaultVariants: {
			variant: "default",
			padding: "md",
		},
	},
);

interface CardProps extends ViewProps, VariantProps<typeof cardVariants> {
	onPress?: PressableProps["onPress"];
}

function Card({
	children,
	className,
	variant,
	padding,
	style,
	onPress,
	...props
}: CardProps) {
	const colors = useThemeColors();

	const backgroundColor = React.useMemo(() => {
		switch (variant) {
			case "high":
				return colors.surfaceContainerHighest;
			case "lowest":
				return colors.surfaceContainerLowest;
			case "outline":
				return "transparent";
			case "default":
			default:
				return colors.surfaceContainerLow;
		}
	}, [variant, colors]);

	const borderColor = React.useMemo(() => {
		if (variant === "outline") return colors.outlineVariant;
		return "transparent";
	}, [variant, colors]);

	const Component = onPress ? Pressable : View;

	return (
		<Component
			className={cn(
				cardVariants({ variant, padding }),
				onPress && "active:opacity-70",
				className,
			)}
			style={[{ backgroundColor, borderColor }, style as any]}
			onPress={onPress}
			{...props as any}
		>
			{children}
		</Component>
	);
}

export { Card, cardVariants };
