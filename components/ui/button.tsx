import { TextClassContext } from "@/components/ui/text";
import { useThemeDark } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Href, UnknownOutputParams, useRouter } from "expo-router";
import { Platform, Pressable } from "react-native";

const buttonVariants = cva(
	cn(
		"group shrink-0 flex-row items-center justify-center gap-2 rounded-xl shadow-none",
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
				default: cn(
					"h-14 px-6 py-3",
					Platform.select({ web: "has-[>svg]:px-5" }),
				),
				sm: cn(
					"h-12 gap-1.5 rounded-lg px-4",
					Platform.select({ web: "has-[>svg]:px-3.5" }),
				),
				lg: cn(
					"h-16 rounded-xl px-7",
					Platform.select({ web: "has-[>svg]:px-6" }),
				),
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
		"text-base font-semibold",
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
				link: Platform.select({
					web: "underline-offset-4 hover:underline group-hover:underline",
				}),
			},
			size: {
				default: "",
				sm: "",
				lg: "text-lg",
				icon: "text-lg",
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

function buttonTone(variant: ButtonProps["variant"], isDark: boolean) {
	switch (variant) {
		case "destructive":
			return isDark
				? "bg-red-700 active:bg-red-800 border-red-600 shadow-sm shadow-black/30"
				: "bg-red-600 active:bg-red-700 border-red-500 shadow-sm shadow-black/10";
		case "outline":
			return isDark
				? "border-zinc-700 bg-zinc-900 active:bg-zinc-800"
				: "border-zinc-300 bg-white active:bg-zinc-100";
		case "secondary":
			return isDark
				? "bg-zinc-700 active:bg-zinc-600 shadow-sm shadow-black/30"
				: "bg-zinc-200 active:bg-zinc-300 shadow-sm shadow-black/10";
		case "ghost":
			return isDark ? "active:bg-zinc-800" : "active:bg-zinc-100";
		case "link":
			return "bg-transparent";
		case "default":
		default:
			return isDark
				? "bg-emerald-600 active:bg-emerald-700 shadow-sm shadow-black/30"
				: "bg-emerald-700 active:bg-emerald-800 shadow-sm shadow-black/10";
	}
}

function buttonTextTone(variant: ButtonProps["variant"], isDark: boolean) {
	switch (variant) {
		case "outline":
		case "secondary":
		case "ghost":
			return isDark ? "text-zinc-100" : "text-zinc-900";
		case "link":
			return isDark ? "text-emerald-400" : "text-emerald-700";
		case "destructive":
		case "default":
		default:
			return "text-white";
	}
}

type ButtonProps =
	& React.ComponentProps<typeof Pressable>
	& React.RefAttributes<typeof Pressable>
	& VariantProps<typeof buttonVariants>
	& {
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
			replace?: boolean;
		};
	};

function Button(
	{ className, variant, size, href, navigationOptions, ...props }:
		ButtonProps,
) {
	const isDark = useThemeDark();
	const resolvedVariant = variant ?? "default";
	const mode = isDark ? "dark" : "light";

	const router = useRouter();

	return (
		<TextClassContext.Provider
			value={cn(
				buttonTextVariants({ variant: resolvedVariant, size, mode }),
				buttonTextTone(resolvedVariant, isDark),
			)}
		>
			<Pressable
				className={cn(
					props.disabled && "opacity-50",
					buttonVariants({ variant: resolvedVariant, size, mode }),
					buttonTone(resolvedVariant, isDark),
					Platform.select({
						web: isDark
							? "focus-visible:ring-zinc-500/50"
							: "focus-visible:ring-zinc-300/70",
					}),
					"rounded-full",
					className,
				)}
				onPress={() => {
					const { replace, ...opts } = navigationOptions ?? {};
					if (href) {
						router[replace ? "replace" : "push"](href, opts);
						return;
					}
				}}
				role="button"
				{...props}
			/>
		</TextClassContext.Provider>
	);
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
