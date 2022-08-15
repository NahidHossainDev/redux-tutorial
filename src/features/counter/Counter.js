import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, getCounterState, increment, incrementByAmount, reset } from "./counterSlice";

const Counter = () => {
	const { count } = useSelector(getCounterState);
	const dispatch = useDispatch();

	return (
		<section>
			<p>{count}</p>
			<button onClick={() => dispatch(decrement())}>-</button>
			<button onClick={() => dispatch(increment())}>+</button>
			<button onClick={() => dispatch(incrementByAmount(5))}>+ 5</button>
			<button onClick={() => dispatch(reset())}>reset</button>
		</section>
	);
};

export default Counter;
