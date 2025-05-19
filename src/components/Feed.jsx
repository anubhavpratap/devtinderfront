import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../utils/constants";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error("Failed to fetch feed", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[40vh]">
      {feed && feed.length > 0 ? (
        <UserCard user={feed[0]} feed={true} />
      ) : (
        <div className="text-center text-gray-400">
          <h2 className="text-xl font-semibold">No new suggestions</h2>
          <p className="text-sm mt-2">
            You're all caught up! Try again later for more suggestions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Feed;
