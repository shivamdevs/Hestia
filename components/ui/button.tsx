import { Text as AppText, TextClassContext } from "@/components/ui/text";
import { useThemeColors, useThemeDark } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { LinearGradient } from "expo-linear-gradient";
import {
	Href,
	UnknownOutputParams,
	useGlobalSearchParams,
	useRouter,
} from "expo-router";
import React from "react";
import { Platform, Pressable } from "react-native";

const buttonVariants = cva(
	cn(
		"group shrink-0 flex-row items-center justify-center gap-2 rounded-full shadow-none overflow-hidden",
		Platform.select({
			web: "whitespace-nowrap outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		}),
	),
	{
		variants: {
			variant: {
				default: "",
				destructive: "",
				outline: "border",
				secondary: "",
				ghost: "",
				link: "",
			},
			size: {
				default: "h-14 px-6 py-3", // 56px per spec
				sm: "h-12 gap-1.5 rounded-full px-4",
				lg: "h-16 rounded-full px-7",
				icon: "h-14 w-14",
			},
			mode: {
				light: "",
				dark: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			mode: "light",
		},
	},
);

const buttonTextVariants = cva(
	cn(
		"text-base font-bold font-manrope", // title-md style
		Platform.select({ web: "pointer-events-none transition-colors" }),
	),
	{
		variants: {
			variant: {
				default: "",
				destructive: "",
				outline: "",
				secondary: "",
				ghost: "",
				link:
					"underline-offset-4 hover:underline group-hover:underline",
			},
			size: {
				default: "text-[16px]", // 16px minimum rule
				sm: "text-[14px]",
				lg: "text-[18px]",
				icon: "text-[18px]",
			},
			mode: {
				light: "",
				dark: "",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			mode: "light",
		},
	},
);

function ButtonContent({ variant, colors }: { variant: string; colors: any }) {
	if (variant === "default") {
		return (
			<LinearGradient
				colors={[colors.primary, colors.primaryContainer]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
		);
	}
	return null;
}

type ButtonProps =
	& Omit<React.ComponentProps<typeof Pressable>, "children">
	& React.RefAttributes<typeof Pressable>
	& VariantProps<typeof buttonVariants>
	& {
		children?: React.ReactNode;
		href?: Href;
		navigationOptions?: {
			relativeToDirectory?: boolean;
			withAnchor?: boolean;
			dangerouslySingular?:
				| boolean
				| ((
					name: string,
					params: UnknownOutputParams,
				) => string | undefined);
		};
		replace?: boolean;
		carryParams?: boolean;
	};

function Button(
	{
		className,
		variant,
		size,
		href,
		replace,
		carryParams,
		navigationOptions,
		children,
		style,
		...props
	}: ButtonProps,
) {
	const colors = useThemeColors();
	const isDark = useThemeDark();
	const resolvedVariant = variant ?? "default";
	const mode = isDark ? "dark" : "light";
	const searchParams = useGlobalSearchParams();
	const router = useRouter();

	const backgroundColor = React.useMemo(() => {
		if (resolvedVariant === "default") return "transparent";
		if (resolvedVariant === "secondary") {
			return colors.surfaceContainerHighest;
		}
		if (resolvedVariant === "destructive") {
			return isDark ? "#b91c1c" : "#dc2626";
		}
		return "transparent";
	}, [resolvedVariant, colors, isDark]);

	const borderColor = React.useMemo(() => {
		if (resolvedVariant === "outline") return colors.outlineVariant;
		return "transparent";
	}, [resolvedVariant, colors]);

	const textColor = React.useMemo(() => {
		if (
			resolvedVariant === "default" || resolvedVariant === "destructive"
		) return "white";
		if (resolvedVariant === "outline") return colors.onSurface;
		return colors.primary;
	}, [resolvedVariant, colors]);

	return (
		<Pressable
			className={cn(
				props.disabled && "opacity-50",
				buttonVariants({ variant: resolvedVariant, size, mode }),
				className,
			)}
			style={[{ backgroundColor, borderColor }, style as any]}
			onPress={(e) => {
				if (href) {
					const { ...opts } = navigationOptions ?? {};
					let hrefObj: Href = typeof href === "string"
						? { pathname: href } as Href
						: href;
					if (carryParams && typeof hrefObj === "object") {
						hrefObj.params = {
							...hrefObj.params,
							...searchParams,
						} as any;
					}
					router[replace ? "replace" : "push"](hrefObj, opts);
					return;
				}
				props.onPress?.(e);
			}}
			role="button"
			{...props}
		>
			<ButtonContent variant={resolvedVariant} colors={colors} />
			<TextClassContext.Provider
				value={cn(
					buttonTextVariants({
						variant: resolvedVariant,
						size,
						mode,
					}),
				)}
			>
				{typeof children === "string"
					? <AppText style={{ color: textColor }}>{children}</AppText>
					: children}
			</TextClassContext.Provider>
		</Pressable>
	);
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
