# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

import { useState } from 'react';
import styles from './App.module.css';

const sendFormData = (formData) => {
console.log(formData);
};
export const App = () => {
const [formData, setFormData] = useState({
email: '',
password: '',
repeatPassword: '',
});
const [formDataError, setFormDataError] = useState({
emailError: null,
passwordError: null,
repeatPasswordError: null,
registrarionError: null,
});
const onSubmit = (event) => {
event.preventDefault();
let emailError = null;
let passwordError = null;
let repeatPasswordError = null;
if (!formData.email) {
emailError = 'Поле обязательно для заполнения';
}
if (!formData.password) {
passwordError = 'Поле обязательно для заполнения';
}
if (!formData.repeatPassword) {
repeatPasswordError = 'Поле обязательно для заполнения';
}

    	setFormDataError({
    		...formDataError,
    		passwordError,
    		emailError,
    		repeatPasswordError,
    	});
    	sendFormData({ formData });
    };
    const { email, password, repeatPassword } = formData;

    const handleEmailChange = ({ target }) => {
    	setFormData({ ...formData, email: target.value });
    	let newError = null;

    	if (!/\S+@\S+\.\S+/.test(target.value)) {
    		newError = 'Неверный почтовый адрес';
    	}

    	setFormDataError({ ...formDataError, emailError: newError });
    };

    const handlePasswordChange = ({ target }) => {
    	setFormData({ ...formData, password: target.value });

    	let newError = null;

    	if (
    		!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(
    			target.value,
    		)
    	) {
    		newError =
    			' Пароль должен содержать символы, буквы и цифры разного регистра. Минимум одна из букв должна быть заглавной. Длина пароля  не менее 6 символов';
    	}
    	if (repeatPassword && repeatPassword !== target.value) {
    		newError = ' Пароли должны совпадать';
    	}

    	setFormDataError({ ...formDataError, passwordError: newError });
    };

    const handleRepeatPasswordChange = ({ target }) => {
    	setFormData({ ...formData, repeatPassword: target.value });
    	let newError = null;
    	if (password !== target.value) {
    		newError = ' Пароли должны совпадать';
    	}

    	setFormDataError({
    		...formDataError,
    		repeatPasswordError: newError,
    	});
    };

    return (
    	<div className={styles.App}>
    		<form onSubmit={onSubmit} className={styles.Form}>
    			<div>Почта</div>
    			<input
    				name="email"
    				type="email"
    				placeholder="Введите email"
    				value={email}
    				onChange={handleEmailChange}
    				className="styles.input"
    			/>
    			{formDataError.emailError && <p>{formDataError.emailError}</p>}
    			<div>Пароль</div>
    			<input
    				name="password"
    				type="password"
    				placeholder="Введите пароль"
    				value={password}
    				onChange={handlePasswordChange}
    			/>
    			{formDataError.passwordError && <p>{formDataError.passwordError}</p>}
    			<div>Повторите пароль</div>
    			<input
    				name="repeatPassword"
    				type="password"
    				placeholder="Повторите пароль"
    				value={repeatPassword}
    				onChange={handleRepeatPasswordChange}
    			/>
    			{formDataError.repeatPasswordError && (
    				<p>{formDataError.repeatPasswordError}</p>
    			)}
    			<button
    				type="submit"
    				disabled={
    					!!formDataError.passwordError ||
    					!!formDataError.repeatPasswordError ||
    					!!formDataError.emailError
    				}
    			>
    				Зарегистрироваться
    			</button>
    		</form>
    	</div>
    );

};
