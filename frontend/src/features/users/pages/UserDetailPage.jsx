import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import EntityTitle from "../../../shared/ui/titles/entity/EntityTitle.jsx"
import EntityLayout from "../../../shared/ui/layouts/entity/EntityLayout.jsx"
import { activateUser, deactivateUser, getUserById } from "../api/users.api.js"
import { mapUserToDetail } from "../mappers/users.mapper.js"
import UserDeactivationModal from "../components/UserDeactivationModal.jsx"

function UserDetailPage() {
    const { id } = useParams()
    const [detail, setDetail] = useState(null)
    const [isDeactivationOpen, setIsDeactivationOpen] = useState(false)

    useEffect(() => {
        async function fetchUserDetail() {
            try {
                const data = await getUserById(id)
                setDetail(mapUserToDetail(data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUserDetail()
    }, [id])

    async function handleDeactivate() {
        try {
            await deactivateUser(id)
            const data = await getUserById(id)
            setDetail(mapUserToDetail(data))
            setIsDeactivationOpen(false)
            toast.success("User successfully activated")
        } catch (error) {
            console.log(error)
            toast.error("The user could not be activated")
        }
    }

    async function handleActivate() {
        try {
            await activateUser(id)
            const data = await getUserById(id)
            setDetail(mapUserToDetail(data))
            toast.success("User successfully deactivated")
        } catch (error) {
            console.log(error)
            toast.error("The user could not be deactivated")
        }
    }

    if (!detail) {
        return null
    }

    return (
        <>
            <EntityTitle 
                entity="User" 
                idx={id}
            />
            <EntityLayout 
                detail={detail} 
                onDeactivateClick={() => setIsDeactivationOpen(true)}
                onActivateClick={handleActivate}
            />
            {isDeactivationOpen && ( <UserDeactivationModal
                onClose={() => setIsDeactivationOpen(false)}
                onConfirm={handleDeactivate}
            />
            )}
        </>
    )
}

export default UserDetailPage