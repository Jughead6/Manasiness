import EntityEditForm from "../../../shared/ui/forms/EntityEditForm";

import { categoryEditFields } from "../config/categoryFormFields.jsx";



function CategoryEditPage() {
    
    return (
        <EntityEditForm fields={categoryEditFields} sectionLabel="Categories" title="Edit Category"/>
    )
}

export default CategoryEditPage