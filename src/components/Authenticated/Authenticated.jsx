import { useState } from "react";
import { redirect, useNavigate, useLoaderData, Form, useFetcher } from "react-router-dom"
import { BadgeAlert, LogOutIcon, Trash2, Edit2Icon } from "lucide-react";
import { filterTasks, sortTasks } from "./utils";
import s from "./Authenticated.module.css";
import { authService } from "../../services/authService";
import Button from "../Button";
import { getTasks, createTask} from "../../services/tasks"


export async function loader() {
  if (!authService.isAuthenticated) return redirect("/doable/auth/login")
  try {
    const tasks = await getTasks()
    return { tasks }
  } catch (err) {
    authService.logOut()
    return redirect("/doable/auth/login")
  }
}

export async function action({ request }) {
  const formData = await request.formData()
  const taskData = Object.fromEntries(formData)

  try {
    await createTask(taskData)
    return null
  } catch (err) {
    return err
  }

}

function Authenticated() {

  const navigate = useNavigate()
  const { tasks } = useLoaderData()

  // get the task to edit.

  const [sortBy, setSortBy] = useState("due_date-asc")
  const [filterBy, setFilterBy] = useState({ onlyPending: false, onlyImportant: false })

  const [status, setStatus] = useState("idle");
  const [formStatus, setFormStatus] = useState("idle");

  const LogOut = () => {
    authService.logOut()
    navigate("/doable/auth/login")
  }

  const fetcher = useFetcher()

  const isLoading = status === "loading";
  const isCreating = formStatus === "loading";

  const filteredTasks = filterTasks(tasks, filterBy);
  const sortedTasks = sortTasks(filteredTasks, sortBy);

  function handleFilter(event) {
    if (event.target.id === "pending") {
      setFilterBy({ ...filterBy, onlyPending: !filterBy.onlyPending })
    }

    if (event.target.id === "important") {
      setFilterBy({ ...filterBy, onlyImportant: !filterBy.onlyImportant })
    }
  }

  return (
    <>
      <Form className={s["task-form"]}
        method="post">
        <input
          id="title"
          type="text"
          name="title"
          placeholder="do the dishes"
          required
          aria-label="title"
          disabled={isCreating}
        />
        <input
          id="due_date"
          type="date"
          name="due_date"
          aria-label="due_date"
          disabled={isCreating}
        />
        <Button disabled={isCreating}>
          {isCreating ? "Adding..." : "Add task"}
        </Button>
      </Form>

      <div className={s["tasks-wrapper"]}>
        <aside className={s.aside}>
          <div className={s["input-group"]}>
            <label htmlFor="sort_by">Sort by</label>
            <select id="sort_by" onChange={(e) => setSortBy(e.target.value)} >
              <option value="due_date-asc">Due Date (old first)</option>
              <option value="due_date-desc">Due Date (new first)</option>
              <option value="alphabetical-asc">Alphabetical (a-z)</option>
              <option value="alphabetical-desc">Alphabetical (z-a)</option>
            </select>
          </div>
          <div className={s["input-group"]}>
            <label>Filter</label>
            <div className={s.checkbox}>
              <input type="checkbox" id="pending" onChange={handleFilter} />
              <label htmlFor="pending">Only pending</label>
            </div>
            <div className={s.checkbox}>
              <input type="checkbox" id="important" onChange={handleFilter} />
              <label htmlFor="important">Only important</label>
            </div>
          </div>
          <Button onClick={() => LogOut()}>
            <LogOutIcon />
            Logout
          </Button>
        </aside>
        <div className={s["tasks-list"]}>
          {isLoading && <p>Loading...</p>}
          {tasks.length > 0 &&
            sortedTasks.map((task) => (
              <div key={task.id} className={s["task-wrapper"]}>
                <div className={s["task-data"]}>
                  <input
                    type="checkbox"
                    id={task.id}
                    defaultChecked={task.completed}
                    onChange={() => {
                      fetcher.submit({ completed: !task.completed }, {
                        method: "POST",
                        action: `edittask/${task.id}`
                      })
                    }}
                  />
                  <div className={s["title-wrapper"]}>
                    <label htmlFor={task.id} className={s["task-title"]}>
                      {task.title}
                    </label>
                    <small className={s["task-due_date"]}>
                      {task["due_date"]}
                    </small>
                  </div>
                </div>
                <div className={s.actions}>
                  <Button onClick={() => navigate("/doable/edittask/" + task.id)}>
                    <Edit2Icon />
                  </Button>
                  <fetcher.Form method="post" action={`edittask/${task.id}`}>
                    <Button
                      variant={task.important ? "primary" : "outline"}
                      name="important"
                      value={task.important ? false : true}>
                      <BadgeAlert />
                    </Button>
                  </fetcher.Form>
                  <fetcher.Form method="post" action={`deletetask/${task.id}`}>
                    <Button variant="outline">
                      <Trash2 />
                    </Button>
                  </fetcher.Form>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Authenticated;
