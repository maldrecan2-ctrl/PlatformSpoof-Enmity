import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { getByProps } from "enmity/metro";
import { Patcher } from "enmity/api/patcher";
import { get } from "enmity/api/settings";
import Settings from "./components/Settings";

const PatcherId = "dre-PlatformSpoof";

const drePlatformSpoof: Plugin = {
    name: "PlatformSpoof",
    version: "1.0.0",
    description: "Spoof what platform or device you're on",
    color: "#e74c3c",
    authors: [{
        name: "rolex7exe",
        id: "460344197849808897"
    }],

    onStart() {
        const platform = get("PlatformSpoof", "platform", "desktop");
        let browserStr = "Discord Client";
        
        switch (platform) {
            case "desktop":    browserStr = "Discord Client"; break;
            case "web":        browserStr = "Discord Web"; break;
            case "ios":        browserStr = "Discord iOS"; break;
            case "android":    browserStr = "Discord Android"; break;
            case "xbox":       browserStr = "Discord Embedded"; break;
            case "playstation":browserStr = "Discord Embedded"; break;
            case "vr":         browserStr = "Discord VR"; break;
            default:           browserStr = "Discord Client"; break;
        }

        // Enmity'de (iOS) platformu spooflamak için genelde superProperties yamalanır.
        const superPropsModule = getByProps("getSuperProperties");
        
        if (superPropsModule) {
            Patcher.after(PatcherId, superPropsModule, "getSuperProperties", (args, res) => {
                if (res) {
                    res.browser = browserStr;
                }
                return res;
            });
        }
        
        // Bazı iOS sürümlerinde InfoDictionaryManager kullanılabilir
        const infoModule = getByProps("InfoDictionaryManager");
        if (infoModule && infoModule.InfoDictionaryManager) {
            Patcher.after(PatcherId, infoModule.InfoDictionaryManager, "getBrowser", (args, res) => {
                return browserStr;
            });
        }
    },

    onStop() {
        Patcher.unpatchAll(PatcherId);
    },

    getSettingsPanel({ settings }) {
        return <Settings />;
    }
};

registerPlugin(drePlatformSpoof);
