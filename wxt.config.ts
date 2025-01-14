import {defineConfig} from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
    extensionApi: "chrome",
    modules: [
        "@wxt-dev/auto-icons",
        "@wxt-dev/module-react"
    ],
    manifest: {
        permissions: ["storage", "activeTab"],
        host_permissions: ["https://*/*", "http://*/*"],
    },
    // @ts-ignore
    background: {
        persistent: false,
    },
});
