import PlainHeader from "../components/plainHeader";

export default function TermsOfServicePage() {
  return (
    <>
    <PlainHeader/>
    <main className="max-w-3xl mx-auto p-6 text-sm leading-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">Effective Date: August 1, 2025</p>

      <h2 className="text-lg font-semibold mt-6 mb-2">1. Introduction</h2>
      <p className="mb-4">
        Welcome to Lancrly, a link-in-bio tool built for freelancers. These Terms of Service (&quot;Terms&quot;) govern your use of our website and services (&quot;Service&quot;). By using Lancrly, you agree to these Terms.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">2. Use of Service</h2>
      <p className="mb-4">
        You must be at least 13 years old to use Lancrly. You are responsible for the accuracy and legality of the content you include on your profile (such as your links, bio, and profile image).
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">3. Your Account</h2>
      <p className="mb-4">
        When you create an account, you agree to provide accurate information including your name and email. You’re responsible for keeping your account secure.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">4. Prohibited Uses</h2>
      <p className="mb-4">
        You agree not to use Lancrly to post or link to illegal, harmful, or offensive content. We reserve the right to remove content or suspend accounts that violate these rules.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">5. Third-Party Services</h2>
      <p className="mb-4">
        Lancrly may integrate with third-party services like Stripe or social platforms. Your use of those services is subject to their terms and policies.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">6. Termination</h2>
      <p className="mb-4">
        We may suspend or terminate your account if you violate these Terms. You can also delete your account at any time by contacting us.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">7. Changes</h2>
      <p className="mb-4">
        We may update these Terms. If we do, we’ll post the changes here and update the effective date.
      </p>

      <h2 className="text-lg font-semibold mt-6 mb-2">8. Contact</h2>
      <p>
        If you have any questions about these Terms, you can reach us at: <a href="mailto:dylan.anderson@lancrly.com" className="text-blue-600 underline">support@lancrly.com</a>.
      </p>
    </main>
    </>
  )
}