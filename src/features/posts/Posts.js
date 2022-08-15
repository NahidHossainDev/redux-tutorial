import React from "react";
import { useSelector } from "react-redux";
import PostForm from "./PostForm";
import ReactionButton from "./ReactionButton";
import TimeAgo from "./TimeAgo";

const Posts = () => {
	const allPosts = useSelector((state) => state.posts);

	const orderedPosts = allPosts.slice().sort((a, b) => b.date.localeCompare(a.date));

	return (
		<section className='post-section'>
			<PostForm />
			{orderedPosts.map((el) => (
				<Article data={el} key={el?.id} />
			))}
		</section>
	);
};

const Article = ({ data }) => {
	const { title, description, date } = data;
	return (
		<article className='post'>
			<h5>{title}</h5>
			<p>{description}</p>
			<TimeAgo timestamp={date} />
			<ReactionButton post={data} />
		</article>
	);
};
export default Posts;
