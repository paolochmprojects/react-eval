import { deleteTask } from "../../services/tasks"

export async function action({ params }) {

    const { idTask } = params
    
    try {
        await deleteTask(idTask)
        return null
    } catch (err){
        return err
    }

}