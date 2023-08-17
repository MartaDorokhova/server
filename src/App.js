import { TasksList, AddTask } from './components';
import './App.css';
import styles from './App.module.css';

export const App = () => {
	return (
		<div className={styles.App}>
			<div>
				<TasksList />
				<AddTask />
			</div>
		</div>
	);
};
