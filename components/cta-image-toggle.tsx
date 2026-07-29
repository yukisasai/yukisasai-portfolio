"use client";

import { useState } from "react";
import Image from "next/image";

export function CtaImageToggle({
  label,
  imageSrc,
  imageAlt,
}: {
  label: string;
  imageSrc: string;
  imageAlt: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="btn btn-primary"
      >
        {label} {open ? "↑" : "→"}
      </button>
      {open && (
        <div className="mt-6 overflow-hidden rounded-xl border border-line sm:mt-8 sm:rounded-2xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1280}
            height={7200}
            sizes="(max-width: 896px) 100vw, 896px"
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
