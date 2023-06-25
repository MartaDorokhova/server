import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [toDos, setToDos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [refreshToDosFlag, setRefreshToDosFlag] = useState();

	const refreshToDos = () => setRefreshToDosFlag(!refreshToDosFlag);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3004/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setToDos(loadedToDos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshToDosFlag]);
	const requestAddDeal = () => {
		setIsCreating(true);
		fetch('http://localhost:3004/todos', {
			method: 'Post',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: `Купить хлеба ${Math.random()} кг`,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Добавлено новое дело:', response);
				refreshToDos();
			})
			.finally(() => setIsCreating(false));
	};
	const requestUpdateDeal = () => {
		setIsUpdating(true);
		fetch('http://localhost:3004/todos/4', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: `Купить яблок ${Math.random()} кг`,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело обновлено:', response);
				refreshToDos();
			})
			.finally(() => setIsUpdating(false));
	};
	const requestDeleteDeal = () => {
		setIsDeleting(true);
		fetch('http://localhost:3004/todos/4', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело обновлено:', response);
				refreshToDos();
			})
			.finally(() => setIsDeleting(false));
	};
	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className="loader"></div>
			) : (
				toDos.map(({ id, name }) => (
					<div key={id}>
						{id} - {name}!
					</div>
				))
			)}
			<form className={styles.forms}>
				<label>
					Введите новую задачу
					<input type="text" name="name" />
				</label>
				<input
					type="submit"
					disabled={isCreating}
					onClick={requestAddDeal}
					value="Добавить задачу"
				/>
			</form>

			<button disabled={isUpdating} onClick={requestUpdateDeal}>
				Изменить дело
			</button>
			<button disabled={isDeleting} onClick={requestDeleteDeal}>
				Удалить дело
			</button>
			{/* <input>Введите задачу</input> */}
		</div>
	);
};
