import { useParams, useNavigate  } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import EntityTitle from "../../../shared/ui/titles/entity/EntityTitle.jsx"
import EntityLayout from "../../../shared/ui/layouts/entity/EntityLayout.jsx"
import { activateUser, deactivateUser, getUserById } from "../api/users.api.js"
import { mapUserToDetail } from "../mappers/users.mapper.js"
import UserDeactivationModal from "../components/UserDeactivationModal.jsx"

function UserDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [detail, setDetail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [isDeactivationOpen, setIsDeactivationOpen] = useState(false)

    useEffect(() => {
        async function fetchUserDetail() {
            try {
                setIsLoading(true)
                setHasError(false)
                const data = await getUserById(id)
                setDetail(mapUserToDetail(data))
            } catch {
                setDetail(null)
                setHasError(true)
            } finally {
                setIsLoading(false)
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
            toast.success("User successfully deactivated")
        } catch {
            toast.error("The user could not be deactivated")
        }
    }

    async function handleActivate() {
        try {
            await activateUser(id)
            const data = await getUserById(id)
            setDetail(mapUserToDetail(data))
            toast.success("User successfully activated")
        } catch {
            toast.error("The user could not be activated")
        }
    }

    if (isLoading) {
        return <div>Loading user...</div>
    }

    if (hasError || !detail) {
        return (
            <div>
                <h2>Could not load user</h2>
                <button onClick={() => navigate("/dashboard/users")}>Back</button>
            </div>
        )
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