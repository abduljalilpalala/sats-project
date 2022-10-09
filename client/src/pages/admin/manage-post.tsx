import React from 'react'
import { NextPage } from 'next'

import UnderConstruction from '~/utils/UnderConstruction'
import AdminLayout from '~/components/templates/AdminLayout'

const ManagePost: NextPage = (): JSX.Element => {
  return (
    <AdminLayout metaTitle="Administrator | Manage Post">
      <UnderConstruction />
    </AdminLayout>
  )
}

export default ManagePost
