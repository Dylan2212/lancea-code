import AddTestimonialComponent from "../components/addTestimonialComponent";

export default async function Page ({ searchParams }: { searchParams: Promise<{ action?: string; idx?: string }> }) {
  const params = await searchParams
  const action = params.action ?? "add"
  const index = params.idx === "null" ? null : Number(params.idx ?? 0)

  return (
    <div className="w-full">
      <AddTestimonialComponent action={action} index={index}/>
    </div>
  )
}