"use client"
import useServicesManager from "../../hooks/useServicesManager"

export default function Page () {
  const { loading, services } = useServicesManager()

  return (
    <section className="pt-16 w-screen lg:w-full">
      <h1 className="text-2xl font-semibold m-5 mb-0">My Services</h1>
      <h2 className="ml-5 text-sm max-w-[75%]">Add and manage the services you want to showcase on your portfolio.</h2>
      {loading && <p>Loading</p>}
      {services.map((service) => <p key={service.id}>word</p>)}
    </section>
  )
}