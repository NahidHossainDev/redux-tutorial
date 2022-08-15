import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "./PostForm";
import { fetchPosts, getPostErr, getPostState, getPostStatus } from "./postSlice";
import ReactionButton from "./ReactionButton";
import TimeAgo from "./TimeAgo";

const Posts = () => {
	const dispatch = useDispatch();
	const allPosts = useSelector(getPostState);
	const postErr = useSelector(getPostErr);
	const postStatus = useSelector(getPostStatus);

	useEffect(() => {
		if (postStatus === "idle") {
			dispatch(fetchPosts());
		}
	}, [postStatus, dispatch]);

	let content = null;

	if (postStatus === "loading") {
		content = <p>Loading...</p>;
	} else if (postStatus === "succeded") {
		const orderedPosts = allPosts.slice().sort((a, b) => b.date.localeCompare(a.date));
		content = orderedPosts.map((el) => <Article data={el} key={el?.id} />);
	}

	return (
		<section className='post-section'>
			<PostForm />
			{content}
		</section>
	);
};

const Article = ({ data }) => {
	const { title, body, date } = data;
	return (
		<article className='post'>
			<h5>{title}</h5>
			<p>{body}</p>
			<TimeAgo timestamp={date} />
			<ReactionButton post={data} />
		</article>
	);
};
export default Posts;
