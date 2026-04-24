import { getInformationStore, editInformationStore } from "./information.service.js"
import { requireText, requireEmail, parseOptionalPhone, parseOptionalImage, requireCurrencyCode } from "../../utils/validators/index.js"

export async function getInformation(req, res, next) {
    try {
        const storeId = req.store.storeId

        const information = await getInformationStore({ storeId })

        res.json(information)
    } catch (error) {
        next(error)
    }
}

export async function editInformation(req, res, next) {
    try {
        const storeId = req.store.storeId
        const name = requireText(req.body.name, "name")
        const email = requireEmail(req.body.email, "email")
        const phone = parseOptionalPhone(req.body.phone, "phone")
        const currency_code = requireCurrencyCode(req.body.currency_code || "PEN", "currency_code")
        const image = parseOptionalImage(req.body.image, "image")

        const information = await editInformationStore({ storeId, name, email, phone, currency_code, image })

        res.status(200).json({
            message: "Information edit successfully",
            information
        })
    } catch (error) {
        next(error)
    }
}
