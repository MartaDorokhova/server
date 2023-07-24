import { AddTask } from './add-task';
import { useState, useEffect } from 'react';
import { AppContext } from './context';
import styles from './App.module.css';
import { TasksList } from './tasks-list';

export const App = () => {
	const [toDos, setToDos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshToDosFlag, setRefreshToDosFlag] = useState();
	const refreshToDos = () => setRefreshToDosFlag(!refreshToDosFlag);
	const getToDo = (query) => {
		fetch(`http://localhost:3004/todos?${new URLSearchParams(query)}`)
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setToDos(loadedToDos);
			})
			.finally(() => setIsLoading(false));
	};

	useEffect(() => {
		setIsLoading(true);
		getToDo();
	}, [refreshToDosFlag]);

	const dispatch = (action) => {
		const { type, payload } = action;
		switch (type) {
			case 'SEARCH TASK':
				getToDo(`q=${payload}`);

				break;
			case 'SORT TASKS':
				getToDo({ _sort: 'name', _order: 'asc' });

				break;
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
			case 'UPDATE TASK':
				fetch(`http://localhost:3004/todos/${payload.id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						name: payload.name,
					}),
				})
					.then((rawResponse) => rawResponse.json())
					.then((response) => {
						console.log(response);
						refreshToDos();
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
		<AppContext.Provider value={{ dispatch, toDos, isLoading }}>
			<div className={styles.app}>
				<TasksList />
				<AddTask />
			</div>
		</AppContext.Provider>
	);
};
