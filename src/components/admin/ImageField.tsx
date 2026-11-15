"use client";

import { useRef, useState, type DragEvent } from "react";
import { ImagePlus, Link2, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { uploadAdminImage } from "@/server/admin.fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Field, adminFieldClass } from "./fields";

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  aspect?: "square" | "video" | "portrait";
  className?: string;
};

async function fileToCompressedDataUrl(file: File, maxSide = 1280, quality = 0.82) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", quality);
}

export function ImageField({
  label,
  value,
  onChange,
  hint,
  aspect = "square",
  className,
}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const aspectClass =
    aspect === "video" ? "aspect-video" : aspect === "portrait" ? "aspect-[4/5]" : "aspect-square";

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("اختَر صورة فقط · Image files only");
      return;
    }
    setUploading(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      const result = (await uploadAdminImage({
        data: { dataUrl, filename: file.name },
      })) as { url?: string };
      if (!result.url) throw new Error("No URL returned");
      onChange(result.url);
      toast.success("تم رفع الصورة · Image uploaded");
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "فشل رفع الصورة");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    void handleFiles(e.dataTransfer.files);
  };

  return (
    <Field label={label} hint={hint} className={className}>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,11rem)_1fr]">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={cn(
            "cms-image-drop relative overflow-hidden rounded-2xl border border-dashed",
            aspectClass,
            dragOver
              ? "border-primary bg-primary/20"
              : "border-white/20 bg-black/35",
          )}
        >
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 px-3 text-center text-white/45">
              <ImagePlus className="h-7 w-7" />
              <span className="text-[10px] tracking-[0.14em]">معاينة</span>
            </div>
          )}
          {uploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/65 backdrop-blur-sm">
              <Loader2 className="h-7 w-7 animate-spin text-violet-soft" />
            </div>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <div className="relative">
            <Link2 className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
            <Input
              className={cn(adminFieldClass, "ps-9")}
              dir="ltr"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://… أو /shop/…"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              className="cms-btn-primary"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
              رفع صورة
            </Button>
            {value ? (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                disabled={uploading}
                onClick={() => onChange("")}
              >
                <Trash2 className="h-4 w-4" />
                مسح
              </Button>
            ) : null}
          </div>
          <p className="text-[11px] leading-relaxed text-white/40">
            اسحب صورة هنا أو ارفع من الجهاز — تتحفظ كرابط جاهز للموقع.
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => void handleFiles(e.target.files)}
          />
        </div>
      </div>
    </Field>
  );
}
