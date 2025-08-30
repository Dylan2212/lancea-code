"use client"
import Modal from "react-modal"
import { useEffect } from "react"
import { ClipLoader } from "react-spinners"

type DeleteAccountModalProps = {
  onClose: () => void
  onDelete: () => void
  deleting?: boolean,
  property: string
}

export default function ConfirmDeleteModal ({ onDelete, onClose, deleting, property }: DeleteAccountModalProps) {
  useEffect(() => {
    Modal.setAppElement('body')
  }, [])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
        <p className="text-sm text-gray-600 mb-6">
          Deleting your {property} is permanent and cannot be undone.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 w-32 hov-standrd py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              onDelete()
              onClose()
            }}
            className="px-4 w-32 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            {deleting ? <ClipLoader size={20} color="#f3f4f6" speedMultiplier={1} cssOverride={{ borderWidth: "3px" }} /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}