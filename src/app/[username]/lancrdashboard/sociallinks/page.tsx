import TitleInput from "../components/titleInput";

export default function LancrSocialLinks () {
  return (
    <main className="overflow-auto w-full">
      <p className="text-2xl font-semibold m-5 flex items-center gap-4">Social links</p>
      <div className="w-3/4 mx-auto">
        <section className="lancr-add-edit-sect box-support">
          <p className="lancr-add-edit-sect-ttle">Add Social Links</p>
          <p className="text-sm text-gray-500">Add links to your social profiles so potential clients can explore more of your work and connect with you on other platforms.</p>
          <TitleInput previewText="Facebook.com"/>
          <TitleInput previewText="X.com"/>
          <TitleInput previewText="Instagram.com"/>
          <TitleInput previewText="Medium.com"/>
          <TitleInput previewText="Threads.com"/>
          <TitleInput previewText="something.com"/>
          <TitleInput previewText="somethingelse.com"/>
        </section>
      </div>
    </main>
  )
}