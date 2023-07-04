import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [toDos, setToDos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isChanging, setIsChanging] = useState({ what: false, id: 0 });
	const [refreshToDosFlag, setRefreshToDosFlag] = useState();
	const [addName, setAddName] = useState();
	const [updateInput, setUpdateInput] = useState(false);
	const handleInputChange = (event) => {
		setAddName(event.target.value);
	};
	const handleUpdateChange = (event) => {
		setUpdateInput(event.target.value);
	};
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
	const requestChangeDeal = (id) => {
		console.log(id);
		setIsChanging({ what: true, id });
	};
	const requestUpdateDeal = (id) => {
		setIsUpdating(true);
		setIsChanging({ what: false, id: id });
		fetch(`http://localhost:3004/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				name: updateInput,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело обновлено:', response);
				refreshToDos();
			})
			.finally(() => setIsUpdating(false));
	};
	const requestDeleteDeal = (id) => {
		setIsDeleting(true);
		fetch(`http://localhost:3004/todos/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Дело удалено:', response);
				refreshToDos();
			})
			.finally(() => setIsDeleting(false));
	};
	console.log(isChanging);
	return (
		<div className={styles.app}>
			{isLoading ? (
				<div className="loader"></div>
			) : (
				toDos.map(({ id, name }) => (
					<div key={id} className={styles.item}>
						<p>{id}</p>
						{isChanging.what && isChanging.id === id ? (
							<div>
								<input
									className={styles.update}
									type="text"
									name={name}
									onChange={handleUpdateChange}
									defaultValue={name}
								/>
								<button
									disabled={isUpdating}
									onClick={() => requestUpdateDeal(id)}
								>
									ОК
								</button>
							</div>
						) : (
							<p>{name}</p>
						)}

						<button
							// disabled={isChanging.what}
							onClick={() => requestChangeDeal(id)}
						>
							Изменить дело
						</button>

						<button
							className={styles.delete}
							disabled={isDeleting}
							onClick={() => requestDeleteDeal(id)}
						>
							Удалить дело
						</button>
					</div>
				))
			)}
			<form className={styles.newDeal}>
				<label>Введите новую задачу</label>
				<input type="text" onChange={handleInputChange} />

				<button disabled={isCreating} onClick={requestAddDeal}>
					Добавить дело
				</button>
			</form>
		</div>
	);
};
