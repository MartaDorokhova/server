import { getToDo } from '../actions/getToDo';
export const changeTasks = (query, id) => async (dispatch) => {
	dispatch(setIsLoading(true));
	fetch(`http://localhost:3004/todos/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			name: query,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then(() => {
			dispatch(changeToDo());
			dispatch(setIsLoading(false));
			dispatch(getToDo());
		});
};

const changeToDo = () => ({
	type: 'UPDATE_TASK',
});

const setIsLoading = (isLoading) => ({
	type: 'SET_LOADING',
	payload: { isLoading },
});
