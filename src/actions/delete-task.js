import { getToDo } from './getToDo';
export const deleteToDos = (query) => async (dispatch) => {
	dispatch(setIsLoading(true));
	fetch(`http://localhost:3004/todos/${query}`, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
	})
		.then((rawResponse) => rawResponse.json())
		.then(() => {
			dispatch(deleteToDo());
			dispatch(setIsLoading(false));
			dispatch(getToDo());
		});
};

const deleteToDo = () => ({
	type: 'DELETE_TODO',
	payload: {},
});

const setIsLoading = (isLoading) => ({
	type: 'SET_LOADING',
	payload: { isLoading },
});
