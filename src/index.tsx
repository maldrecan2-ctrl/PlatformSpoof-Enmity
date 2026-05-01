import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { getByProps } from "enmity/metro";
import { React } from "enmity/metro/common";
import { create } from "enmity/patcher";
import { getString } from "enmity/api/settings";
import Settings from "./components/Settings";

const Patcher = create("dre-PlatformSpoof");

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
        const platform = getString("PlatformSpoof", "platform", "desktop");
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

        const superPropsModule = getByProps("getSuperProperties");
        
        if (superPropsModule) {
            Patcher.after(superPropsModule, "getSuperProperties", (self, args, res) => {
                if (res) {
                    res.browser = browserStr;
                }
                return res;
            });
        }
        
        const infoModule = getByProps("InfoDictionaryManager");
        if (infoModule && infoModule.InfoDictionaryManager) {
            Patcher.after(infoModule.InfoDictionaryManager, "getBrowser", (self, args, res) => {
                return browserStr;
            });
        }
    },

    onStop() {
        Patcher.unpatchAll();
    },

    getSettingsPanel({ settings }) {
        return <Settings settings={settings} />;
    }
};

registerPlugin(drePlatformSpoof);
