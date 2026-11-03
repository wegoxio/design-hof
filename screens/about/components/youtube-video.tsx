import { VideoPlaceholder } from "./video-placeholder";

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

const YOUTUBE_VIDEO_ID = /^[a-zA-Z0-9_-]{11}$/;

function getYoutubeEmbedUrl(url: string) {
  const normalizedUrl = url.trim().startsWith("http")
    ? url.trim()
    : `https://${url.trim()}`;

  try {
    const parsedUrl = new URL(normalizedUrl);
    const hostname = parsedUrl.hostname.toLowerCase();
    const pathSegments = parsedUrl.pathname.split("/").filter(Boolean);
    let videoId: string | null = null;

    if (hostname === "youtu.be" || hostname === "www.youtu.be") {
      videoId = pathSegments[0] ?? null;
    } else if (YOUTUBE_HOSTS.has(hostname)) {
      if (parsedUrl.pathname === "/watch") {
        videoId = parsedUrl.searchParams.get("v");
      } else if (["embed", "shorts", "live", "v"].includes(pathSegments[0])) {
        videoId = pathSegments[1] ?? null;
      }
    }

    if (!videoId || !YOUTUBE_VIDEO_ID.test(videoId)) return null;

    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  } catch {
    return null;
  }
}

type YouTubeVideoProps = {
  url: string;
  title: string;
  className?: string;
};

export function YouTubeVideo({ url, title, className }: YouTubeVideoProps) {
  const embedUrl = getYoutubeEmbedUrl(url);

  if (!embedUrl) {
    return <VideoPlaceholder label={title} className={className} />;
  }

  return (
    <div
      className={`relative overflow-hidden bg-black ${className ?? "min-h-[330px]"}`}
    >
      <iframe
        className="absolute inset-0 size-full"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
