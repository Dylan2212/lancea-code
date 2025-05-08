import "./addEditProject.css"
import { SquarePlus } from "lucide-react"

export default function AddEditProject () {
  return (
    <div className="w-full overflow-auto">
      <p className="text-2xl font-semibold m-5 flex items-center gap-4">Add A New Project</p>
      <main className="w-3/4 mx-auto">
        <section className="lancr-project-add-edit-sect box-support">
          <p className="lancr-project-add-edit-sect-ttle">Add Images</p>
          <p className="text-sm text-gray-500">Add a striking cover image to represent your project, then upload additional images to showcase your work in more detail.</p>
          <div className="flex justify-around items-center mt-6 mb-4">
            <div className="lancr-add-edit-16-9 box-support hov-standrd">
            <SquarePlus className="w-16 h-16" />
              <p>Ratio: 16:9</p>
            </div>
          </div>
        </section>
        <section className="lancr-project-add-edit-sect box-support">
          <p className="lancr-project-add-edit-sect-ttle">Title & Description</p>
          <p className="text-sm text-gray-500">Give your project a name and describe what its about, your role, and the results.</p>
          <div className="mt-6 mb-3 ml-2">
            <label className="block text-lg" htmlFor="title-input">Title:</label>
            <input className="lancr-add-edit-project-input" type="text" id="title-input" placeholder="Project title" />
            <p className="max-characters">Max: 100 characters</p>
          </div>
          <div className="ml-2">
            <label className="block text-lg" htmlFor="description-input">Description:</label>
            <textarea name="description-input" id="description-input" className="text-area-lancr-add-edit-project" placeholder="Add description"></textarea>
            <p className="max-characters">Max: 1,000 characters</p>
          </div>
        </section>
        <section className="lancr-project-add-edit-sect box-support">
          <p className="lancr-project-add-edit-sect-ttle">Project Details</p>
          <p className="text-sm text-gray-500">Provide extra context like when you worked on this, how long it took, and who it was for. This helps visitors understand the scope and timeline of your work.</p>
          <div>
            <label htmlFor="client-input">Client</label>
            <input type="text" placeholder="Who did you work for" />
          </div>
          <div>
            <label htmlFor="date-input">Date:</label>
            <input type="date" name="date-input" id="date-input" />
          </div>
          <div>
            <label htmlFor="duration-input">Duration:</label>
            <input type="text" placeholder="5 days" />
          </div>
        </section>
        <section className="lancr-project-add-edit-sect box-support">
          <p className="lancr-project-add-edit-sect-ttle">Skills</p>
          <p className="text-sm text-gray-500">Highlight the main tools, technologies, or methods you used for this project. This helps potential clients understand your strengths at a glance.</p>
          <div className="mt-6 mb-3 ml-2">
            <input className="lancr-add-edit-project-input" type="text" id="title-input" placeholder="Add skills" />
            <div className="flex flex-wrap gap-y-2 w-1/2 ml-2 mt-5">
              <p className="jb-skll-in-jb-info hov-standrd">Programming</p>
              <p className="jb-skll-in-jb-info hov-standrd">CSS</p>
              <p className="jb-skll-in-jb-info hov-standrd">Design</p>
              <p className="jb-skll-in-jb-info hov-standrd">MongoDB</p>
              <p className="jb-skll-in-jb-info hov-standrd">Leadership</p>
              <p className="jb-skll-in-jb-info hov-standrd">Programming</p>
              <p className="jb-skll-in-jb-info hov-standrd">CSS</p>
              <p className="jb-skll-in-jb-info hov-standrd">Design</p>
              <p className="jb-skll-in-jb-info hov-standrd">MongoDB</p>
              <p className="jb-skll-in-jb-info hov-standrd">Leadership</p>
            </div>
          </div>
        </section>
        <section className="lancr-project-add-edit-sect box-support">
          <p className="lancr-project-add-edit-sect-ttle">Project Links</p>
          <p className="text-sm text-gray-500">Share relevant links—like a live demo, GitHub repo, or case study—so visitors can explore your work in more depth.</p>
          <div className="mt-6 mb-3 ml-2">
            <label className="block text-lg" htmlFor="title-input">Links:</label>
            <input className="lancr-add-edit-project-input" type="text" id="title-input" placeholder="https://example.com" />
            <p className="max-characters">Up to 3. Press enter after each one.</p>
          </div>
        </section>
      </main>
    </div>
  )
}