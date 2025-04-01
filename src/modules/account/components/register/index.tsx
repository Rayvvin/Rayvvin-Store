import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Checkbox from "@modules/common/components/checkbox"
import Input from "@modules/common/components/input"
import Spinner from "@modules/common/icons/spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

interface RegisterCredentials extends FieldValues {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
  agree?: boolean
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const [agree, setAgree] = useState<boolean>(false)
  const router = useRouter()

  const handleError = (e: Error) => {
    setAuthError("An error occured. Please try again.")
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterCredentials>()

  async function generateTerm(email, userType) {
    try {
      const response = await fetch("https://qqhnbezrwcbdyidfudcs.supabase.co/functions/v1/generate-terms-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`, // Ensure this is securely stored
        },
        body: JSON.stringify({ email, userType }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate terms");
      }
  
      return data;
    } catch (error) {
      console.error("Error generating terms:", error.message);
      return { error: error.message };
    }
  }
  
  
  

  const onSubmit = handleSubmit(async (credentials) => {
    await medusaClient.customers
      .create(credentials)
      .then(() => {
  
  generateTerm(credentials.email, "customer")
    .then((result) => console.log("Response:", result))
    .catch((error) => console.error("Request failed:", error));      
        refetchCustomer()

        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="max-w-md flex flex-col items-center mt-12 shadow-md p-8 rounded-md bg-white">
      {isSubmitting && (
        <div className="z-10 fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <Spinner size={24} />
        </div>
      )}
      <h1 className="text-xl-semi md:text-xl-semi text-center mb-2">
        Create an Account
      </h1>
      <p className="text-center text-base-regular text-[#747474] mb-4">
        Create your Rayvvin Customer profile, and get access to an enhanced
        shopping experience.
      </p>
      <form className="w-full flex flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="First name"
            {...register("first_name", { required: "First name is required" })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            label="Last name"
            {...register("last_name", { required: "Last name is required" })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            label="Email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Phone"
            {...register("phone")}
            autoComplete="tel"
            errors={errors}
          />
          <Input
            label="Password"
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-rose-500 w-full text-small-regular">
              {authError}
            </span>
          </div>
        )}

        <span className="text-center text-gray-700 text-small-regular mt-6">
          By creating an account, you agree to Rayvvin&apos;s{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms-and-conditions" className="underline">
            Terms of Use
          </Link>
          .
        </span>
        <span className="mt-6">
          <Checkbox
            checked={agree}
            onChange={() => {
              setAgree(!agree)
            }}
            label="Yes, I agree to the terms and conditions"
          />
        </span>
        <Button className="mt-6 rounded-md !bg-[#3D8B7A] !border-[#3D8B7A]">
          Join
        </Button>
      </form>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        Already a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Sign in
        </button>
        .
      </span>
      <span className="text-center text-gray-700 text-small-regular mt-6">
        Are you a seller?{" "}
        <Link
          href="https://vendor-portal-7fk0.onrender.com/login"
          className="text-sm-semi underline"
        >
          Sign In Here
        </Link>
        .
      </span>
    </div>
  )
}

export default Register
