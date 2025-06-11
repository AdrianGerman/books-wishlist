"use client"

import { Book } from "@/types/books"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trash2, User } from "lucide-react"

interface Props {
  book: Book
  onDelete: (id: string) => void
}

export default function BookCard({ book, onDelete }: Props) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg"
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-red-500"
            onClick={() => onDelete(book.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold">{book.title}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <User className="w-4 h-4" /> {book.author}
          </p>
          <div className="flex justify-between items-center mt-2">
            <Badge>{book.genre}</Badge>
            <span className="text-green-600 font-semibold">
              ${book.price.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Agregado: {book.addedAt}</p>
        </div>
      </CardContent>
    </Card>
  )
}
