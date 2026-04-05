import EntityEditForm from "../../../shared/ui/forms/EntityEditForm";

import { userEditFields } from "../config/userFormFields";



function UserEditPage() {
    
    return (
        <EntityEditForm fields={userEditFields} sectionLabel="Users" title="Edit User"/>
    )
}

export default UserEditPage