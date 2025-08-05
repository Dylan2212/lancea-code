import "intro.js/introjs.css"
import introJs from "intro.js"
import { useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useOriginalUserStore } from "@/lib/store/useOriginalUser"

export default function Onboarding () {
  const setHasSeenOnboarding = useOriginalUserStore(state => state.setHasSeenOnboarding)
  
  useEffect(() => {
    const markIntroComplete = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      await supabase
        .from("users")
        .update({ has_seen_onboarding: true })
        .eq("id", user?.id)

      setHasSeenOnboarding(true)
    }

    // Scroll to top first
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Delay intro to ensure scroll and render are complete
    const timer = setTimeout(() => {
      const intro = introJs()

      intro.setOptions({
        steps: [
          {
            intro: "Welcome to your Lancrly dashboard! Let's take a quick tour."
          },
          {
            element: "#bio-sect",
            intro: "This is where you add basic profile information like bio, title, and profile image."
          },
          {
            element: "#username",
            intro: "Your username will be used to create your unique URL... EX: https://lancrly.com/yourusername"
          },
          {
            element: "#social-section",
            intro: "Your social links can be added here and will be displayed with their logos on your profile page."
          },
          {
            element: "#additional-links-section",
            intro: "All your other links — work samples, testimonials, etc. — can go here with custom titles."
          }
        ],
        scrollToElement: true,
        scrollTo: 'element',
        showProgress: true,
        hidePrev: true,
        doneLabel: "Finish"
      })

      intro.onComplete(markIntroComplete)
      intro.start()
    }, 400) // Adjust delay if needed

    return () => {
      clearTimeout(timer)
      introJs().exit()
    }
  }, [setHasSeenOnboarding])

  return null
}