"use client"
import useServicesManager from "../../hooks/services/useServicesManager"
import AddService from "./components/addService"
import DisplayServiceCard from "./components/displayServiceCard"
import ConfirmDeleteModal from "../components/confirmDeleteModal"
import Link from "next/link"

export default function Page () {
  const { loading, services, deleting, deleteService, showDeleteModal, setShowDeleteModal } = useServicesManager()

  return (
    <section className="pt-16 w-screen lg:w-full">
      <h1 className="text-2xl font-semibold m-5 mb-0">My Services</h1>
      <h2 className="ml-5 text-sm max-w-[75%]">Add and manage the services you want to showcase on your portfolio.</h2>
      <div className="w-full pb-16">
        <div className="px-8 grid gap-y-6 mt-8 w-full
          md:grid-cols-2
          xl:grid-cols-3
          ">
          {loading ? <p>Loading</p> :
            <>
              <AddService/>
              {services.length > 0 && services.filter(Boolean).map((service, index) => (
                <div key={service.id} className="group w-[325px]" >
                  <DisplayServiceCard title={service.title} price={service.price} description={service.description}/>
                  <div className="opacity-0 group-hover:opacity-100 flex justify-end gap-6 pt-5 transition-all ease-in-out duration-200">
                    <Link href={`/lancrdashboard/services/addeditservice?action=Edit&idx=${index}`} className="py-2 px-4 text-white hover:bg-[#6B21A8] hov-standrd bg-[#7E22CE] rounded-lg">Edit</Link>
                    <button className="py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 hov-standrd" onClick={() => setShowDeleteModal({ show: true, id: service.id, index })}>Delete</button>
                  </div>
                </div>
              ))}
            </>
          }
        </div>
      </div>
      {showDeleteModal.show && <ConfirmDeleteModal onDelete={deleteService} onClose={() => setShowDeleteModal({ show: false, id: "", index: 0 })} deleting={deleting} property="service"/>}
    </section>
  )
}