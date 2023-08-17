import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToDo } from '../actions/getToDo';
import { deleteToDos } from '../actions/delete-task';
import { changeTasks } from '../actions/change-task';
import styles from '../App.module.css';

export const TasksList = () => {
	const [isChanging, setIsChanging] = useState({ what: false, id: 'id' });
	const [updateInput, setUpdateInput] = useState();
	const { toDos, isLoading } = useSelector((state) => state.toDos);
	const dispatch = useDispatch();

	const searchDeal = (str) => {
		dispatch(getToDo(`q=${str}`));
	};

	const sortDeal = () => {
		dispatch(getToDo({ _sort: 'name', _order: 'asc' }));
	};

	const requestDeleteDeal = (id) => {
		dispatch(deleteToDos(id));
		dispatch(getToDo());
	};

	const handleUpdateChange = (event, id) => {
		const toDo = toDos.filter((item) => item.id === id);
		if (event.target.value) {
			setUpdateInput(event.target.value);
		} else {
			setUpdateInput(toDo[0].name);
		}
	};

	const requestChangeDeal = (id) => {
		setIsChanging({ what: true, id });
		setUpdateInput();
	};

	const requestUpdateDeal = (id) => {
		dispatch(changeTasks(updateInput, id));
		dispatch(getToDo());
		setIsChanging({ what: false, id });
	};

	useEffect(() => {
		dispatch(getToDo());
	}, []);
	return (
		<div>
			<div className={styles.search}>
				<label>Найти задачу</label>
				<input
					type="text"
					onChange={(event) => {
						return searchDeal(event.target.value);
					}}
				/>
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
								<button onClick={() => requestUpdateDeal(id)}>ОК</button>
							</div>
						) : (
							<p className={styles.deal}>{name}</p>
						)}

						<button onClick={() => requestChangeDeal(id)}>Изменить дело</button>

						<button
							className={styles.delete}
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
