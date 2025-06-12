"use client"

import BookWishlist from "@/components/BookWishlist"

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
        📚 Book Wishlist App
      </h1>
      <BookWishlist />
    </main>
  )
}
