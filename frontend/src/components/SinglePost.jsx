import LikeButton from "./LikeButton";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

const PostList = ({
  _id,
  location,
  caption,
  createdAt,
  userId: { username, avatar, _id: uid },
  hasLiked
}) => {
  return (
    <div className="border-2 rounded mb-4">
      <div className="flex h-[70px] items-center box-border px-4">
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <p className="font-bold text-sm">{username}</p>
          <p className="text-gray-400 text-xs">{location}</p>
        </div>
      </div>
      <div className="pb-4">
        <div className="px-4">
          <div className="inline-flex">
            <LikeButton
              postId={_id}
              userId={uid}
              hasLiked={hasLiked}
            />
            <span className="text-sm font-bold">10</span>
          </div>
          <div className="inline-flex ml-2">
            <ChatBubbleLeftIcon className="h-6 w-6 text-gray-600" />
            <span className="text-sm font-bold">2</span>
          </div>
          <p className="text-sm">
            <span className="text-sm font-bold inline-block mr-1">
              {username}
            </span>
            {caption}
          </p>
          <p className="text-gray-400 text-xs font-[500] mt-2">
            View all 999 comments
          </p>
          <p className="text-gray-400 text-[10px] mt-1">{createdAt}</p>
        </div>
      </div>
    </div>
  );
};

export default PostList;
