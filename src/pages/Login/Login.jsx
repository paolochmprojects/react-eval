import { authService } from "../../services/authService"
import s from "./Login.module.css"
import { Form, useActionData, redirect } from "react-router-dom"
import Button from "../../components/Button"

export function loader (){
  if (authService.isAuthenticated) return redirect("/doable")
  return null
}

export async function action({ request }) {
  const formData = await request.formData()
  const { email, password } = Object.fromEntries(formData)
  try {
    await authService.login(email, password)
  } catch (err) {
    return err
  }
  return null
}

function Login() {

  const isLoading = false
  const buttonText = "Login"

  const signUpErrors = useActionData()

  return (
    <>
      <Form
        method="post"
        className={s.form}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="user@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={6}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : buttonText}
        </Button>
      </Form>
      {signUpErrors && (
        <p className={s["error-message"]}>
          {signUpErrors.message || "Invalid Credentials"}
        </p>
      )}
    </>
  )
}

export default Login