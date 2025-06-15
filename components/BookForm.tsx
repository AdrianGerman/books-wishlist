"use client"

import { useEffect, useState } from "react"
import { Plus, BookOpen, User, DollarSign, Tag, ImageIcon } from "lucide-react"
import { Book } from "@/types/books"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const genres = [
  "Ficción",
  "No Ficción",
  "Misterio",
  "Romance",
  "Ciencia Ficción",
  "Fantasía",
  "Biografía",
  "Historia",
  "Autoayuda",
  "Poesía",
  "Drama",
  "Aventura"
]

interface Props {
  onAdd: (book: Book) => void
  initialData?: Book
}

export default function BookForm({ onAdd, initialData }: Props) {
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
    imageUrl: ""
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        author: initialData.author,
        price: initialData.price.toString(),
        genre: initialData.genre,
        imageUrl: initialData.imageUrl
      })
      setOpen(true)
    }
  }, [initialData])

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.author || !form.price || !form.genre) {
      alert("Completa todos los campos obligatorios")
      return
    }
    const newBook: Book = {
      id: initialData?.id ?? Date.now().toString(),
      title: form.title,
      author: form.author,
      price: parseFloat(form.price),
      genre: form.genre,
      imageUrl: form.imageUrl || "/placeholder.svg",
      addedAt: initialData?.addedAt ?? new Date().toLocaleDateString()
    }
    onAdd(newBook)
    setForm({ title: "", author: "", price: "", genre: "", imageUrl: "" })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!initialData && (
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Agregar Libro
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Libro" : "Agregar Nuevo Libro"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              Título *
            </Label>
            <Input
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div>
            <Label className="flex items-center gap-1">
              <User className="w-4 h-4" />
              Autor *
            </Label>
            <Input
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
            />
          </div>
          <div>
            <Label className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              Precio *
            </Label>
            <Input
              type="number"
              value={form.price}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </div>
          <div>
            <Label className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              Género *
            </Label>
            <Select
              value={form.genre}
              onValueChange={(v) => handleChange("genre", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un género" />
              </SelectTrigger>
              <SelectContent>
                {genres.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="flex items-center gap-1">
              <ImageIcon className="w-4 h-4" />
              URL de Imagen
            </Label>
            <Input
              value={form.imageUrl}
              onChange={(e) => handleChange("imageUrl", e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full mt-2">
            Guardar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
