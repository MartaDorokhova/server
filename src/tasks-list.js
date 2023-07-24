import { useState, useContext } from 'react';
import { AppContext } from './context';
import styles from './App.module.css';

export const TasksList = () => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [isChanging, setIsChanging] = useState({ what: false, id: 'id' });
	const [updateInput, setUpdateInput] = useState();
	const { dispatch, toDos, isLoading } = useContext(AppContext);

	const handleUpdateChange = (event, id) => {
		const toDo = toDos.filter((item) => item.id === id);
		if (event.target.value) {
			setUpdateInput(event.target.value);
		} else {
			setUpdateInput(toDo[0].name);
		}
	};

	const searchDeal = (searchWord) => {
		dispatch({ type: 'SEARCH TASK', payload: searchWord });
	};

	const sortDeal = () => {
		dispatch({ type: 'SORT TASKS', payload: {} });
	};

	const requestChangeDeal = (id) => {
		setIsChanging({ what: true, id });
		setUpdateInput();
	};
	const requestUpdateDeal = (id) => {
		if (updateInput) {
			dispatch({ type: 'UPDATE TASK', payload: { name: updateInput, id: id } });
			console.log('updateInput', updateInput);
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
