"use client"

import { useEffect, useState } from "react"
import { Heart, BookOpen } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Book } from "@/types/books"
import BookForm from "./BookForm"
import BookList from "./BookList"
import ThemeToggle from "./ThemeToggle"

export default function BookWishlist() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("bookWishlist")
    if (saved) setBooks(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("bookWishlist", JSON.stringify(books))
  }, [books])

  const addBook = (book: Book) => setBooks([book, ...books])
  const deleteBook = (id: string) => setBooks(books.filter((b) => b.id !== id))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mi Wishlist de Libros
              </h1>
              <BookOpen className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex-1 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Guarda y organiza los libros que deseas leer
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Mi Colección Deseada
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {books.length === 0
                ? "Tu wishlist está vacía. ¡Agrega tu primer libro!"
                : `${books.length} libro${
                    books.length !== 1 ? "s" : ""
                  } en tu wishlist`}
            </p>
          </div>
          <BookForm onAdd={addBook} />
        </div>

        <Separator className="mb-6 dark:bg-gray-700" />

        {books.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Aún no hay libros añadidos.
          </p>
        ) : (
          <BookList books={books} onDelete={deleteBook} />
        )}
      </div>
    </div>
  )
}
