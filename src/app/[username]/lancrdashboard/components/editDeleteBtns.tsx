import Link from "next/link"
import { Trash2, Pencil } from "lucide-react"
import "./editDeleteBtns.css"

export default function EditDeleteBtns () {
  return (
    <div className="flex items-center justify-end mr-3 gap-2">
      <Link className="lancr-main-project-edit-dlt-btns" href="/username/lancrdashboard/services/addEditServices"><Pencil className="h-5 w-5" />Edit</Link>
      <Link className="lancr-main-project-edit-dlt-btns" href="/"><Trash2 className="h-5 w-5" />Delete</Link>
    </div>
  )
}