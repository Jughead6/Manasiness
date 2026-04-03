import '../pages.css'
import { useState, useEffect } from 'react'

import PageTitle from '../../components/public/pages/pagetitle.jsx'
import LayoutCard from '../../components/public/layout/card/layoutcard.jsx'
import { getUsers } from '../../components/content/actions/userscontent.jsx'

function Users() {
    const [users, setUsers ] = useState([])

    useEffect(() => {
        getUsers().then(setUsers)
    }, [])

    return (
        <div className="page">
            <PageTitle  title="Welcome to Users" subtitle="In this section you can create, edit and view the Users you have"/>
            <LayoutCard data={users} action="Users" route="users"/>
        </div>
    )
}

export default Users