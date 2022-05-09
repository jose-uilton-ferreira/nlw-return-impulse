import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  onScreenshotTook: (screenshot: string | null) => void;
  screenshot: string | null;
  disabled: boolean;
}

export function ScreenshotButton({ onScreenshotTook, screenshot, disabled }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="w-10 h-10 flex justify-end items-end text-zinc-400 hover:text-zinc-100 
                   transition-colors rounded-md"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 160,
        }}
        onClick={() => onScreenshotTook(null)}
      >
        <Trash className="w-4 h-4" weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-md transition-colors 
                   focus:outline-none focus:ring-offset-2 focus:ring-offset-zinc-900
                   focus:ring-2 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-zinc-800"
      onClick={handleTakeScreenshot}
      disabled={disabled}
    >
      { isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" /> }
    </button>
  )
}