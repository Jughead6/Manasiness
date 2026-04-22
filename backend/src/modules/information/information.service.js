import { findInformationStore, updateInformationStore } from "./information.repository.js"

export async function getInformationStore(data) {
    return findInformationStore(data)
}

export async function editInformationStore(data) {
    return updateInformationStore(data)
}