"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const POSTS_API = "https://brennanswave.info/wp-json/wp/v2/posts?_embed";

interface WpFeaturedMedia {
  source_url: string;
  alt_text?: string;
}

interface WpPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  featured_media?: number;
  _embedded?: {
    "wp:featuredmedia"?: WpFeaturedMedia[];
  };
}

export default function BlogContainer() {
  const [posts, setPosts] = useState<WpPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<WpPost[]>(POSTS_API)
      .then((res) => setPosts(res.data))
      .catch(() => setError("Failed to load posts."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-gray-600">Loading posts…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-gray-600">No posts yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.id} className="border-b border-gray-200 pb-8 last:border-0">
            <article>
              {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                <Link href={`/blog/${post.slug}`} className="block mb-4 overflow-hidden rounded-lg">
                  <img
                    src={post._embedded["wp:featuredmedia"][0].source_url}
                    alt={post._embedded["wp:featuredmedia"][0].alt_text ?? ""}
                    className="w-full h-48 object-cover"
                  />
                </Link>
              )}
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </Link>
              </h2>
              <time
                dateTime={post.date}
                className="block text-sm text-gray-500 mb-3"
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <div
                className="text-gray-700 prose prose-gray max-w-none prose-p:mb-2"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
