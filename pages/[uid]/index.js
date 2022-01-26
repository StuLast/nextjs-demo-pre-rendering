import React, { Fragment } from 'react';


const UserIdPage = (props) => {

  const { id } = props

  return (
    <Fragment>
      <h1>{id}</h1>
    </Fragment>
  )
}

export const getServerSideProps = (context) => {
  const { params } = context;
  const userId = params.uid;
  return {
    props: {
      id: "userId-" + userId
    }
  }
}

export default UserIdPage;