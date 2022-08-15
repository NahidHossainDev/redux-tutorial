import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "./postSlice";

const PostForm = () => {
	const initialValue = {
		title: "",
		description: "",
	};
	const [values, setValues] = useState(initialValue);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((p) => ({ ...p, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = { ...values, id: nanoid(), date: new Date().toISOString() };
		dispatch(addNewPost(payload));
		setValues(initialValue);
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputBox label='Title' name='title' value={values.title} onChangeHandler={handleChange} />
			<InputBox
				label='Description'
				name='description'
				value={values.description}
				onChangeHandler={handleChange}
			/>
			<button type='submit' disabled={!values.description || !values.title}>
				Submit
			</button>
		</form>
	);
};

const InputBox = ({ name, label, onChangeHandler, value }) => {
	return (
		<input
			name={name}
			placeholder={label}
			onChange={onChangeHandler}
			value={value}
			style={{ width: "100%", boxSizing: "border-box" }}
		></input>
	);
};
export default PostForm;
