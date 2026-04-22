import { apiGet, apiPost } from "../../../shared/api/client";

export async function getInformation() {
    return apiGet("/information")
}

export async function editInformation(data) {
    return apiPost("/information/edit", data)
}