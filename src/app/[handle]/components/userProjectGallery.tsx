"use client";

import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react"
import PhotoAlbum, { RenderImageContext, RenderImageProps } from "react-photo-album";
import "react-photo-album/masonry.css";

type Props = {
  images: Record<string, string>[] | undefined;
  cover?: string;
};

type Photo = {
  src: string;
  width: number;
  height: number;
};

export default function UserProjectGallery({ images, cover }: Props) {
  const [open, setOpen] = useState(false)
  if (!images || !cover) return null;

  // Parse aspect ratio or fallback to 1:1
  const photos: Photo[] = images.map((image) => {
    let width = 1;
    let height = 1;

    if (image.aspectRatio) {
      const [w, h] = image.aspectRatio.split("/").map(Number);
      if (!isNaN(w) && !isNaN(h)) {
        width = w;
        height = h;
      }
    }

    return {
      src: image.url,
      width,
      height,
    };
  });

  function renderNextImage(
    { alt = "", title }: RenderImageProps,
    { photo, width, height }: RenderImageContext
  ) {
    return (
      <div
        style={{
          width: "100%",
          position: "relative",
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <Image fill src={photo.src} alt={alt} title={title} style={{ objectFit: "cover" }} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div
        className="relative w-full aspect-[4/3] group rounded-xl cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image src={cover} alt="Cover" fill className="object-cover rounded-xl" />
        <p className="absolute group-hover:bg-black transition-all duration-200 ease-in-out bottom-2 right-2 text-sm font-semibold text-white bg-black/50 rounded-full px-3 py-2">View +{photos.length - 1} more</p>
      </div>
      {open && <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
        <div className="relative bg-white rounded-2xl max-w-6xl w-full px-6 pb-6 py-12 overflow-y-auto max-h-[90vh]">
          <X onClick={() => setOpen(false)} className="absolute top-2 right-3 cursor-pointer rounded-md w-8 h-8 transition-all ease-in-out duration-300 hover:bg-red-500 hover:text-white" />
          <PhotoAlbum
            photos={photos}
            layout="masonry"
            columns={2}
            render={{ image: renderNextImage }}
            defaultContainerWidth={800}
          />
        </div>
      </div>}
    </div>
  )
}