"use client"

import { Book } from "@/types/books"
import BookCard from "./BookCard"

interface Props {
  books: Book[]
  onDelete: (id: string) => void
}

export default function BookList({ books, onDelete }: Props) {
  if (books.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-8">
        No hay libros en tu lista.
      </p>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onDelete={onDelete} />
      ))}
    </div>
  )
}
