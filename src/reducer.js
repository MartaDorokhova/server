export const initialState = {};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		// case 'SET_IS_GAME_ENDED': {
		// 	const { isGameEnded } = action.payload;

		// 	return { ...state, isGameEnded };
		// }

		default:
			return state;
	}
};
