import React from "react";
import client from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  const posts = await client.fetch(`
    *[_type == "post"]{
      _id, title, slug, publishedAt, 
      mainImage, "author": author->{name}, 
      "categories": categories[]->title
    }
  `);

  // Group posts by category
  const groupedPosts = posts.reduce((acc, post) => {
    const category = post.categories?.[0] || "Uncategorized";

    if (!acc[category]) acc[category] = [];
    acc[category].push(post);

    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center py-6 px-8 border-b border-gray-800">
        <h1 className="text-3xl font-bold text-white">My Portfolio</h1>
        <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition">
          Contact Me
        </Link>
      </header>

      {/* Hero Section */}
      <section className="mt-10 text-center">
        <h2 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
          Welcome to My Dark Portfolio
        </h2>
        <p className="text-gray-400 mt-3 text-lg">
          Showcasing my projects and skills in UI/UX and web development
        </p>
      </section>

      {/* Posts Section */}
      <section className="mt-12 space-y-10">
        {Object.entries(groupedPosts).map(([category, posts]) => (
          <div key={category} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            {/* Category Title */}
            <h3 className="text-3xl font-bold text-blue-400 border-b border-gray-600 pb-2">
              {category}
            </h3>

            {/* Blogs in Rows */}
            <div className="mt-6 space-y-6">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="flex gap-6 bg-gray-700 border border-gray-600 rounded-lg p-5 hover:scale-[1.02] transition-transform"
                >
                  {/* Post Image */}
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      width={180}
                      height={120}
                      className="w-44 h-28 object-cover rounded-lg"
                    />
                  )}

                  {/* Post Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">
                      <Link href={`/post/${post.slug.current}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>

                    {/* Author & Date */}
                    <p className="text-gray-400 text-sm mt-1">
                      ✍️ {post.author?.name || "Unknown Author"} | 📅{" "}
                      {post.publishedAt ? new Date(post.publishedAt).toDateString() : "No date available"}
                    </p>

                    <Link href={`/post/${post.slug.current}`}>
                      <button className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
