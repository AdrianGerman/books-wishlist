import { useState } from "react"
import { Book } from "@/types/books"
import BookForm from "./BookForm"

export default function BookWishlist() {
  const [books, setBooks] = useState<Book[]>([])

  const addBook = (book: Book) => {
    setBooks([book, ...books])
  }

  // const deleteBook = (id: string) => {
  //   setBooks(books.filter((book) => book.id !== id))
  // }
  // const updateBook = (updatedBook: Book) => {
  //   setBooks(
  //     books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
  //   )
  // }

  return (
    <>
      <div>
        <BookForm onAdd={addBook} />
      </div>
    </>
  )
}
