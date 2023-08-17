export const getToDo = (query) => async (dispatch) => {
	dispatch(setIsLoading(true));
	fetch(`http://localhost:3004/todos?${new URLSearchParams(query)}`)
		.then((loadedData) => loadedData.json())
		.then((loadedToDos) => {
			dispatch(getToDoSuccess(loadedToDos));
			dispatch(setIsLoading(false));
		});
};

const getToDoSuccess = (toDos) => ({
	type: 'GET_TO_DO_SUCCESS',
	payload: { toDos },
});

const setIsLoading = (isLoading) => ({
	type: 'SET_LOADING',
	payload: { isLoading },
});
