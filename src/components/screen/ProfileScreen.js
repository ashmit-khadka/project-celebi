import React from 'react';
import { useContext, useState, useEffect } from 'react';
import AppContext from '../../utilities/context';
import dataNinja from '../../utilities/axios';
import Post from '../Post';
import { useLocation } from 'react-router-dom';

const ProfileScreen = () => {

  const { user } = useContext(AppContext);
  const location = useLocation();
  const [profile, setProfile] = useState(null);

  const getProfile = async (selectedUser) => {
    const response = await dataNinja.get('/user/profile', {
      params: {
        userId: selectedUser,
      },
    });
    setProfile(response.data);

  }

  useEffect(() => {
    const selectedUser = location?.state?.user;
    if (selectedUser) {
      getProfile(selectedUser);
    }
  }, [location?.state?.user]);

  return (
    <div>
      <div>
        <div>{profile?.user?.name}</div>
        <img
          style={{ width: '100px', height: '100px' }}
          src={profile?.user?.image} alt="profile" />
        <div>{profile?.user?.bio}</div>
      </div>

      <div
        style={{
          marginTop: '2rem',
        }}
      >
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          Awards
        </div>
      </div>

      <div
        style={{
          marginTop: '2rem',
        }}
      >
        <div
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          Posts
        </div>
        <div>
          {profile?.posts?.map((post) =>
            <Post 
              key={post._id} 
              post={post} 
              id = {post?._id}
              title = {post?.title}
              likes = {post?.likes}
              user = {profile?.user}
              image = {post?.image}
              comments = {post?.comments}
              onClick = {() => {}}
              challenge = {post?.challenge}
              preview={true}
              timestamp = {post?.timestamp}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;