"use client"

import { useState } from "react"
import { Book } from "@/types/books"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { User, Trash2, Pencil } from "lucide-react"
import BookForm from "./BookForm"

interface Props {
  book: Book
  onDelete: (id: string) => void
  onUpdate: (book: Book) => void
}

export default function BookCard({ book, onDelete, onUpdate }: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-purple-200 dark:hover:shadow-purple-900/50">
      <CardContent className="p-0">
        <div className="relative">
          <div className="h-48 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.imageUrl || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-cover rounded-t-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=192&width=300"
              }}
            />
          </div>

          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Estás seguro?</DialogTitle>
              </DialogHeader>
              <p className="text-gray-700 dark:text-gray-300">
                ¿Deseas eliminar <strong>{book.title}</strong> de tu lista?
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  onClick={() => setConfirmOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  onClick={() => {
                    onDelete(book.id)
                    setConfirmOpen(false)
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 left-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm cursor-pointer"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  Editar Libro
                </DialogTitle>
              </DialogHeader>
              <BookForm
                initialData={book}
                onAdd={(updatedBook) => {
                  onUpdate({
                    ...updatedBook,
                    id: book.id,
                    addedAt: book.addedAt
                  })
                  setEditOpen(false)
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {book.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex items-center gap-1">
            <User className="w-3 h-3" />
            {book.author}
          </p>
          <div className="flex items-center justify-between mb-3">
            <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
              {book.genre}
            </Badge>
            <span className="font-bold text-xl text-green-600 dark:text-green-400">
              ${book.price.toFixed(2)}
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Agregado: {book.addedAt}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
