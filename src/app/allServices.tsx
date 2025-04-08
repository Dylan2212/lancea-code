import FreelancerServiceBox from "./freelancerServiceBox";

export default function AllServices () {
  return (
    <>
    {/* Add wavy element to fill white space in upper section */}
      <div className="w-3/4 mx-auto">
        <h1 className="text-4xl ml-5">My Services</h1>
        <p className="text-lg text-gray-700 w-96 mb-20 mt-2 ml-5">Check out the ways I can help you attract more customers through digital advertising</p>
      </div>
      <main className="grid grid-cols-3 gap-y-24 mb-16">
        <FreelancerServiceBox/>
        <FreelancerServiceBox/>
        <FreelancerServiceBox/>
        <FreelancerServiceBox/>
        <FreelancerServiceBox/>
        <FreelancerServiceBox/>
      </main>
    </>
  )
}