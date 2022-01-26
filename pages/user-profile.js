import React, { Fragment } from 'react';

const UserProfilePage = (props) => {
  const { userName } = props;

  return (
    <div className="container">
      <h1>{userName}</h1>
    </div>
  )
}

export default UserProfilePage;

export const getServerSideProps = async (context) => {
  const { params, req, res } = context;

  return {
    props: {
      userName: "Stu Last"
    }
  }
}