import { useState } from 'react';
import { Task } from './task';
import styles from './App.module.css';

export const TaskList = () => {
	const [isCreating, setIsCreating] = useState(false);
	const [refreshToDosFlag, setRefreshToDosFlag] = useState();
	const [addName, setAddName] = useState();
	const handleInputChange = (event) => {
		setAddName(event.target.value);
	};

	const refreshToDos = () => setRefreshToDosFlag(!refreshToDosFlag);

	const requestAddDeal = () => {
		fetch('http://localhost:3004/todos', {
			method: 'Post',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: addName,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				refreshToDos(response);
			})
			.finally(() => setIsCreating(false));
	};

	return (
		<div>
			<Task />
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
