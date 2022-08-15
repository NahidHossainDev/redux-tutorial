import React from "react";
import "./App.css";
import Counter from "./features/counter/Counter";
import Posts from "./features/posts/Posts";

function App() {
	return (
		<main className='App'>
			<Counter />
			<Posts />
		</main>
	);
}

export default App;
