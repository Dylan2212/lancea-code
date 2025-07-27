type myProps = {
  type: "submit" | "button" | "reset",
  saving?: boolean
}

export default function SaveLancrSection ({ type, saving }: myProps) {
  return (
    <div className="w-dvw pb-12 mt-8 flex justify-end">
      <button className="
      rounded-md bg-purple-600 text-white hover:bg-purple-500 hov-standrd w-32 text-lg px-6 py-2 mr-6
      " type={type}>{saving ? "Saving..." : "Save"}</button>
    </div>
  )
}