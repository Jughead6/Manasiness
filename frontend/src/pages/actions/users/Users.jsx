import './Users.css'

import SectionTitle from '../../../components/public/actions/sectiontitle/sectiontitle.jsx'
import SectionLayout from '../../../components/public/actions/sectionlayout/sectionlayout.jsx'
import SectionCategories from '../../../components/public/actions/sectionactions/sectionactions.jsx'



function Users() {
    const users = [
        ["Users: Carlos Ramirez", "https://randomuser.me/api/portraits/men/32.jpg", "Phone: 987654321", "Role: Admin"],
        ["Users: Lucia Torres", "https://randomuser.me/api/portraits/women/44.jpg", "Phone: 912345678", "Role: Seller"],
        ["Users: Jorge Mendoza", "https://randomuser.me/api/portraits/men/18.jpg", "Phone: 956781234", "Role: Cashier"],
        ["Users: Andrea Flores", "https://randomuser.me/api/portraits/women/21.jpg", "Phone: 934567812", "Role: Manager"],
        ["Users: Luis Herrera", "https://randomuser.me/api/portraits/men/51.jpg", "Phone: 978123456", "Role: Store Assistant"]
    ]

    return (
        <div id="users">
            <SectionTitle  title="Welcome to Users" subtitle="In this section you can create, edit and view the Users you have"/>
            <SectionLayout/>
            <SectionCategories action={users}/>
        </div>
    )
}

export default Users