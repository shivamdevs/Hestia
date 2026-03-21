import { useThemeDark } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import * as AvatarPrimitive from "@rn-primitives/avatar";

function Avatar({
	className,
	...props
}: AvatarPrimitive.RootProps & React.RefAttributes<AvatarPrimitive.RootRef>) {
	const isDark = useThemeDark();
	return (
		<AvatarPrimitive.Root
			className={cn(
				"relative flex size-8 shrink-0 overflow-hidden rounded-full border",
				isDark ? "border-zinc-600" : "border-zinc-400",
				className,
			)}
			{...props}
		/>
	);
}

function AvatarImage({
	className,
	...props
}: AvatarPrimitive.ImageProps & React.RefAttributes<AvatarPrimitive.ImageRef>) {
	return (
		<AvatarPrimitive.Image
			className={cn("aspect-square size-full", className)}
			{...props}
		/>
	);
}

function AvatarFallback({
	className,
	...props
}:
	& AvatarPrimitive.FallbackProps
	& React.RefAttributes<AvatarPrimitive.FallbackRef>) {
	return (
		<AvatarPrimitive.Fallback
			className={cn(
				"bg-black/10 backdrop-blur-2xl flex size-full flex-row items-center justify-center rounded-full",
				className,
			)}
			{...props}
		/>
	);
}

export { Avatar, AvatarFallback, AvatarImage };
