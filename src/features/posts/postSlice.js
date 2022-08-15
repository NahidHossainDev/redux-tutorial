import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
	posts: [],
	status: "idle", // 'idle' | 'loading' | 'succeded' | 'failed';
	error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	try {
		const responce = await axios.get(POST_URL);
		return responce.data;
	} catch (err) {
		return err.message;
	}
});

// const initialState = [
// 	{
// 		id: "1",
// 		title: "Learing redux toolkit",
// 		description: "This is a first posts descriptions.",
// 		date: sub(new Date(), { minutes: 10 }).toISOString(),
// 		reactions: {
// 			like: 0,
// 			heart: 0,
// 			rocket: 0,
// 		},
// 	},
// 	{
// 		id: "2",
// 		title: "This is Second post",
// 		description: "This is Second posts descriptions.",
// 		date: sub(new Date(), { minutes: 5 }).toISOString(),
// 		reactions: {
// 			like: 0,
// 			heart: 0,
// 			rocket: 0,
// 		},
// 	},
// ];

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
			state = state.posts.push(finalPayload);
		},
		reactionAdded(state, action) {
			const { id, reaction } = action.payload;
			const existingPost = state.posts.find((el) => el.id === id);
			if (existingPost) existingPost.reactions[reaction]++;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.status = "succeded";
				// Add date and reaction
				let min = 1;
				const loadedPosts = action.payload.map((el) => {
					el.date = sub(new Date(), { minutes: min++ }).toISOString();
					el.reactions = {
						like: 0,
						heart: 0,
						rocket: 0,
					};
					return el;
				});

				// Add any fetchd posts to the array
				state.posts = state.posts.concat(loadedPosts);
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { addNewPost, reactionAdded } = postSlice.actions;
export const getPostState = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostErr = (state) => state.posts.error;
export default postSlice.reducer;
