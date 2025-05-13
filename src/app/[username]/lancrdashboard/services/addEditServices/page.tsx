import "./addEditServices.css"
import "../../components/lancrPortfolio.css"
import { Asterisk, Sparkle, SquarePlus } from "lucide-react"

export default function AddEditServices () {
  return (
    <main className="w-full overflow-auto">
      <p className="text-2xl font-semibold m-5 mb-10 flex items-center gap-4">Add A New Service</p>
      <div className="w-3/4 mx-auto">
        <p className="add-edit-service-simple-enhanced-ttle">Required Fields<Asterisk /></p>
        <p className="add-edit-service-simple-enhanced-support">These are the essential details clients will see when browsing your services. Keep them clear and compelling.</p>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Add Image</p>
          <p className="text-sm text-gray-500">Add a striking cover image to represent your service.</p>
          <div className="flex justify-around items-center mt-6 mb-4">
            <div className="lancr-add-edit-16-9 box-support hov-standrd">
              <SquarePlus className="w-16 h-16" />
              <p>Ratio: 16:9</p>
            </div>
          </div>
        </section>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Title & Description</p>
          <p className="text-sm text-gray-500">Give your service a clear, compelling title and a brief description that explains what you offer and why it matters.</p>
          <div className="mt-6 mb-3 ml-2">
            <label className="block text-lg" htmlFor="title-input">Title:</label>
            <input className="lancr-add-edit-text-input" type="text" id="title-input" placeholder="Service title" />
            <p className="max-characters">Max: 100 characters</p>
          </div>
          <div className="ml-2 flex flex-col">
            <label className="block text-lg" htmlFor="description-input">Description:</label>
            <textarea name="description-input" id="description-input" className="text-area-lancr-add-edit" placeholder="Add description"></textarea>
            <p className="max-characters">Max: 1,000 characters</p>
          </div>
        </section>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Pricing</p>
          <p className="text-sm text-gray-500">Choose how you want to display your pricing: fixed, hourly, or a starting at price — whatever fits your service best.</p>
          <div className="flex">
            <div className="mt-6 mb-3 ml-2">
              <label className="block text-lg" htmlFor="pricing-options">Display as:</label>
              <select className="lancr-add-edit-text-input" name="pricing-options" id="pricing-options">
                <option value="Starting at:">Starting at:</option>
                <option value="Hourly:">Hourly:</option>
                <option value="Fixed:">Fixed:</option>
              </select>
              <p className="max-characters">Max: 100 characters</p>
            </div>
            <div className="mt-6 mb-3 ml-2">
              <label className="block text-lg" htmlFor="title-input">Title:</label>
              <input className="lancr-add-edit-text-input" type="number" id="title-input" placeholder="Service title" />
              <p className="max-characters">Max: 100 characters</p>
            </div>
          </div>
        </section>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Delivery Time</p>
          <p className="text-sm text-gray-500">Set how long it typically takes you to complete this service once its booked.</p>
          <div className="mt-6 mb-3 ml-2">
            <label className="block text-lg" htmlFor="delivery-options">Estimated delivery:</label>
            <select className="lancr-add-edit-text-input" name="delivery-options" id="delivery-options">
              <option value="1-3 days">1-3 days</option>
              <option value="3-7 days">3-7 days</option>
              <option value="1-3 weeks">1-3 weeks</option>
              <option value="1 month">1 month</option>
              <option value="2-3 months">2-3 months</option>
              <option value="3-6 months">3-6 months</option>
              <option value="Ongoing (continuous work)">Ongoing (continuous work)</option>
            </select>
            <p className="max-characters">Max: 100 characters</p>
          </div>
        </section>
        <p className="add-edit-service-simple-enhanced-ttle">Enhanced Listing<Sparkle /></p>
        <p className="add-edit-service-simple-enhanced-support">Fill out ALL fields below to create a full service landing page. Skipping any will disable the page — this section works only if completed in full.</p>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Intro Subheading</p>
          <p className="text-sm text-gray-500">Enter a brief, attention-grabbing line that highlights your services key value or appeal. This will be displayed below the service title and should set the tone for the rest of your page.</p>
          <div className="mt-6 mb-3 ml-2">
            <label className="block text-lg" htmlFor="title-input">Subheading:</label>
            <input className="lancr-add-edit-text-input" type="text" id="title-input" placeholder="Service subheading" />
            <p className="max-characters">Max: 100 characters</p>
          </div>
        </section>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Whats Included</p>
          <p className="text-sm text-gray-500">List all the deliverables and services that come with this offering. Be clear about what the client will receive, so they know exactly what theyre getting.</p>
          <div className="w-1/2">
            <div className="mt-6 mb-3 ml-2">
              <label className="block text-lg" htmlFor="title-input">Deliverable:</label>
              <input className="lancr-add-edit-text-input" type="number" id="title-input" placeholder="Deliverable" />
              <p className="max-characters">Max: 100 characters</p>
            </div>
            <div className="mt-6 mb-3 ml-2">
              <label className="block text-lg" htmlFor="title-input">Deliverable:</label>
              <input className="lancr-add-edit-text-input" type="number" id="title-input" placeholder="Deliverable" />
              <p className="max-characters">Max: 100 characters</p>
            </div>
            <div className="mt-6 mb-3 ml-2">
              <label className="block text-lg" htmlFor="title-input">Deliverable:</label>
              <input className="lancr-add-edit-text-input" type="number" id="title-input" placeholder="Deliverable" />
              <p className="max-characters">Max: 100 characters</p>
            </div>
            <button className="w-3/4 border bg-purple-600 text-white">
              Add Deliverable +
            </button>
          </div>
        </section>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">How It Works</p>
          <p className="text-sm text-gray-500">Give clients a quick overview of your process—what happens after they book, step by step.</p>
          <div className="w-full flex items-center mt-6 ml-12">
            <p className="text-xl min-w-fit">Step 1:</p>
            <div className="flex w-full gap-6">
              <div className="border-l-2 pl-4 ml-4 w-5/12">
                <label className="block" htmlFor="title-input">Title:</label>
                <input className="split-lancr-add-edit-text-input" type="text" id="title-input" placeholder="Recieve custom quote" />
                <p className="max-characters">Max: 100 characters</p>
              </div>
              <div className="ml-2 flex flex-col w-5/12">
                <label className="block" htmlFor="description-input">Description:</label>
                <textarea name="description-input" id="description-input" className="split-text-area-lancr-add-edit" placeholder="Add description"></textarea>
                <p className="max-characters">Max: 350 characters</p>
              </div>
            </div>
          </div>
        </section>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Why Choose You?</p>
          <p className="text-sm text-gray-500">Share what sets you apart—your experience, values, or unique strengths that make you the best fit for the job.</p>
          <div className="w-1/2">
            <div className="mt-6 mb-3 ml-2">
              <label className="block text-lg" htmlFor="title-input">Reason 1:</label>
              <input className="lancr-add-edit-text-input" type="text" id="title-input" placeholder="Deliverable" />
              <p className="max-characters">Max: 100 characters</p>
            </div>
            <div className="mt-6 mb-3 ml-2">
              <label className="block text-lg" htmlFor="title-input">Reason 2:</label>
              <input className="lancr-add-edit-text-input" type="text" id="title-input" placeholder="Deliverable" />
              <p className="max-characters">Max: 100 characters</p>
            </div>
            <div className="mt-6 mb-3 ml-2">
              <label className="block text-lg" htmlFor="title-input">Reason 3:</label>
              <input className="lancr-add-edit-text-input" type="text" id="title-input" placeholder="Deliverable" />
              <p className="max-characters">Max: 100 characters</p>
            </div>
          </div>
        </section>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Example Projects</p>
          <p className="text-sm text-gray-500">Show off your past work to help buyers understand what you can deliver. Choose up to 3 of your best projects related to this service.</p>
          <div className="mt-4 ml-5 mb-2 grid grid-cols-2">
            <div className="lancr-main-portfolio-project-cntnr grid box-main hov-standrd hover:bg-gray-100">
              <div className="mx-auto my-auto w-2/3 text-center">
                <SquarePlus className="w-16 h-16 mx-auto" />
                <p className="text-lg mb-1">Add project example</p>
                <p className="text-sm text-gray-600">Select from your existing projects to show work related to this service.</p>
              </div>
            </div>
            <div>
              <p className="lancr-add-edit-sect-ttle">Selected Projects</p>
              <div className="border-l-4 pl-3 mt-5">
                <p className="w-11/12 line-clamp-1 mb-1">Project Title</p>
                <p className="text-sm text-gray-600 line-clamp-2 w-11/12">Project description so it will be a bit longer but i will cut it off at 2 lines so it doesnt go too long</p>
                <button className="lancr-dlt-btn ml-auto mr-5 hov-standrd">Remove</button>
              </div>
            </div>
          </div>
        </section>
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Call To Action</p>
          <p className="text-sm text-gray-500">Encourage potential clients to take the next step. A clear message here can make the difference between a view and a conversion.</p>
          <div className="mt-6 mb-3 ml-2">
            <label className="block text-lg" htmlFor="title-input">Title:</label>
            <input className="lancr-add-edit-text-input" type="text" id="title-input" placeholder="Ready to go?" />
            <p className="max-characters">Max: 100 characters</p>
          </div>
          <div className="mt-6 mb-3 ml-2">
            <label className="block text-lg" htmlFor="title-input">Subheading:</label>
            <input className="lancr-add-edit-text-input" type="text" id="title-input" placeholder="Make your website a reality" />
            <p className="max-characters">Max: 100 characters</p>
          </div>
          <div className="mt-6 mb-3 ml-2">
            <label className="block text-lg" htmlFor="title-input">Button Text:</label>
            <input className="lancr-add-edit-text-input" type="text" id="title-input" placeholder="Contact Now" />
            <p className="max-characters">Max: 100 characters</p>
          </div>
        </section>
      </div>
    </main>
  )
}