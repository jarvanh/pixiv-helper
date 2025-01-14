import React from "react";
import { cn } from "~/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Loader2, Wand2 } from "lucide-react";
import type { ImageSyncDialogProps } from "~/types";

export const ImageSyncDialog = ({
  open,
  setOpen,
  images,
  toggleSelectImage,
  selectImageMode,
  quality,
  setQuality,
  onDownload,
  isLoading,
  imgSize,
  selectSize,
}: ImageSyncDialogProps) => {
  const showDialog = () => {
    selectImageMode("unall");
    setOpen(true);
  };

  const closeDialog = () => {
    selectImageMode("unall");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" disabled={imgSize === 0} onClick={showDialog}>
          <Wand2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw]">
        <DialogHeader>
          <DialogTitle>同步图片</DialogTitle>
          <DialogDescription>请选择图片进行同步</DialogDescription>
        </DialogHeader>
        <div className="bg-white rounded-lg w-full max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className="relative cursor-pointer"
                onClick={() => toggleSelectImage(index)}
              >
                <img
                  src={img.urls.small}
                  className="h-auto w-full rounded-lg object-cover transition-all hover:scale-105"
                  alt=""
                />
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg",
                    img.selected ? "" : "hidden"
                  )}
                >
                  <svg
                    className="w-8 h-8 text-white opacity-80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-col gap-4 w-full mt-8">
            <Separator />
            <div className="pt-4">
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="请选择清晰度" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="small">小尺寸</SelectItem>
                    <SelectItem value="regular">常规</SelectItem>
                    <SelectItem value="original">原图</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Button type="button" onClick={() => selectImageMode("all")}>
                  全选
                </Button>
                <Button type="button" onClick={() => selectImageMode("unall")}>
                  反选
                </Button>
                <Button
                  type="button"
                  onClick={() => selectImageMode("reverse")}
                >
                  取消全选
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={onDownload}
                  disabled={selectSize === 0 || isLoading}
                >
                  {isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  同步到Alist
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeDialog}
                  >
                    关闭
                  </Button>
                </DialogClose>
              </div>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
