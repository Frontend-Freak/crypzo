import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/reset.css";
import { Provider } from "react-redux";
import ThemeRouter from "./theme-provider";
import { store } from "./RTK/store";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeRouter />
		</Provider>
	</StrictMode>
);
