import { Share } from "lucide-react";
import { MouseEvent } from "react";

export default function ShareButton({
  title,
  url,
  text,
}: {
  title: string;
  text: string;
  url: string;
}) {
  const handleShare = async (e: MouseEvent): Promise<void> => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Your browser does not support the Web Share API.");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 transition"
    >
      <Share className="h-5 w-5" />
      Share
    </button>
  );
}
