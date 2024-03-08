import { Form, useLoaderData, redirect } from "react-router-dom"
import s from "./EditTask.module.css"
import Button from "../../components/Button"
import { getTask, editTask } from "../../services/tasks"
import { authService } from "../../services/authService"
import { useState } from "react"

export async function action({ request, params }) {
    const { idTask } = params
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
        await editTask(idTask, data)
        return redirect("/doable")
    } catch (err) {
        return err
    }
}

export async function loader({ params }) {
    if (!authService.isAuthenticated) return redirect("/doable/auth/login")
    const { idTask } = params
    try {
        const task = await getTask(idTask)
        return { task }
    } catch (err) {
        authService.logOut()
        return redirect("/doable/auth/login")
    }
}

export default function EditTask() {

    const { task } = useLoaderData()

    const [taskToEdit, setTaskToEdit] = useState(task)

    return (
        <>
            <Form className={s["task-form"]}
                method="post">
                <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="do the dishes"
                    defaultValue={taskToEdit.title}
                    required
                    aria-label="title"
                />
                <input
                    id="due_date"
                    type="date"
                    name="due_date"
                    defaultValue={taskToEdit.due_date}
                    aria-label="due_date"
                />
                <Button>
                    {"Guardar cambios"}
                </Button>
            </Form>
        </>
    )
}