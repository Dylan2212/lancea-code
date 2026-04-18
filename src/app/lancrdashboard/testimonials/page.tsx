"use client"
import AddTestimonial from "./components/addTestimonial";
import Link from "next/link";
import useTestimonialManager from "../../hooks/testimonials/useTestimonialManager";
import { DisplayTestimonial } from "./components/displayTestimonial";
import ConfirmDeleteModal from "../components/confirmDeleteModal";

//ADD EDIT
//ADD DELETE

export default function Page () {
  const { loading, testimonials, setShowDeleteModal, showDeleteModal, deleteTestimonial, deleting } = useTestimonialManager()

  return (
    <section className="pt-16 w-screen lg:w-full pb-12">
      <h1 className="text-2xl font-semibold m-5 mb-0">My Testimonials</h1>
      <h2 className="ml-5 text-sm max-w-[75%]">Add and manage customer testimonials to showcase on your portfolio.</h2>
      <div className="w-full pb-16 flex justify-center">
        <div className="grid gap-y-12 lg:gap-y-6 mt-8 md:w-full
          sm:w-fit
          md:px-8
          lg:grid-cols-2
          xl:grid-cols-3
          ">
          {loading ? <p>Loading...</p> : 
            <>
              <AddTestimonial/>
              {testimonials.length > 0 && testimonials.filter(Boolean).map((testimonial, index) => (
                <div key={testimonial.id} className="group">
                  <DisplayTestimonial body={testimonial.body} name={testimonial.name}/>
                  <div className="lg:opacity-0 lg:group-hover:opacity-100 flex justify-end gap-6 pt-5 transition-all ease-in-out duration-200">
                   <Link href={`/lancrdashboard/testimonials/addedittestimonial?action=Edit&idx=${index}`} className="py-2 px-4 text-white hover:bg-[#6B21A8] hov-standrd bg-[#7E22CE] rounded-lg">Edit</Link>
                   <button className="py-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 hov-standrd" onClick={() => setShowDeleteModal({ show: true, id: testimonial.id, index })}>Delete</button>
                  </div>
                </div>
              ))}
            </>
          }
        </div>
      </div>
      {showDeleteModal.show && <ConfirmDeleteModal onDelete={deleteTestimonial} onClose={() => setShowDeleteModal({ show: false, id: "", index: 0 })} deleting={deleting} property="testimonial"/>}
    </section>
  )
}