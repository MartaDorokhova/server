import { AddTask } from './add-task';
import styles from './App.module.css';
import { TasksList } from './tasks-list';

export const App = () => {
	return (
		<div className={styles.app}>
			<TasksList />
			<AddTask />
		</div>
	);
};
