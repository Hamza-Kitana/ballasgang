/** Upload image bytes to Catbox (free permanent host, no API key). */
export async function uploadImageBuffer(buffer: Buffer, filename: string): Promise<string> {
  const form = new FormData();
  form.append("reqtype", "fileupload");
  const file = new File([new Uint8Array(buffer)], filename || "upload.jpg", {
    type: guessMime(filename),
  });
  form.append("fileToUpload", file);

  const res = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: form,
  });
  const text = (await res.text()).trim();
  if (!res.ok || !/^https?:\/\//i.test(text)) {
    throw new Error(text || "Image upload failed");
  }
  return text;
}

function guessMime(filename: string) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".gif")) return "image/gif";
  return "image/jpeg";
}

export function dataUrlToBuffer(dataUrl: string): { buffer: Buffer; ext: string } {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error("Invalid image data");
  const mime = match[1]!;
  const b64 = match[2]!;
  const ext =
    mime.includes("png") ? "png" : mime.includes("webp") ? "webp" : mime.includes("gif") ? "gif" : "jpg";
  return { buffer: Buffer.from(b64, "base64"), ext };
}
