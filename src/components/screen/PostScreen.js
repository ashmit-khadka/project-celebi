import React, { useEffect, useState } from 'react';
import dataNinja from '../../utilities/axios';
import { useLocation } from 'react-router-dom';
import Post from '../Post';

const PostScreen = () => {

  const location = useLocation();

  const [ post, setPost ] = useState(null);

  const getPost = async () => {
    const response = await dataNinja.get('/post/get', {
      params: {
        id: location.state?.postId,
      }
    })
    console.log(response);

    setPost(response.data);

  }

  useEffect(() => {
    getPost();
  }, []);

  console.log(post);

  return (
    <div>
      {post === null && <div>Loading...</div>}
      {post && (
        <Post
          id={post?._id}
          title={post?.title}
          likes={post?.likes}
          user={post?.user}
          image={post?.image}
          comments={post?.comments}
          challenge={post?.challenge}
          preview
        />
      )}
    </div>
  );
}

export default PostScreen;