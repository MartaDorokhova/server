export const addNewTask = (query) => async (dispatch) => {
	dispatch(setIsLoading(true));
	fetch('http://localhost:3004/todos', {
		method: 'Post',
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		body: JSON.stringify({
			name: query,
		}),
	})
		.then((rawResponse) => rawResponse.json())
		.then(() => {
			dispatch(addToDo());
			dispatch(setIsLoading(false));
		});
};

const addToDo = () => ({
	type: 'SET_NEW_TASK',
});

const setIsLoading = (isLoading) => ({
	type: 'SET_LOADING',
	payload: { isLoading },
});
