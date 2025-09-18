"use client"
import { ReactNode, useContext, useState, createContext, useEffect } from "react"
import LancrMainHeader from "./components/lancrMainHeader"
import "./lancrMain.css"
import ConfirmDeleteModal from "./components/confirmDeleteModal"
import toast from "react-hot-toast"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import FeedbackModal from "./components/feedbackModal"
import Sidebar from "./components/sidebar"
import BottomNav from "./components/bottomNav"

type Props = {
  children: ReactNode
}

type ModalContextType = {
  openFeedbackModal: () => void
};

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export default function Layout({ children }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  useEffect(() => {
  if (showDeleteModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => {
    document.body.style.overflow = "";
  };
}, [showDeleteModal]);

useEffect(() => {
  if (showFeedbackModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => {
    document.body.style.overflow = "";
  };
}, [showFeedbackModal]);

  const openFeedbackModal = () => setShowFeedbackModal(true)

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
    <ModalContext.Provider value={{ openFeedbackModal }}>
      <div className="flex flex-col">
        <LancrMainHeader setShowDeleteModal={setShowDeleteModal} />
        <main className="flex flex-1 justify-end">
          <div className="lg:w-[80%] xl:w-[85%]">
            {children}
          </div>
        </main>
        <Sidebar/>
        <BottomNav/>
        {showFeedbackModal && <FeedbackModal onClose={() => setShowFeedbackModal(false)}/>}
        {showDeleteModal && (<ConfirmDeleteModal property="account" deleting={deleting} onClose={() => setShowDeleteModal(false)} onDelete={deleteAccount}/>)}
      </div>
    </ModalContext.Provider>
  )
}

export function useModals () {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModals must be used within Layout")
  }
  return context
}