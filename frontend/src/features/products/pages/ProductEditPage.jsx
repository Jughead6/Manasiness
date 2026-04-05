import EntityEditForm from "../../../shared/ui/forms/EntityEditForm";

import { productEditFields } from "../config/productFormFields";



function ProductEditPage() {
    
    return (
        <EntityEditForm fields={productEditFields} sectionLabel="Products" title="Edit Product"/>
    )
}

export default ProductEditPage