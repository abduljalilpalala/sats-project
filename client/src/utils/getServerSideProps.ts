export const AdminSignInOutAuthCheck = ({ req }: any) => {
  const token = req?.cookies['token']
  const path = req?.url

  const admin = path.includes('admin')
  const dashboard = path.includes('dashboard')
  const manageUser = path.includes('manage-user')
  const managePost = path.includes('manage-post')
  const employmentStatus = path.includes('employment-status')

  if ((dashboard || manageUser || managePost || employmentStatus) && !token) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
  }

  if (admin && !token) {
    return {
      props: {}
    }
  }

  if ((dashboard || manageUser || managePost || employmentStatus) && token) {
    return {
      props: {}
    }
  }

  if (admin && token) {
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false
      }
    }
  }

  if (!token) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export const UserSignInOutAuthCheck = async ({ req }: any) => {
  const token = req?.cookies['token']
  const path = req?.url

  const login = path.includes('login')
  const register = path.includes('register')

  if ((login || register) && !token) {
    return {
      props: {}
    }
  }

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  if ((login || register) && token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
