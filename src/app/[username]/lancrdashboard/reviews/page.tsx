import LancrReview from "../components/lancrReview";

export default function LancrReviews () {
  return (
    <main className="w-full overflow-auto">
      <p className="text-2xl font-semibold m-5 flex items-center gap-4">Your Reviews</p>
      <div className="w-3/4 mx-auto">
        <section className="lancr-add-edit-sect box-support">
          <div className="flex justify-between">
            <p className="lancr-add-edit-sect-ttle">Feature Reviews</p>
            <p className="lancr-add-edit-sect-ttle mr-12">(0) Reviews Selected</p>
          </div>
          <p className="text-sm text-gray-500">Select up to 5 reviews to feature on your profile.</p>
          <div className="grid grid-cols-3 w-full gap-y-8 ml-3 mt-8 mb-5">
            <LancrReview nameTitle="John Hancock - Smash Bros CEO"/>
            <LancrReview nameTitle="John Hancock - Smash Bros CEO"/>
            <LancrReview nameTitle="John Hancock - Smash Bros CEO"/>
            <LancrReview nameTitle="John Hancock - Smash Bros CEO"/>
          </div>
        </section>
      </div>
    </main>
  )
}