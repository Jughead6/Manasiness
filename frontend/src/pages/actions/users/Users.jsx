import './Users.css'
import { useState, useEffect } from 'react'

import ActionTitle from '../../../components/public/actions/title/actiontitle.jsx'
import ActionLayout from '../../../components/public/actions/layout/actionlayout.jsx'
import ActionContent from '../../../components/public/actions/content/actioncontent.jsx'
import { getUsers } from '../../../components/actions/users/userscontent.jsx'


function Users() {
    const [users, setUsers ] = useState([])

    useEffect(() => {
        getUsers().then(setUsers)
    }, [])

    return (
        <div id="users">
            <ActionTitle  title="Welcome to Users" subtitle="In this section you can create, edit and view the Users you have"/>
            <ActionLayout/>
            <ActionContent action={users}/>
        </div>
    )
}

export default Users