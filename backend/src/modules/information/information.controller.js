import { getInformationStore, editInformationStore } from "./information.service.js"

const DEFAULT_STORE_IMAGE = "https://i.postimg.cc/DzKtGYCx/nouserphoto.png"

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
    const { name, email, phone, image} = req.body

    try {
        const storeId = req.store.storeId
        const cleanImage = image?.trim() || DEFAULT_STORE_IMAGE
        const cleanPhone = phone?.trim() || null
        const information = await editInformationStore({ storeId, name, email, cleanPhone, cleanImage })

        res.status(200).json({
            message: 'Information edit successfully',
            information
        })
    } catch (error) {
        next(error)
    }
}