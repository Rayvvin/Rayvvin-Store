import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-start justify-between p-4 rounded-lg">
      <div className="p-4">
        <h2 className="text-lg-semi md:text-xl-semi">Already have an account?</h2>
        <p className="text-base-regular text-gray-700 mt-2">
          Sign in for a better experience.
        </p>
      </div>
      <div>
        <Link href="/account/login">
          <Button variant="secondary" className="rounded-lg px-4 whitespace-nowrap">Sign in</Button>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
