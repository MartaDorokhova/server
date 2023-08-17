export const initialState = {
	addName: '',
	toDos: [],
	// isCreating: false,
	isLoading: false,
	isChanging: false,
};

export const toDoReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NEW_TASK': {
			return { ...state };
		}

		case 'GET_TO_DO_SUCCESS': {
			const { toDos } = action.payload;
			return { ...state, toDos };
		}

		case 'SET_LOADING': {
			const { isLoading } = action.payload;
			return { ...state, isLoading };
		}

		case 'DELETE_TODO': {
			return { ...state };
		}
		case 'UPDATE_TODO': {
			return { ...state };
		}
		default:
			return state;
	}
};
