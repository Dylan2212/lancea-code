import TitleInput from "../components/titleInput"
import EducationFieldWithX from "../components/educationFieldWX"
export default function LancrEducation () {
  return (
    <main className="w-full overflow-auto">
      <p className="text-2xl font-semibold m-5 flex items-center gap-4">Your Education</p>
      <div className="w-3/4 mx-auto">
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Education</p>
          <p className="text-sm text-gray-500">Highlight your academic background or any relevant training. This helps potential clients understand your qualifications and expertise.</p>
          <TitleInput previewText="Ex: Arizona State University"/>
          <TitleInput previewText="Ex: Bachelor's in Computer Science"/>
          <div className="mt-6 mb-4">
            <p className="lancr-add-edit-sect-ttle">Your Eduaction:</p>
            <div className="mt-2 w-2/3">
              <EducationFieldWithX/>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}