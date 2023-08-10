import { TasksUpdating } from './task-updating';
import './App.css';
import styles from './App.module.css';

export const App = () => {
	return (
		<div className={styles.App}>
			<div>
				<TasksUpdating />
			</div>
		</div>
	);
};
