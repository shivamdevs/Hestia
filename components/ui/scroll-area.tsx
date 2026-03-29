import React from "react";
import { ScrollView, type ScrollViewProps, View, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface ScrollAreaProps extends ScrollViewProps {
	containerClassName?: string;
	contentClassName?: string;
}

function ScrollArea({ 
	children, 
	className, 
	containerClassName,
	contentClassName,
	style,
	contentContainerStyle,
	...props 
}: ScrollAreaProps) {
	const colors = useThemeColors();

	const flattenedStyle = StyleSheet.flatten(style);
	const hasBackgroundColor = flattenedStyle?.backgroundColor !== undefined;

	return (
		<View 
			className={cn("flex-1", containerClassName)} 
			style={[
				{ flex: 1, backgroundColor: colors.surface },
				style
			]}
		>
			<ScrollView
				className={cn("flex-1", className)}
				style={[styles.scrollView]}
				contentContainerStyle={[
					styles.contentContainer,
					contentContainerStyle,
				]}
				showsVerticalScrollIndicator={false}
				{...props}
			>
				<View 
					className={cn("flex-1", contentClassName)}
					style={[
						styles.innerView,
						hasBackgroundColor ? { backgroundColor: flattenedStyle.backgroundColor } : {}
					]}
				>
					{children}
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
	},
	contentContainer: {
		flexGrow: 1,
	},
	innerView: {
		flex: 1,
	}
});

export { ScrollArea };
