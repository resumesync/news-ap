import { useState, useEffect, useCallback } from "react";
import type { NewsItem } from "@/data/types";
import {
  getStoredNews,
  getPublishedNews,
  getNewsBySlug,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  togglePublishNews,
  incrementViews,
  isLikedByUser,
  toggleUserLike,
  recordNewsShare,
} from "@/lib/storage";

export function useNewsList(includeDrafts = false) {
  const [items, setItems] = useState<NewsItem[]>(() =>
    includeDrafts ? getStoredNews() : getPublishedNews(),
  );

  const refresh = useCallback(() => {
    setItems(includeDrafts ? getStoredNews() : getPublishedNews());
  }, [includeDrafts]);

  useEffect(() => {
    refresh();
    const handleDataChange = () => refresh();
    window.addEventListener("eight_news_data_changed", handleDataChange);
    return () => window.removeEventListener("eight_news_data_changed", handleDataChange);
  }, [refresh]);

  return { items, refresh };
}

export function useArticle(slug: string) {
  const [article, setArticle] = useState<NewsItem | undefined>(() => getNewsBySlug(slug));
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [viewsCount, setViewsCount] = useState<number>(0);

  useEffect(() => {
    const found = getNewsBySlug(slug);
    setArticle(found);
    if (found) {
      setLiked(isLikedByUser(found.id));
      setLikesCount(found.likes);
      // Increment views on article open
      const newViews = incrementViews(found.id);
      setViewsCount(newViews || found.views);
    }
  }, [slug]);

  useEffect(() => {
    const handleDataChange = () => {
      const found = getNewsBySlug(slug);
      if (found) {
        setArticle(found);
        setLiked(isLikedByUser(found.id));
        setLikesCount(found.likes);
        setViewsCount(found.views);
      }
    };
    window.addEventListener("eight_news_data_changed", handleDataChange);
    return () => window.removeEventListener("eight_news_data_changed", handleDataChange);
  }, [slug]);

  const handleToggleLike = useCallback(() => {
    if (!article) return;
    const res = toggleUserLike(article.id);
    setLiked(res.liked);
    setLikesCount(res.count);
  }, [article]);

  const handleShare = useCallback(
    (channel: string) => {
      if (!article) return;
      recordNewsShare(article.id, channel);
    },
    [article],
  );

  return {
    article,
    liked,
    likesCount,
    viewsCount,
    toggleLike: handleToggleLike,
    recordShare: handleShare,
  };
}

export function useNewsAdmin() {
  const { items: allNews, refresh } = useNewsList(true);

  const addArticle = useCallback(
    (data: Omit<NewsItem, "id" | "views" | "likes" | "shares" | "publishedAt">) => {
      const created = createNews(data);
      refresh();
      return created;
    },
    [refresh],
  );

  const editArticle = useCallback(
    (id: string, updates: Partial<NewsItem>) => {
      const updated = updateNews(id, updates);
      refresh();
      return updated;
    },
    [refresh],
  );

  const removeArticle = useCallback(
    (id: string) => {
      const success = deleteNews(id);
      refresh();
      return success;
    },
    [refresh],
  );

  const togglePublish = useCallback(
    (id: string) => {
      const updated = togglePublishNews(id);
      refresh();
      return updated;
    },
    [refresh],
  );

  return {
    allNews,
    addArticle,
    editArticle,
    removeArticle,
    togglePublish,
    getNewsById,
    refresh,
  };
}
