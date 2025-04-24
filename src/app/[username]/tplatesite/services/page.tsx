import FreelancerServiceBox from "../components/freelancerServiceBox";
import TplateHeros from "../components/tplateHero";

export default function AllServices () {
  return (
    <>
      <TplateHeros/>
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