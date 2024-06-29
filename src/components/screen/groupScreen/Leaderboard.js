import React, { useState, useEffect } from "react";

const Leaderboard = (props) => {
    const { posts } = props

    const [ leaderboard, setLeaderboard ] = useState([{}])

    const getLeaderboard = () => {
        const userPosts = posts.reduce((acc, post) => {
            const foundUser = acc.find(userPost => userPost.user._id === post.user._id);
            if (foundUser) {
              foundUser.posts.push(post);
              foundUser.likes += post.likes;
            } else {
              acc.push({ user: post.user, posts: [post], likes: 0 });
            }
            return acc;
          }, []);

        const sortedUserPosts = userPosts.sort((a, b) => b.likes - a.likes);
        setLeaderboard(sortedUserPosts);
    }

    useEffect(() => {
        getLeaderboard()
    }, [])

    return (
        <div
        className="animation-fade-right"

        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}
            >
                {leaderboard.map((userPost, i) => (
                    <div
                        style={{
                            display: 'flex',
                            padding: '1rem',
                            alignItems: 'center',
                            gap: '1rem',
                            backgroundColor: 'black',
                            color: 'white',
                            boxShadow: '-10px 12px 0px 0px #DC7A7A', // Add this line
                        }}
                    >   
                        <div>
                            #{i + 1}
                        </div>
                        <img
                            style={{
                                width: '3rem',
                                height: '3rem',
                                borderRadius: '50%'
                            }}
                            src={userPost.user?.image}
                            alt={userPost.user?.name}
                        />
                        <div>
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >{userPost.user?.name}</div>
                            <div>
                                Points: {userPost.likes}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Leaderboard