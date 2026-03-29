import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SafeView } from "@/components/ui/safe-view";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Text } from "@/components/ui/text";
import { useSession } from "@/lib/pb";
import React from "react";
import { View } from "react-native";

export default function AppHomePage() {
	const { user, logout } = useSession();

	return (
		<SafeView className="flex-1">
			<ScrollArea 
				contentClassName="px-8 pt-12 gap-8 justify-between"
				showsVerticalScrollIndicator={false}
			>
				<View className="gap-8">
					<View className="gap-2">
						<Text variant="display">Welcome Home</Text>
						<Text variant="body" muted>
							You are signed in as {user?.email ?? "(no email)"}
						</Text>
					</View>

					<Card variant="default" padding="xl" className="gap-4">
						<Text variant="headline">User Details</Text>
						<Text variant="body" muted>
							Name: {user?.name ?? "N/A"}
						</Text>
						<Text variant="body" muted>
							Account Verified: {user?.verified ? "Yes" : "No"}
						</Text>
					</Card>
				</View>

				<View className="justify-end pb-8 mt-12">
					<Button
						variant="secondary"
						onPress={logout}
						size="default"
						className="w-full"
					>
						Log out
					</Button>
				</View>
			</ScrollArea>
		</SafeView>
	);
}
