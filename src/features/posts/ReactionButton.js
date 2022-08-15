import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";

const reactionEmoji = {
	like: "Like",
	heart: "Heart",
	rocket: "Rocket",
};

const ReactionButton = ({ post }) => {
	const dispatch = useDispatch();

	const reaction = Object.entries(reactionEmoji).map(([key, val]) => {
		return (
			<button
				key={key}
				type='button'
				className='reactionButton'
				onClick={() => dispatch(reactionAdded({ id: post.id, reaction: key }))}
			>
				{val}: {post.reactions[key]}
			</button>
		);
	});

	return <div>{reaction}</div>;
};

export default ReactionButton;
