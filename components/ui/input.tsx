import { useThemeColors, useThemeDark } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Platform, TextInput, View, type TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
	containerClassName?: string;
}

function Input({ className, containerClassName, onFocus, onBlur, style, ...props }: InputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const colors = useThemeColors();

	return (
		<View
			className={cn(
				"relative flex h-14 w-full flex-row items-center rounded-xl overflow-hidden px-4",
				containerClassName
			)}
			style={{ backgroundColor: isFocused ? colors.surfaceContainerHighest : colors.surfaceContainerLow }}
		>
			{isFocused && (
				<View 
					className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full" 
					style={{ backgroundColor: colors.primary }}
				/>
			)}
			<TextInput
				className={cn(
					"flex-1 text-[16px] leading-6 font-inter",
					Platform.select({
						web: "outline-none",
					}),
					className
				)}
				placeholderTextColor={colors.onSurfaceVariant}
				style={[{ color: colors.onSurface }, style]}
				onFocus={(e) => {
					setIsFocused(true);
					onFocus?.(e);
				}}
				onBlur={(e) => {
					setIsFocused(false);
					onBlur?.(e);
				}}
				underlineColorAndroid="transparent"
				{...props}
			/>
		</View>
	);
}

export { Input };
