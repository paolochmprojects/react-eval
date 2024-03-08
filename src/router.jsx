import { createBrowserRouter } from "react-router-dom"
import App from "./components/App/App"
import Home from "./components/Home"
import ColorGame from "./components/ColorGame"
import Doable from "./components/Doable"
import SignUp, { action as signUpAction } from "./pages/SignUp"
import Login, { action as loginAction, loader as loginLoader } from "./pages/Login"
import Authenticated, { loader as authenticatedLoader, action as authenticatedAction } from "./components/Authenticated"
import Unauthenticated, { loader as unauthenticatedLoader } from "./components/Unauthenticated"
import { action as deleteTaskAction } from "./pages/DeleteTask"
import EditTask, { action as editTaskAction, loader as editTaskLoader } from "./pages/EditTask"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "color-game",
                element: <ColorGame />
            },
            {
                path: "doable",
                element: <Doable />,
                children: [
                    {
                        index: true,
                        loader: authenticatedLoader,
                        element: <Authenticated />,
                        action: authenticatedAction
                    },
                    {
                        // TODO: evaluate to delete.
                        path: "edittask/:idTask",
                        action: editTaskAction,
                        loader: editTaskLoader,
                        element: < EditTask />
                    },
                    {
                        path: "deletetask/:idTask",
                        action: deleteTaskAction,
                    },
                    {
                        path: "auth",
                        loader: unauthenticatedLoader,
                        element: <Unauthenticated />,
                        children: [
                            {
                                path: "signup",
                                action: signUpAction,
                                element: <SignUp />
                            },
                            {
                                path: "login",
                                action: loginAction,
                                loader: loginLoader,
                                element: <Login />
                            }
                        ]
                    },
                ]
            }
        ]
    }
])

export default router