"use client"
import { ReactNode } from "react"
import LancrMainHeader from "./components/lancrMainHeader"
import "./lancrMain.css"
import DeleteAccountModal from "./components/DeleteAccountModal"
import { useState } from "react"
import toast from "react-hot-toast"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()
  

  async function deleteAccount() {
    setDeleting(true)

    const { data: { session }, error} = await supabase.auth.getSession()
    if (error || !session) throw new Error("Unable to get session")

    const accessToken = session.access_token

    try {
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      })

      const data = await response.json()

      if (!response.ok) {
        console.error('Failed to delete account:', data.error)
        alert('Failed to delete account: ' + data.error)
        setDeleting(false)
        return
      }

      // On success, close modal (handled outside or here if you pass setter) and sign out
      localStorage.clear()

      toast.success("Account Deleted")
      router.push("/")
    } catch (error) {
      console.error('Unexpected error deleting account:', error)
      alert('Unexpected error deleting account')
    } finally{
      setDeleting(false)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <LancrMainHeader setShowDeleteModal={setShowDeleteModal} />
      <main className="flex flex-1 overflow-hidden">
          {children}
      </main>
      {showDeleteModal && (<DeleteAccountModal deleting={deleting} onClose={() => setShowDeleteModal(false)} onDelete={deleteAccount}/>)}
    </div>
  )
}