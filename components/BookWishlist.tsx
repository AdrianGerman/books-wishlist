import { useState } from "react"
import { Book } from "@/types/books"
import BookForm from "./BookForm"
import BookList from "./BookList"

export default function BookWishlist() {
  const [books, setBooks] = useState<Book[]>([])

  const addBook = (book: Book) => {
    setBooks([book, ...books])
  }

  const deleteBook = (id: string) => {
    setBooks(books.filter((book) => book.id !== id))
  }
  // const updateBook = (updatedBook: Book) => {
  //   setBooks(
  //     books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
  //   )
  // }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex  justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Mi Wishlist</h2>
        <BookForm onAdd={addBook} />
      </div>
      <BookList books={books} onDelete={deleteBook} />
    </div>
  )
}
