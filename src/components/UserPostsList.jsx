import React, { useEffect, useState } from "react";
import { getUsers, getPosts } from "../api/api"; 
import { Link } from "react-router-dom";

function UserPostsList() {
  const [userData, setUserData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPostData = async () => {
      try {
        const postsData = await getPosts();

        const postCounts = {};

        postsData.forEach((post) => {
          const userId = post.userId;
          if (postCounts[userId]) {
            postCounts[userId] += 1;
          } else {
            postCounts[userId] = 1;
          }
        });

        const userDataArray = Object.entries(postCounts).map(
          ([userId, count]) => ({
            userId: parseInt(userId),
            postCount: count,
          })
        );

        setUserData(userDataArray);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchUserData();
    fetchPostData();
  }, []);

  const combinedData = users.map((user) => {
    const postCount =
      userData.find((data) => data.userId === user.id)?.postCount || 0;
    return {
      userId: user.id,
      userName: user.name,
      postCount: postCount,
    };
  });

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-5xl font-bold underline underline-offset-8 mb-10 text-center">DIRECTORY</h1>
      <ul>
        {combinedData.map((user) => (
          <li key={user.userId}>
            <Link to={`/user/${user.userId}`}>
              <div className="flex justify-between p-4 my-4 mx-8 border-2 border-black rounded-lg bg-blue-200">
                <span>Name: {user.userName}</span>
                <span>Posts: {user.postCount}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserPostsList;
