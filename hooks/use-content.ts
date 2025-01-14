import {AlisResponse, PixviImage, PixviResponse, SelectMode} from "~/types";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {uploadImage} from "./use-alist.ts";
import {useSettings} from "./use-settings";

export const fetchImages = async () => {
    try {
        const match = window.location.pathname.match(/\/artworks\/(\d+)/);
        if (!match) return;
        const illustId = match[1];
        const response = await fetch(
            `https://www.pixiv.net/ajax/illust/${illustId}/pages`
        );
        const data: PixviResponse = await response.json();

        if (!data.error) {
            const formattedImages: PixviImage[] = data.body.map((item) => ({
                urls: {
                    small: item.urls.small,
                    regular: item.urls.regular,
                    original: item.urls.original,
                },
                width: item.width,
                height: item.height,
                selected: false,
            }));
            return formattedImages;
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch images:", error);
        return [];
    }
};

export const useContent = () => {
    const [images, setImages] = useState<PixviImage[]>([]);
    const [quality, setQuality] = useState("original");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {settings} = useSettings();
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    // 监听 URL 变化
    useEffect(() => {
        const handleUrlChange = () => {
            const newPath = window.location.pathname;
            if (newPath !== currentPath) {
                setCurrentPath(newPath);
            }
        };

        window.addEventListener("popstate", handleUrlChange);

        const observer = new MutationObserver(() => {
            handleUrlChange();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            window.removeEventListener("popstate", handleUrlChange);
            observer.disconnect();
        };
    }, [currentPath]);

    // 当 pathname 变化时重新获取图片
    useEffect(() => {
        fetchImages().then((data) => {
            setImages(data || []);
        });
        return () => {
            setImages([]);
        };
    }, [currentPath]);

    const toggleSelectImage = (index: number) => {
        const newImgs = [...images];
        newImgs[index].selected = !newImgs[index].selected;
        setImages(newImgs);
    };

    const selectImageMode = (mode: SelectMode) => {
        const newImgs = [...images];
        if (mode === "all") {
            newImgs.forEach((img) => {
                img.selected = true;
            });
        } else if (mode === "unall") {
            newImgs.forEach((img) => {
                img.selected = false;
            });
        } else if (mode === "reverse") {
            newImgs.forEach((img) => {
                img.selected = !img.selected;
            });
        }
        setImages(newImgs);
    };

    const downloadSelected = async () => {
        if (!settings) {
            toast.error("请先配置 Alist 设置");
            return;
        }
        const selectedImgs = images.filter((img) => img.selected);
        const urls = selectedImgs.map((img) => {
            const url = img.urls[quality];
            return url.replace("https://i.pximg.net", settings.proxyUrl);
        });
        const titleElement = document.querySelector(
            'meta[property="twitter:title"]'
        );
        const title = titleElement?.getAttribute("content") || "download";

        const dir = (urls[0].split('/').pop() || '').split('_')[0];

        setIsLoading(true);
        try {
            const data = {
                tool: "SimpleHttp",
                delete_policy: "delete_on_upload_succeed",
                path: `${settings.alistStoragePath}/${dir}_${title}`,
                urls,
            };
            const response: AlisResponse = await uploadImage(settings, data);
            if (response.code === 200) {
                setOpen(false);
                toast.success("离线下载任务已创建！");
            } else {
                toast.error("创建离线下载任务失败:" + response.message);
            }
        } catch (error: any) {
            console.error("Download failed:", error);
            toast.error(`下载失败: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        images,
        quality,
        setQuality,
        open,
        setOpen,
        isLoading,
        toggleSelectImage,
        selectImageMode,
        downloadSelected,
        selectedCount: images.filter((img) => img.selected).length,
    };
};
