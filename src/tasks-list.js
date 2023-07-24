import { useEffect, useState, useContext } from 'react';
import { AppContext } from './context';
import styles from './App.module.css';

export const TasksList = () => {
	const [toDos, setToDos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isChanging, setIsChanging] = useState({ what: false, id: 'id' });
	const [refreshToDosFlag, setRefreshToDosFlag] = useState();
	const [updateInput, setUpdateInput] = useState(false);
	const { dispatch } = useContext(AppContext);
	const handleUpdateChange = (event, id) => {
		const toDo = toDos.filter((item) => item.id === id);
		if (event.target.value) {
			setUpdateInput(event.target.value);
		} else {
			setUpdateInput(toDo[0].name);
		}
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
		if (updateInput) {
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
				.finally(() => {
					setIsChanging({ what: false, id });
				});
		}
		setIsChanging({ what: false, id });
	};
	const requestDeleteDeal = (id) => {
		setIsDeleting(true);
		dispatch({ type: 'DELETE TASK', payload: id });
		setIsDeleting(false);
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
							<form>
								<input
									className={styles.update}
									type="text"
									name={name}
									onChange={(event) => handleUpdateChange(event, id)}
									defaultValue={name}
								/>
								<button onClick={() => requestUpdateDeal(id)}>ОК</button>
							</form>
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
