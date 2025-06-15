"use client"

import { Book } from "@/types/books"
import BookCard from "./BookCard"

interface Props {
  books: Book[]
  onDelete: (id: string) => void
  onUpdate: (book: Book) => void
}

export default function BookList({ books, onDelete, onUpdate }: Props) {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}
