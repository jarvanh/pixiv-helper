import React from "react";
import { Toaster } from "~/components/ui/sonner";
import { ImageSyncDialog } from "~/components/app/ImageSyncDialog";
import { useContent } from "~/hooks/use-content";

const App = () => {
  const {
    images,
    quality,
    setQuality,
    open,
    setOpen,
    isLoading,
    toggleSelectImage,
    selectImageMode,
    downloadSelected,
    selectedCount,
  } = useContent();

  return (
    <>
      <ImageSyncDialog
        open={open}
        setOpen={setOpen}
        images={images}
        toggleSelectImage={toggleSelectImage}
        selectImageMode={selectImageMode}
        quality={quality}
        setQuality={setQuality}
        onDownload={downloadSelected}
        isLoading={isLoading}
        imgSize={images.length}
        selectSize={selectedCount}
      />
      <Toaster richColors position={"top-center"}/>
    </>
  );
};

export default App;
