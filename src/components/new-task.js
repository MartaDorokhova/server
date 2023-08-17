import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addNewTask } from '../actions/add-task';
import styles from '../App.module.css';

export const AddTask = () => {
	const [addName, setAddName] = useState();
	const dispatch = useDispatch();

	const handleInputChange = (event) => {
		setAddName(event.target.value);
	};

	const requestAddDeal = () => {
		dispatch(addNewTask(addName));
	};

	return (
		<div>
			<form className={styles.newDeal}>
				<div>
					<label>Введите новую задачу</label>

					<input type="text" onChange={handleInputChange} />
					<button onClick={requestAddDeal}>Добавить дело</button>
				</div>
			</form>
		</div>
	);
};
