import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";
// import axios from "axios";

// const POST_URL = "https://jsonplaceholder.typicode.com/posts";

// const initialState = {
// 	posts: [],
// 	status: "idle", // 'idle' | 'loading' | 'succeded' | 'failed';
// 	error: null,
// };

// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
// 	try {
// 		const responce = await axios.get(POST_URL);
// 		return responce.data;
// 	} catch (err) {
// 		return err.message;
// 	}
// });

const initialState = [
	{
		id: "1",
		title: "Learing redux toolkit",
		description: "This is a first posts descriptions.",
		date: sub(new Date(), { minutes: 10 }).toISOString(),
		reactions: {
			like: 0,
			heart: 0,
			rocket: 0,
		},
	},
	{
		id: "2",
		title: "This is Second post",
		description: "This is Second posts descriptions.",
		date: sub(new Date(), { minutes: 5 }).toISOString(),
		reactions: {
			like: 0,
			heart: 0,
			rocket: 0,
		},
	},
];

export const postSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addNewPost: (state, action) => {
			const finalPayload = {
				...action.payload,
				reactions: {
					like: 0,
					heart: 0,
					rocket: 0,
				},
			};
			state = state.push(finalPayload);
		},
		reactionAdded(state, action) {
			const { id, reaction } = action.payload;
			const existingPost = state.find((el) => el.id === id);
			if (existingPost) existingPost.reactions[reaction]++;
		},
	},
	// extraReducers(builder) {
	// 	builder
	// 		.addCase(fetchPosts.pending, (state, action) => {
	// 			state.status = "loading";
	// 		})
	// 		.addCase(fetchPosts.fulfilled, (state, action) => {
	// 			state.status = "succeded";

	// 			// Add date and reaction

	// 			// Add any fetchd posts to the array
	// 			state.posts = state.posts.concat(action.payload);
	// 		});
	// },
});

export const { addNewPost, reactionAdded } = postSlice.actions;
export const getPostState = (state) => state.posts.posts;
export default postSlice.reducer;
