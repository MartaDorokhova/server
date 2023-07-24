import { AddTask } from './add-task';
import { useState } from 'react';
import { AppContext } from './context';
import styles from './App.module.css';
import { TasksList } from './tasks-list';

export const App = () => {
	const [refreshToDosFlag, setRefreshToDosFlag] = useState();
	const refreshToDos = () => setRefreshToDosFlag(!refreshToDosFlag);
	const dispatch = (action) => {
		const { type, payload } = action;
		switch (type) {
			case 'SET NEW TASK':
				fetch('http://localhost:3004/todos', {
					method: 'Post',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						name: payload,
					}),
				})
					.then((rawResponse) => rawResponse.json())
					.then((response) => {
						refreshToDos(response);
					});

				break;
			case 'DELETE TASK':
				fetch(`http://localhost:3004/todos/${payload}`, {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
				})
					.then((rawResponse) => rawResponse.json())
					.then((response) => {
						console.log('Дело удалено:', response);
						refreshToDos(response);
					});
				break;

			default:
			//ничего не делать
		}
	};
	return (
		<AppContext.Provider value={{ dispatch }}>
			<div className={styles.app}>
				<TasksList />
				<AddTask />
			</div>
		</AppContext.Provider>
	);
};
