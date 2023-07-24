import { useState, useContext } from 'react';
import { AppContext } from './context';
import styles from './App.module.css';

export const AddTask = () => {
	const [isCreating, setIsCreating] = useState(false);

	const [addName, setAddName] = useState();
	const { dispatch } = useContext(AppContext);
	const handleInputChange = (event) => {
		setAddName(event.target.value);
	};

	const requestAddDeal = () => {
		dispatch({ type: 'SET NEW TASK', payload: addName });
		setIsCreating(false);
	};

	return (
		<div>
			<form className={styles.newDeal}>
				<div>
					<label>Введите новую задачу</label>
					<input type="text" onChange={handleInputChange} />
					<button disabled={isCreating} onClick={requestAddDeal}>
						Добавить дело
					</button>
				</div>
			</form>
		</div>
	);
};
