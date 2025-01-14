export interface Settings {
    proxyUrl: string;
    alistUrl: string;
    alistUsername: string;
    alistPassword: string;
    alistStoragePath: string;
}

export const defaultSettings: Settings = {
    proxyUrl: "https://i.pixiv.re",
    alistUrl: "",
    alistUsername: "",
    alistPassword: "",
    alistStoragePath: "/onedrive/pixiv",
};

export interface CacheToken {
    token: string;
    expiresAt: number;
}

export interface PixviImage {
    urls: {
        small: string;
        regular: string;
        original: string;
        [key: string]: string;
    };
    selected: boolean;
    width: number;
    height: number;
}

export interface ImageSyncDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    images: PixviImage[];
    toggleSelectImage: (index: number) => void;
    selectImageMode: (mode: SelectMode) => void;
    quality: string;
    setQuality: (quality: string) => void;
    onDownload: () => Promise<void>;
    isLoading: boolean;
    imgSize: number;
    selectSize: number;
}

export interface PixviResponse {
    error: boolean;
    message: string;
    body: Array<{
        urls: {
            thumb_mini: string;
            small: string;
            regular: string;
            original: string;
        };
        width: number;
        height: number;
    }>;
}

export type SelectMode = "all" | "unall" | "reverse";

export interface AlisResponse {
    code: number;
    message: string;
    data: any
}