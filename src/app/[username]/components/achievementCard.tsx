import { X } from "lucide-react";

export default function AchievementCard () {
  return (
    <div className="p-4 border rounded-xl bg-white flex justify-between items-center shadow-sm w-5/6 mx-auto mt-4">
      <div>
        <h4 className="font-semibold text-base">💼 25+ Clients Worldwide</h4>
        <p className="text-sm text-muted">Built sites and brands for startups, solopreneurs, and agencies.</p>
      </div>
      <X className="h-8 w-8 hover:text-red-600 hov-standrd"/>
    </div>
  )
}