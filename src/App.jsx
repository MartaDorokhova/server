import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [toDos, setToDos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [refreshToDosFlag, setRefreshToDosFlag] = useState();

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3004/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedToDos) => {
				setToDos(loadedToDos);
			})
			.finally(() => setIsLoading(false));
	}, []);
	const requestAddDeal = () => {
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
			});
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
			<button onClick={requestAddDeal}>Добавить дело</button>
		</div>
	);
};
