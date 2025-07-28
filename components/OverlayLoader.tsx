import { Loader2 } from "lucide-react"; // optional spinner icon

export default function OverlayLoader({
  text= "We are working on your request..."
}: {text?: string}) {
  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>{text}</span>
      </div>
    </div>
  );
}
