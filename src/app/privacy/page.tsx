import PlainHeader from "../components/plainHeader";

// /app/privacy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <>
    <PlainHeader/>
    <main className="max-w-3xl mx-auto p-6 text-sm leading-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">Effective Date: August 1, 2025</p>

      <h2 className="text-lg font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        When you sign up for Lancrly, we collect your name, email address, profile image, and any links or bio information you choose to share.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your information to create your profile, provide customer support, and improve our services. We do not sell your information to third parties.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">3. Third-Party Services</h2>
      <p className="mb-4">
        We use third-party services to support features on Lancrly, such as authentication and link previews. These services may have access to limited user data.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">4. Cookies & Analytics</h2>
      <p className="mb-4">
        At this time, Lancrly does not use analytics or tracking cookies. If that changes, this section will be updated.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">5. Data Retention</h2>
      <p className="mb-4">
        We retain user information for as long as your account is active. You can request deletion by contacting us.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">6. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, update, or delete your personal information. Email us at <a href="mailto:dylan.anderson@lancrly.com" className="text-blue-600 underline">support@lancrly.com</a> to make a request.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">7. Changes</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We&apos;ll update the date above when we do.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">8. Contact</h2>
      <p>
        If you have any questions about this policy, please contact us at: <a href="mailto:dylan.anderson@lancrly.com" className="text-blue-600 underline">support@lancrly.com</a>.
      </p>
    </main>
    </>
  )
}