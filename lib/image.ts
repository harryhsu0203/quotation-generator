/** 讀取圖片檔、縮圖壓縮後轉成 data URL，避免超過 localStorage 容量。 */
export function fileToCompressedDataUrl(
  file: File,
  maxSize = 400,
  type: "image/png" | "image/jpeg" = "image/png",
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("請選擇圖片檔"));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("讀取檔案失敗"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("無法解析圖片"));
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("無法處理圖片"));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL(type, 0.85));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}
