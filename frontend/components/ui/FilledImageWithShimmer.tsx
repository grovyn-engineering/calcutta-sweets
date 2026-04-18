"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
} & Pick<ImageProps, "unoptimized">;

export default function FilledImageWithShimmer({
  src,
  alt,
  sizes,
  className = "object-cover",
  priority,
  unoptimized,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full min-h-0">
      {!loaded && (
        <div
          className="absolute inset-0 z-[1] rounded-[inherit] storefront-shimmer-surface"
          aria-hidden
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={unoptimized}
        className={className}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}
