import { useThemeColors } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import * as Slot from "@rn-primitives/slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Platform, type Role, Text as RNText } from "react-native";

const textVariants = cva(
	cn(
		"text-base font-inter",
		Platform.select({
			web: "select-text",
		}),
	),
	{
		variants: {
			variant: {
				default: "text-[16px] leading-6",
				display: "font-manrope text-4xl font-bold tracking-tight",
				headline: "font-manrope text-2xl font-bold tracking-tight",
				title: "font-inter text-[22px] font-semibold leading-7",
				body: "font-inter text-[16px] leading-6",
				label: "font-inter text-[14px] font-medium leading-5",
				destructive: "text-[16px] font-semibold",
			},
			muted: {
				true: "opacity-60",
				false: "",
			},
		},
		defaultVariants: {
			variant: "default",
			muted: false,
		},
	},
);

type TextVariantProps = VariantProps<typeof textVariants>;

const ROLE: Partial<Record<string, Role>> = {
	display: "heading",
	headline: "heading",
	title: "heading",
};

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
	className,
	asChild = false,
	variant = "default",
	muted = false,
	style,
	...props
}:
	& React.ComponentProps<typeof RNText>
	& TextVariantProps
	& React.RefAttributes<RNText>
	& {
		asChild?: boolean;
	}) {
	const colors = useThemeColors();
	const textClass = React.useContext(TextClassContext);
	const Component = asChild ? Slot.Text : RNText;

	const color = React.useMemo(() => {
		if (variant === "destructive") return colors.primary; // Red fallback
		if (muted || variant === "muted" as any) return colors.onSurfaceVariant;
		return colors.onSurface;
	}, [colors, variant, muted]);

	return (
		<Component
			className={cn(
				textVariants({ variant, muted }),
				textClass,
				className,
			)}
			style={[{ color }, style]}
			role={variant ? ROLE[variant as string] : undefined}
			{...props}
		/>
	);
}

export { Text, TextClassContext, textVariants };
