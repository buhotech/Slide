import React from 'react';

// RENDER THE USER PROFILE
const ProfileView = props => {
  const userInfo = props.userInfo;
  return (
    <div>
      <div className="img-container" style={{ padding: '30px' }}>
        <img height="300" width="300" src={userInfo.profile_pic} />
      </div>
      <div className="bio-container" style={{ display: 'grid', padding: '30px' }}>
        <h2>{userInfo.username}</h2>
        <h3>{userInfo.bio}</h3>
      </div>
    </div>
  );
};

export default ProfileView;
