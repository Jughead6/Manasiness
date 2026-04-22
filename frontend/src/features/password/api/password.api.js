import { apiPost } from "../../../shared/api/client"

export async function editPassword(data) {
    return apiPost("/password/edit", data)
}