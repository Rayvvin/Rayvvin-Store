import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Returns Policy",
  description: "Reutrns Policy",
}

export default function Returns() {
  return <div className="bg-gray-50 py-8 md:py-12">
  <div className="content-container">
    <h1 className="text-2xl font-bold mb-4">Return Policy</h1>
    <p className="mb-4">
      At Rayvvin, we strive to ensure your complete satisfaction with every purchase. However, if you are not entirely happy with your order, our Return Policy is here to help.
    </p>
    <p className="mb-4"><strong>1. Eligibility for Returns:</strong></p>
    <ul className="list-disc list-inside mb-4">
      <li>Items must be returned within <em>3 days</em> of delivery.</li>
      <li>Products must be unused, in their original packaging, and in resalable condition.</li>
    </ul>
    <p className="mb-4"><strong>2. Non-Returnable Items:</strong></p>
    <ul className="list-disc list-inside mb-4">
      <li>Perishable goods (e.g., groceries).</li>
      <li>Personalized or custom-made items.</li>
      <li>Items marked as &quot; final sale. &quot;</li>
    </ul>
    <p className="mb-4"><strong>3. Return Process:</strong></p>
    <ul className="list-disc list-inside mb-4">
      <li>Contact our customer support team at <em>admin@rayvvin.com</em> to initiate a return.</li>
      <li>Provide your order number and reason for return.</li>
      <li>Once approved, you will receive instructions on how to return the item.</li>
    </ul>
    <p className="mb-4"><strong>4. Refunds:</strong></p>
    <ul className="list-disc list-inside mb-4">
      <li>Refunds will be processed within <em>7-10 business days</em> after we receive and inspect the returned item.</li>
      <li>The refund will be issued to the original payment method.</li>
    </ul>
    <p className="mb-4"><strong>5. Damaged or Defective Items:</strong></p>
    <ul className="list-disc list-inside mb-4">
      <li>If you receive a damaged or defective item, please contact us immediately. We will arrange a replacement or refund at no extra cost.</li>
    </ul>
    <p className="mb-4">
      For any questions about our Return Policy, please reach out to us at <em>admin@rayvvin.com</em>.
    </p>
  </div>
</div>
}