import React from "react";
import client from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default async function BlogPost({ params }) {
  const { slug } = await params;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      body,
      "mainImage": mainImage.asset->url,
      "author": author->name,
      "category": categories[0]->title
    }`,
    { slug }
  );

  if (!post) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-10">
      <header className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-extrabold text-gray-100">My Portfolio</h1>
      </header>

      <article className="max-w-3xl mx-auto bg-gray-800 shadow-lg rounded-2xl p-8 border border-gray-700">
        <h1 className="text-4xl font-extrabold leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-gray-400 mt-3 text-lg">
          <span>🖊️ {post.author || "Unknown Author"}</span>
          <span>📌 {post.category || "Uncategorized"}</span>
          <span>📅 {post.publishedAt ? new Date(post.publishedAt).toDateString() : "No date available"}</span>
        </div>

        {post.mainImage && (
          <div className="mt-6">
            <Image
              src={post.mainImage}
              alt={post.title}
              width={400}
              height={200}
              className="rounded-lg shadow-md mx-auto"
            />
          </div>
        )}

        <div className="mt-8 text-lg leading-relaxed text-gray-300 space-y-6">
          {post.body?.map((block, index) => (
            <p key={index} className="border-l-4 border-gray-600 pl-4">{block.children[0]?.text}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
