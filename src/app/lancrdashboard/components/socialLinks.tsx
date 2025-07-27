"use client"
import TitleInput from "./titleInput";
import { useUserStore } from "@/lib/store/useUserStore";

export default function LancrSocialLinks () {
  const user = useUserStore(state => state)

  const { facebook, x, instagram, medium, threads, tiktok } = user.socialLinks
  const { setSocialLinks, socialLinks } = user

  return (
        <div className="div-for-lancr-dashboard-sects">
          <section className="lancr-add-edit-sect box-support">
            <p className="lancr-add-edit-sect-ttle">Add Social Links</p>
            <p className="text-sm text-gray-500">Add links to your social profiles so potential clients can explore more of your work and connect with you on other platforms.</p>
            <TitleInput required={false} labelTitle="Facebook" type="text" previewText="Facebook.com" value={facebook} handleChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})} maxChar={2048} inputName="facebook" displayMaxChar={false}/>
            <TitleInput required={false} labelTitle="X" type="text" previewText="X.com" value={x} handleChange={(e) => setSocialLinks({...socialLinks, x: e.target.value})} maxChar={2048} inputName="x" displayMaxChar={false}/>
            <TitleInput required={false} labelTitle="Instagram" type="text" previewText="Instagram.com" value={instagram} handleChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})} maxChar={2048} inputName="instagram" displayMaxChar={false}/>
            <TitleInput required={false} labelTitle="Medium" type="text" previewText="Medium.com" value={medium} handleChange={(e) => setSocialLinks({...socialLinks, medium: e.target.value})} maxChar={2048} inputName="medium" displayMaxChar={false}/>
            <TitleInput required={false} labelTitle="Threads" type="text" previewText="Threads.com" value={threads} handleChange={(e) => setSocialLinks({...socialLinks, threads: e.target.value})} maxChar={2048} inputName="threads" displayMaxChar={false}/>
            <TitleInput required={false} labelTitle="TikTok" type="text" previewText="Tiktok.com" value={tiktok} handleChange={(e) => setSocialLinks({...socialLinks, tiktok: e.target.value})} maxChar={2048} inputName="tiktok" displayMaxChar={false}/>
          </section>
        </div>
  )
}