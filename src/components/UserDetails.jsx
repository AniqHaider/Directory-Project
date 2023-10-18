import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleUser, getPosts } from "../api/api";
import Time from "./Time";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postModal, setPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openPostModal = (post) => {
    setSelectedPost(post);
    setPostModal(true);
  };

  const closePostModal = () => {
    setSelectedPost(null);
    setPostModal(false);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userRes = await getSingleUser(userId);
        setUser(userRes);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const postsRes = await getPosts();
        const filteredPosts = postsRes.filter((post) => post.userId == userId);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
    fetchUserPosts();
  }, [userId]);

  return (
    <>
      <div className="relative p-12 bg-gray-100">
        <div className="mb-10 sm:mb-2">
          <Time />
        </div>
        <div>
          {user ? (
            <div>
              <h1 className="text-5xl font-bold underline underline-offset-8 mb-8 text-center">
                Profile Page
              </h1>
              <section className="p-4 border-2 border-black rounded-lg bg-blue-200 cursor-pointer my-6">
                <div className="flex justify-between flex-col sm:flex-row font-semibold gap-2">
                  <span>Name: {user.name}</span>
                  <span>
                    Address: {user.address.street}, {user.address.suite},{" "}
                    {user.address.city}
                  </span>
                </div>
                <div className="flex justify-between flex-col mt-2 sm:flex-row font-semibold gap-2">
                  <span>
                    Username: {user.username} | Catch Phrase:{" "}
                    {user.company.catchPhrase}
                  </span>
                  <span>
                    Email: {user.email} | Phone: {user.phone}
                  </span>
                </div>
              </section>

              <h1 className="text-3xl font-bold underline underline-offset-4 mb-4 text-center">
                Posts
              </h1>
              <section className="flex flex-wrap justify-center gap-[2%] gap-y-5">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-black rounded-lg outline-4 p-4 cursor-pointer bg-blue-300 w-[100%] md:w-[32%]"
                    onClick={() =>
                      openPostModal({ title: post.title, body: post.body })
                    }
                  >
                    <p className="mb-2 font-[600] uppercase text-center">
                      {post.title.substring(0, 15)}...
                    </p>
                    <p className="first-letter:capitalize text-center">
                      {post.body.substring(0, 30)}...
                    </p>
                  </div>
                ))}
              </section>
              {postModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                  <div
                    className="fixed top-0 left-0 w-full h-full bg-black opacity-60"
                    onClick={closePostModal}
                  ></div>
                  <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 p-10">
                    <div className="bg-blue-300 border-2 border-black rounded-lg w-[300px] md:w-[500px] p-5 cursor-pointer">
                      <h2 className="mb-4 text-xl font-[600] uppercase text-center">
                        {selectedPost.title}
                      </h2>
                      <p className="first-letter:capitalize">
                        {selectedPost.body}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
