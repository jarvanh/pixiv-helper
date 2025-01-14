import {storage} from "wxt/storage";
import type {CacheToken, Settings} from "~/types";
import {ofetch} from "ofetch";

const STORAGE_KEY = "local:alist_token";
const TOKEN_EXPIRE_TIME = 5 * 60 * 60 * 1000; // 5小时

export async function getToken(settings: Settings, isTesting: boolean) {
    // 尝试从缓存获取
    if (!isTesting) {
        try {
            const cachedValue = await storage.getItem<string>(STORAGE_KEY);
            if (cachedValue) {
                const cacheToken: CacheToken = JSON.parse(cachedValue);
                if (cacheToken.token && cacheToken.expiresAt > Date.now()) {
                    return cacheToken.token;
                }
            }
        } catch (error) {
            console.error("Failed to get cached token:", error);
        }
    }
    // 缓存不存在或已过期，重新获取
    try {
        const {code, data, message} = await ofetch('/api/auth/login', {
            baseURL: settings?.alistUrl,
            method: 'POST',
            body: {
                username: settings?.alistUsername,
                password: settings?.alistPassword
            }
        });
        if (code !== 200) {
            throw new Error(message || "获取token失败");
        }

        const cacheToken: CacheToken = {
            token: data.token,
            expiresAt: Date.now() + TOKEN_EXPIRE_TIME,
        };

        // 缓存token
        await storage.setItem(STORAGE_KEY, JSON.stringify(cacheToken));

        return data.token;
    } catch (error: any) {
        throw new Error(error.message || "获取token失败");
    }
}

export async function clearToken() {
    await storage.removeItem(STORAGE_KEY);
}

export const uploadImage = async (settings: Settings, data: any) => {
    const token = await getToken(settings, false);
    return await ofetch("/api/fs/add_offline_download", {
        baseURL: settings!.alistUrl,
        method: "POST",
        body: data,
        headers: {
            Authorization: token,
        },
    });
}