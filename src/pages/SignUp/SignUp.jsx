import { authService } from "../../services/authService"
import s from "./SignUp.module.css"
import { Form, useActionData } from "react-router-dom"
import Button from "../../components/Button"


export async function action({ request }) {
    const formData = await request.formData()
    const { email, password } = Object.fromEntries(formData)

    try {
        await authService.signUp(email, password)
    } catch (err) {
        return err
    }
    return null
}

function SignUp() {

    // change the logic
    const isLoading = false
    const buttonText = "Signin"

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

export default SignUp