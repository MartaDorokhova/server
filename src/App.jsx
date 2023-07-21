import { TaskList } from './task-list';
import styles from './App.module.css';

export const App = () => {
	return (
		<div className={styles.app}>
			<TaskList />
		</div>
	);
};
