import React from 'react'
import { NextPage } from 'next'

import UnderConstruction from '~/utils/UnderConstruction'
import AdminLayout from '~/components/templates/AdminLayout'

const ManageUser: NextPage = (): JSX.Element => {
  return (
    <AdminLayout metaTitle="Administrator | Manage User">
      <UnderConstruction />
    </AdminLayout>
  )
}

export default ManageUser
