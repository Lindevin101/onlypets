import Post from "../components/Post.jsx";
import NavRest from "../components/Nav-rest.jsx";
import FloatingBottomNav from "../components/footer/FloatingBottomNav.jsx";

function Feed({ posts, user, primaryPet }) {
  const sortedPosts = posts.slice().sort((a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  });

  return (
    <div>
      <NavRest />
      <div className="pb-20">
        {sortedPosts.map((post) => (
          <Post key={post.id} post={post} primaryPet={primaryPet} />
        ))}
      </div>
      <FloatingBottomNav userId={user?.user.id} />
    </div>
  );
}

export default Feed;
