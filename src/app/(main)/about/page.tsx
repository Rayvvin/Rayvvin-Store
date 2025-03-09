import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "All you need to know about us",
}

export default function About() {
  return (
    <div className="bg-gray-50 py-8 md:py-12">
      <div className="content-container">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          Welcome to <em>Rayvvin</em>, your premier e-commerce platform
          dedicated to connecting African vendors with African customers. Based
          in the United Kingdom, Rayvvin is more than just a marketplace—it's a
          movement to empower small and medium-sized African businesses by
          providing them with a global platform to showcase their products and
          services.
        </p>
        <p className="mb-4">
          From authentic African groceries to unique handmade crafts, fashion,
          beauty products, and more, Rayvvin brings the richness of African
          culture and entrepreneurship to your fingertips. Our mission is to
          scale African businesses, foster economic growth, and create a
          seamless shopping experience for customers who value quality,
          authenticity, and community.
        </p>
        <p className="mb-4">
          At Rayvvin, we believe in the power of connection. By bridging the gap
          between vendors and customers, we aim to celebrate African heritage,
          support local economies, and make African products accessible to
          everyone, everywhere.
        </p>
        <p className="mb-4">
          Join us in our journey to uplift African businesses and discover the
          vibrant world of African commerce.
        </p>
      </div>
      <div className="content-container">
        <h1 className="text-2xl font-bold mb-4">About Your Account</h1>
        <p className="mb-4">
          Creating an account on Rayvvin is your gateway to a seamless shopping
          experience. Here’s what you need to know:
        </p>
        <p className="mb-4">
          <strong>1. Account Creation:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Sign up using your email address or social media accounts.</li>
          <li>
            Provide necessary details such as your name, phone number, and
            shipping address.
          </li>
        </ul>
        <p className="mb-4">
          <strong>2. Benefits of an Account:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Track your orders and view purchase history.</li>
          <li>Save your favorite products and vendors for easy access.</li>
          <li>Receive personalized recommendations and exclusive offers.</li>
        </ul>
        <p className="mb-4">
          <strong>3. Account Security:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Choose a strong password and keep it confidential.</li>
          <li>Enable two-factor authentication for added security.</li>
        </ul>
        <p className="mb-4">
          <strong>4. Managing Your Account:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            Update your personal information, payment methods, and shipping
            addresses at any time.
          </li>
          <li>Opt in or out of marketing communications.</li>
        </ul>
        <p className="mb-4">
          <strong>5. Deleting Your Account:</strong>
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>
            You can delete your account at any time by contacting our support
            team.
          </li>
        </ul>
        <p className="mb-4">
          For assistance with your account, please email us at{" "}
          <em>admin@rayvvin.com</em>.
        </p>
      </div>
    </div>
  )
}
