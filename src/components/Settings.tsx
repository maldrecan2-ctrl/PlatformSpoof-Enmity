import { FormRow, FormSelect } from "enmity/components";
import { ScrollView, View, Text } from "react-native";
import { set, get } from "enmity/api/settings";
import React from "react";

export default function Settings() {
    const [platform, setPlatform] = React.useState(get("PlatformSpoof", "platform", "desktop"));

    const options = [
        { label: "Desktop", value: "desktop" },
        { label: "Web", value: "web" },
        { label: "Android", value: "android" },
        { label: "iOS", value: "ios" },
        { label: "Xbox", value: "xbox" },
        { label: "Playstation", value: "playstation" },
        { label: "VR", value: "vr" }
    ];

    const handleValueChange = (value: string) => {
        set("PlatformSpoof", "platform", value);
        setPlatform(value);
    };

    return (
        <ScrollView style={{ padding: 16 }}>
            <View style={{ marginBottom: 16 }}>
                <Text style={{ color: "#fff", marginBottom: 8, fontSize: 16, fontWeight: "bold" }}>
                    Select Spoofed Platform
                </Text>
                <Text style={{ color: "#aaa", marginBottom: 16, fontSize: 14 }}>
                    Choose the platform icon that will be displayed to others when you are online. (Requires app restart to take effect)
                </Text>
                <FormSelect
                    title="Platform"
                    options={options}
                    value={platform}
                    onValueChange={handleValueChange}
                />
            </View>
        </ScrollView>
    );
}
