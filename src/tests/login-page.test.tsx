import LoginPage from "../pages/login-page";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom"; //
import { store } from "../RTK/store";

test("render email, password inputs and login button", () => {
	render(
		<Provider store={store}>
			<MemoryRouter>
				<LoginPage />
			</MemoryRouter>
		</Provider>
	);
	const emailInput = screen.getByLabelText(/Почта/i);
	const passwordInput = screen.getByLabelText(/Пароль/i);
	const loginButton = screen.getByText(/Войти/i);

	expect(emailInput).toBeInTheDocument();
	expect(passwordInput).toBeInTheDocument();
	expect(loginButton).toBeInTheDocument();
});
