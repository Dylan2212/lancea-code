"use client"
import useServicesManager from "../../hooks/services/useServicesManager"
import AddService from "./components/addService"
import DisplayServiceCard from "./components/displayServiceCard"
import ConfirmDeleteModal from "../components/confirmDeleteModal"

export default function Page () {
  const { loading, services, deleting, deleteService, showDeleteModal, setShowDeleteModal } = useServicesManager()

  //DONT WORRY UI YET
  //HOOK UP DELETE
  //WHAT IS ACTUALLY NEEDED FOR THE DELETE MODAL?
  //THEN HOOK UP EDIT

  return (
    <section className="pt-16 w-screen lg:w-full">
      <h1 className="text-2xl font-semibold m-5 mb-0">My Services</h1>
      <h2 className="ml-5 text-sm max-w-[75%]">Add and manage the services you want to showcase on your portfolio.</h2>
      {loading ? <p>Loading</p> :
        <>
          <AddService/>
          {services.length > 0 && services.filter(Boolean).map((service, index) => (
            <div key={service.id} className="group" >
              <DisplayServiceCard title={service.title} price={service.price} description={service.description}/>
              <div className="opacity-0 group-hover:opacity-100">
                <button>Edit</button>
                <button onClick={() => setShowDeleteModal({ show: true, id: service.id, index })}>Delete</button>
              </div>
            </div>
          ))}
        </>
      }
      {showDeleteModal.show && <ConfirmDeleteModal onDelete={deleteService} onClose={() => setShowDeleteModal({ show: false, id: "", index: 0 })} deleting={deleting} property="service"/>}
    </section>
  )
}