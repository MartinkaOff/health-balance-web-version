import { showToast } from "./common-functions"



export const errorHandler = async (error:any) => {
    if (error.data.errors) {
        await showToast(error.data.errors)
        return
    }
    await showToast(error.data)
}