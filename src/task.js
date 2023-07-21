import { useEffect, useState } from 'react';
import styles from './App.module.css';

export const Task = () => {
	const [toDos, setToDos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isChanging, setIsChanging] = useState({ what: false, id: 0 });
	const [refreshToDosFlag, setRefreshToDosFlag] = useState();

	const [updateInput, setUpdateInput] = useState(false);

	const handleUpdateChange = (event) => {
		setUpdateInput(event.target.value);
	};

	const searchDeal = (searchWord) => {
		getToDo(`q=${searchWord}`);
	};

	const sortDeal = () => {
		getToDo({ _sort: 'name', _order: 'asc' });
	};

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

	const requestChangeDeal = (id) => {
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

	return (
		<div>
			<div className={styles.search}>
				<label>Найти задачу</label>
				<input
					type="text"
					onChange={(event) => searchDeal(event.target.value)}
				/>{' '}
			</div>
			<button onClick={sortDeal}>Сортировка(А-Я)</button>

			{isLoading ? (
				<div className="loader"></div>
			) : (
				toDos.map(({ id, name }) => (
					<div key={id} className={styles.item}>
						<p>-</p>
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
							<p className={styles.deal}>{name}</p>
						)}

						<button onClick={() => requestChangeDeal(id)}>Изменить дело</button>

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
		</div>
	);
};
