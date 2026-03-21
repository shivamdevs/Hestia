import { useThemeDark } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { Platform, TextInput, type TextInputProps } from "react-native";

function Input(
	{ className, placeholderClassName, style, ...props }:
		& TextInputProps
		& React.RefAttributes<TextInput>,
) {
	const isDark = useThemeDark();

	return (
		<TextInput
			className={cn(
				"flex h-14 w-full min-w-0 flex-row items-center rounded-xl border px-4 py-2 text-lg leading-6 shadow-sm",
				isDark
					? "border-zinc-700 bg-zinc-900 text-zinc-50 shadow-black/25"
					: "border-zinc-300 bg-white text-zinc-900 shadow-black/10",
				props.editable === false &&
					cn(
						"opacity-50",
						Platform.select({
							web: "disabled:pointer-events-none disabled:cursor-not-allowed",
						}),
					),
				Platform.select({
					web: cn(
						"outline-none transition-[color,box-shadow]",
						isDark
							? "placeholder:text-zinc-400 selection:bg-emerald-600 selection:text-white focus-visible:border-zinc-500 focus-visible:ring-zinc-500/40"
							: "placeholder:text-zinc-500 selection:bg-emerald-700 selection:text-white focus-visible:border-zinc-300 focus-visible:ring-zinc-300/70",
						"focus-visible:ring-[3px] aria-invalid:border-red-500 aria-invalid:ring-red-500/30",
					),
					native: isDark
						? "placeholder:text-zinc-400"
						: "placeholder:text-zinc-500",
				}),
				className,
			)}
			placeholderClassName={cn(
				"pl-4",
				isDark
					? "placeholder:text-zinc-400"
					: "placeholder:text-zinc-500",
				placeholderClassName,
			)}
			style={[{ paddingHorizontal: 16 }, style]}
			{...props}
		/>
	);
}

export { Input };
