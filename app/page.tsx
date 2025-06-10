"use client"

import BookWishlist from "@/components/BookWishlist"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Book Wishlist</h1>
      <BookWishlist />
    </div>
  )
}
