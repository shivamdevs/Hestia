import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSession } from "@/lib/pb";
import React from "react";
import { View } from "react-native";

export default function AppHomePage() {
    const { user, logout } = useSession();

    return (
        <View className="flex-1 p-8 gap-4">
            <Text className="text-2xl font-semibold">
                App Home
            </Text>
            <Text>
                You are signed in. {JSON.stringify(user, null, 4)}
            </Text>
            <Text>
                Email: {String(user?.email ?? "(no email)")}
            </Text>
            <Button
                variant="secondary"
                onPress={logout}
            >
                <Text>Log out</Text>
            </Button>
        </View>
    );
}
