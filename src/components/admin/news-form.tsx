import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, Eye, Sparkles } from "lucide-react";
import type { NewsItem, NewsStatus } from "@/data/types";
import { slugify } from "@/lib/format";
import { getYouTubeEmbedUrl } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface NewsFormProps {
  initialData?: NewsItem;
  onSubmit: (data: {
    title?: string;
    titleTe: string;
    slug?: string;
    shortSummaryTe: string;
    fullContentTe: string;
    shortDescription?: string;
    content?: string;
    image: string;
    imageCaption?: string;
    videoUrl?: string | null;
    publishedDate: string;
    publishedTime: string;
    status: NewsStatus;
    author?: string;
    readTime?: string;
  }) => void;
  isEditing?: boolean;
}

export function NewsForm({ initialData, onSubmit, isEditing = false }: NewsFormProps) {
  const navigate = useNavigate();

  const now = new Date();
  const defaultDate = now.toISOString().split("T")[0];
  const defaultTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  const [titleTe, setTitleTe] = useState(initialData?.titleTe || initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [shortSummaryTe, setShortSummaryTe] = useState(
    initialData?.shortSummaryTe || initialData?.shortDescription || "",
  );
  const [fullContentTe, setFullContentTe] = useState(
    initialData?.fullContentTe || initialData?.content || initialData?.shortSummaryTe || "",
  );
  const [image, setImage] = useState(
    initialData?.image ||
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80",
  );
  const [imageCaption, setImageCaption] = useState(initialData?.imageCaption || "");
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || "");
  const [publishedDate, setPublishedDate] = useState(initialData?.publishedDate || defaultDate);
  const [publishedTime, setPublishedTime] = useState(initialData?.publishedTime || defaultTime);
  const [status, setStatus] = useState<NewsStatus>(initialData?.status || "published");
  const [author, setAuthor] = useState(initialData?.author || "EIGHT NEWS Telugu");
  const [readTime, setReadTime] = useState(initialData?.readTime || "1 నిమిషం");

  const [autoSlug, setAutoSlug] = useState(!initialData?.slug);

  const handleTitleChange = (val: string) => {
    setTitleTe(val);
    if (autoSlug) {
      setSlug(slugify(val) || `story-${Date.now()}`);
    }
  };

  const videoEmbed = getYouTubeEmbedUrl(videoUrl);

  // Helper count words
  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;
  const summaryWordCount = wordCount(shortSummaryTe);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleTe.trim()) {
      toast.error("దయచేసి వార్తా శీర్షికను (News Title — Telugu) నమోదు చేయండి");
      return;
    }
    if (!shortSummaryTe.trim()) {
      toast.error("దయచేసి స్వైప్ ఫీడ్ కోసం సంక్షిప్త వార్తను (Short News — Telugu) నమోదు చేయండి");
      return;
    }

    const finalFullContent = fullContentTe.trim() || shortSummaryTe.trim();

    onSubmit({
      title: titleTe.trim(),
      titleTe: titleTe.trim(),
      slug: slug.trim() || slugify(titleTe) || `story-${Date.now()}`,
      shortSummaryTe: shortSummaryTe.trim(),
      shortDescription: shortSummaryTe.trim(),
      fullContentTe: finalFullContent,
      content: finalFullContent,
      image: image.trim(),
      imageCaption: imageCaption.trim() || undefined,
      videoUrl: videoUrl.trim() || null,
      publishedDate,
      publishedTime,
      status,
      author: author.trim() || "EIGHT NEWS తెలుగు",
      readTime: readTime.trim() || "1 నిమిషం",
    });

    toast.success(isEditing ? "వార్త విజయవంతంగా నవీకరించబడింది" : "కొత్త తెలుగు వార్తా షాట్ ప్రచురించబడింది");
    navigate({ to: "/admin/news" });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 font-sans">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/news"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" /> Back to News Index
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white px-5 py-2 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
          >
            <Save className="h-4 w-4" />
            {isEditing ? "Save Changes" : "Publish Dispatch"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Core editorial text */}
        <div className="lg:col-span-8 space-y-6">
          {/* Headline - Telugu */}
          <div className="bg-white border border-rule/80 rounded-xs p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="news-title-te"
                className="block text-xs uppercase tracking-wider font-semibold text-foreground font-telugu"
              >
                వార్తా శీర్షిక (News Title — Telugu) *
              </label>
              <span className="text-[11px] text-muted-foreground">సుమారు 8–15 పదాలు</span>
            </div>
            <textarea
              id="news-title-te"
              rows={2}
              value={titleTe}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="ఉదాహరణ: హైదరాబాద్‌లో భారీ వర్షాలు.. పలు ప్రాంతాల్లో ట్రాఫిక్‌కు అంతరాయం"
              required
              className="w-full font-telugu text-lg sm:text-xl font-bold bg-[#fcfbf9] border border-rule/80 rounded-xs p-3 focus:outline-none focus:border-brand resize-none leading-snug"
            />

            {/* Slug */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">URL Slug:</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  setSlug(slugify(e.target.value));
                }}
                className="flex-1 bg-[#fbfbfa] border border-rule/60 rounded-xs px-2.5 py-1 text-xs font-mono text-muted-foreground focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          {/* Short News - Telugu (For Swipe Feed) */}
          <div className="bg-white border border-rule/80 rounded-xs p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="news-short-summary-te"
                className="block text-xs uppercase tracking-wider font-semibold text-foreground font-telugu"
              >
                సంక్షిప్త వార్త (Short News — Telugu) *
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-[11px] font-semibold px-2 py-0.5 rounded-xs",
                    summaryWordCount >= 40 && summaryWordCount <= 70
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {summaryWordCount} పదాలు (సిఫార్సు: 40–70)
                </span>
              </div>
            </div>
            <textarea
              id="news-short-summary-te"
              rows={4}
              value={shortSummaryTe}
              onChange={(e) => setShortSummaryTe(e.target.value)}
              placeholder="హైదరాబాద్‌లో పలు ప్రాంతాల్లో భారీ వర్షాలు కురిశాయి. దీంతో కొన్ని ప్రధాన రహదారుల్లో ట్రాఫిక్‌కు అంతరాయం ఏర్పడింది. వాహనదారులు అప్రమత్తంగా ఉండాలని అధికారులు సూచించారు..."
              required
              className="w-full text-base font-telugu leading-relaxed bg-[#fcfbf9] border border-rule/80 rounded-xs p-3 focus:outline-none focus:border-brand"
            />
            <p className="mt-2 text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-xs border-l-2 border-brand font-telugu">
              ℹ️ <strong>ముఖ్య గమనిక:</strong> Short News is displayed in the swipe feed. Full Article is displayed after clicking 'పూర్తి వార్త'.
            </p>
          </div>

          {/* Full Article - Telugu */}
          <div className="bg-white border border-rule/80 rounded-xs p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="news-full-content-te"
                className="text-xs uppercase tracking-wider font-semibold text-foreground font-telugu"
              >
                పూర్తి కథనం (Full Article — Telugu)
              </label>
              <span className="text-[11px] text-muted-foreground">విపులమైన కథనం</span>
            </div>
            <textarea
              id="news-full-content-te"
              rows={12}
              value={fullContentTe}
              onChange={(e) => setFullContentTe(e.target.value)}
              placeholder="పూర్తి వివరాలు, నేపథ్యం, అధికారుల ప్రకటనలు మరియు తదితర సమగ్ర సమాచారాన్ని ఇక్కడ నమోదు చేయండి. పేరాగ్రాఫ్‌ల మధ్య డబుల్ ఎంటర్ ఇవ్వండి..."
              className="w-full text-base font-telugu leading-relaxed bg-[#fcfbf9] border border-rule/80 rounded-xs p-3 focus:outline-none focus:border-brand"
            />
            <p className="mt-2 text-[11px] text-muted-foreground font-sans">
              Optional if same as short summary, but recommended for deep-dive news reading on /news/:slug.
            </p>
          </div>
        </div>

        {/* Right Column: Metadata, Media & Publishing status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status & Schedule */}
          <div className="bg-white border border-rule/80 rounded-xs p-5 shadow-xs space-y-4">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-foreground border-b border-rule pb-2">
              Publishing Controls
            </h3>

            <div>
              <label
                htmlFor="news-status"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Publication Status
              </label>
              <select
                id="news-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as NewsStatus)}
                className="w-full bg-[#fbfbfa] border border-rule/80 rounded-xs px-3 py-2 text-xs font-semibold focus:outline-none focus:border-brand"
              >
                <option value="published">Published (Live)</option>
                <option value="unpublished">Unpublished (Hidden)</option>
                <option value="draft">Draft (Work in progress)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="news-published-date"
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Date
                </label>
                <input
                  id="news-published-date"
                  type="date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  className="w-full bg-[#fbfbfa] border border-rule/80 rounded-xs px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand"
                />
              </div>
              <div>
                <label
                  htmlFor="news-published-time"
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Time
                </label>
                <input
                  id="news-published-time"
                  type="time"
                  value={publishedTime}
                  onChange={(e) => setPublishedTime(e.target.value)}
                  className="w-full bg-[#fbfbfa] border border-rule/80 rounded-xs px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="news-author"
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Author / Byline
                </label>
                <input
                  id="news-author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-[#fbfbfa] border border-rule/80 rounded-xs px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand"
                />
              </div>
              <div>
                <label
                  htmlFor="news-read-time"
                  className="block text-xs font-medium text-muted-foreground mb-1"
                >
                  Read Time
                </label>
                <input
                  id="news-read-time"
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g. 5 min read"
                  className="w-full bg-[#fbfbfa] border border-rule/80 rounded-xs px-2.5 py-1.5 text-xs focus:outline-none focus:border-brand"
                />
              </div>
            </div>
          </div>

          {/* Lead Image */}
          <div className="bg-white border border-rule/80 rounded-xs p-5 shadow-xs space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-foreground border-b border-rule pb-2">
              Hero Image
            </h3>

            <div>
              <label
                htmlFor="news-image"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Image URL
              </label>
              <input
                id="news-image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                required
                className="w-full bg-[#fbfbfa] border border-rule/80 rounded-xs px-3 py-1.5 text-xs focus:outline-none focus:border-brand"
              />
            </div>

            {image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-xs border border-rule bg-muted">
                <img src={image} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}

            <div>
              <label
                htmlFor="news-image-caption"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                Image Caption & Credits
              </label>
              <input
                id="news-image-caption"
                type="text"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                placeholder="e.g. Engineers review silicon wafer calibration."
                className="w-full bg-[#fbfbfa] border border-rule/80 rounded-xs px-2.5 py-1 text-xs focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          {/* Video Attachment */}
          <div className="bg-white border border-rule/80 rounded-xs p-5 shadow-xs space-y-3">
            <h3 className="text-xs uppercase tracking-wider font-semibold text-foreground border-b border-rule pb-2">
              Optional Video Report
            </h3>

            <div>
              <label
                htmlFor="news-video-url"
                className="block text-xs font-medium text-muted-foreground mb-1"
              >
                YouTube / Video URL
              </label>
              <input
                id="news-video-url"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-[#fbfbfa] border border-rule/80 rounded-xs px-3 py-1.5 text-xs focus:outline-none focus:border-brand"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                Leave empty if story has no video.
              </p>
            </div>

            {videoEmbed && (
              <div className="mt-2 aspect-video w-full rounded-xs overflow-hidden border border-rule bg-black">
                <iframe
                  src={videoEmbed}
                  title="Video Preview"
                  className="h-full w-full border-0"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
