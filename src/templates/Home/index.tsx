import { useEffect, useState } from "react";
// types
import { PostType } from "../../@types/Post";
// components
import Header from "../../components/Header";
import PostGrid from "../../components/PostGrid";
import ObserverPostGrid from "../../components/ObserverPostGrid";
// services
import { loadPosts } from "../../utils/load-posts";
// styles
import "./styles.scss";

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  //
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  //
  const [searchTerm, setSearchTerm] = useState<string>("");
  //
  const postsPerPage = 10;
  //
  let timeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const fetchPosts = async () => {
      const responsePosts = await loadPosts();

      setAllPosts([...responsePosts]);
      setPosts([...responsePosts].slice(0, postsPerPage));
      setMaxPage([...responsePosts].length / postsPerPage);
    };

    fetchPosts();
  }, []);

  const loadMorePosts = (term: string) => {
    const nextPage = page + 1;

    if (maxPage >= nextPage) {
      let newPosts: PostType[] = [];

      newPosts = [...allPosts].slice(
        postsPerPage * page,
        postsPerPage * nextPage
      );

      setPosts((currentPosts) => [...currentPosts, ...newPosts]);
      setPage(nextPage);
    }
  };

  const handleIntersect = () => {
    if (allPosts.length > 0 && (!searchTerm || searchTerm === "")) loadMorePosts(searchTerm);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchTerm(value);

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(function () {
      if(value) {
        const filteredPosts: PostType[] = [...allPosts].filter((post) =>
          post.title.toLowerCase().includes(value.toLowerCase())
        );
    
        setPosts([...filteredPosts]);
      } else {
        setPosts([...allPosts].slice(0, 5));
      }
    }, 1000);
  };

  return (
    <div className="app">
      <Header />

      <section>
        <div className="line-title">
          <h1>Posts</h1>

          <input
            type="search"
            id="search-posts"
            placeholder="Search by name, text or id"
            onChange={handleSearch}
          />
        </div>

        {posts.length > 0 && <PostGrid posts={posts} />}

        {posts.length < 1 && <div className="empty-list">Não há resultado</div>}

        <ObserverPostGrid onIntersect={handleIntersect} />
      </section>
    </div>
  );
};

export default Home;
