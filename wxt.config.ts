import {defineConfig} from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
    extensionApi: "chrome",
    modules: [
        "@wxt-dev/auto-icons",
        "@wxt-dev/module-react"
    ],
    manifest: {
        permissions: ["storage"],
        host_permissions: ["https://www.pixiv.net/*"],
    },
    // @ts-ignore
    background: {
        persistent: false,
    },
});
