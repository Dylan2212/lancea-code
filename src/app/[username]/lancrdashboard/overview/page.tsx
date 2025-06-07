"use client"
import LancrSuggestedAction from "../components/lancrSuggestAction"
import "./lancrDash.css"
import { CircleSmall, ChevronDown, Eye, FolderOpen, Laptop, User, Brain, GraduationCap, Trophy, Star } from "lucide-react"
import Link from "next/link"

export default function LancrOverview () {

  return (
    <main className="relative w-full overflow-auto">
      <div className="lancr-live-site-indicator">
        <p>Your site is:</p>
        <div className="relative">
          <select className="is-live-dash-selector appearance-none" name="siteIsLiveNotLive" id="siteIsLiveNotLive">
            <option value="Live">Live</option>
            <option value="Hidden">Hidden</option>
          </select>
          <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
            <CircleSmall className="w-5 h-5 text-white fill-green-600" />
          </div>
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
            <ChevronDown />
          </div>
        </div>
      </div>
      <p className="text-2xl font-semibold m-5">Welcome, Dylan2212 👋</p>
      <section className="mt-20 ml-12">
        <h2 className="lancr-freelancer-h2">Suggested For You</h2>
        <div className="flex gap-12">
          <LancrSuggestedAction/>
          <LancrSuggestedAction/>
          <LancrSuggestedAction/>
        </div>
      </section>
      <section className="mt-20 ml-12">
        <h2 className="lancr-freelancer-h2">Analytics</h2>
        <div className="lancr-analytics-box box-main">
          <div>
            <select name="lancr-analytics-timeframe" id="lancr-analytics-timeframe">
              <option value="7 Days">7 Days</option>
            </select>
            <select name="lancr-analytics-data" id="lancr-analytics-data">
              <option value="Views">Views</option>
            </select>
          </div>
        </div>
      </section>
      <section className="mt-20 ml-12 mb-12">
        <h2 className="lancr-freelancer-h2">Quick Links</h2>
        <div className="grid grid-cols-4 w-2/3 gap-6">
          <Link className="lancr-quick-link-dash hov-standrd" href="/"><Eye />Preview Site</Link>
          <Link className="lancr-quick-link-dash hov-standrd" href="/username/lancrdashboard/portfolio"><FolderOpen/>Portfolio</Link>
          <Link className="lancr-quick-link-dash hov-standrd" href="/username/lancrdashboard/services"><Laptop/>Services</Link>
          <Link className="lancr-quick-link-dash hov-standrd" href="/username/lancrdashboard/about"><User />About</Link>
          <Link className="lancr-quick-link-dash hov-standrd" href="/username/lancrdashboard/achievements"><Trophy />Achievements</Link>
          <Link className="lancr-quick-link-dash hov-standrd" href="/username/lancrdashboard/reviews"><Star />Reviews</Link>
          <Link className="lancr-quick-link-dash hov-standrd" href="/username/lancrdashboard/skills"><Brain />Skills</Link>
          <Link className="lancr-quick-link-dash hov-standrd" href="/username/lancrdashboard/education"><GraduationCap />Education</Link>
        </div>
      </section>
    </main>
  )
}