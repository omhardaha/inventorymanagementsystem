import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import Topbar from "./topbar/Topbar";
import Product from "./Product/Product";
import Single from "./Single/Single";
import CategoryList from "./CategoryList/CategoryList";
import Home from "./pages/Home/Home";
import Write from "./Write/Write";
import Setting from "./Setting/Setting";
import ManageCat from "./ManageCat/ManageCat";
import Login from "./Login/Login";
import ForgotPassword from "./Login/ForgotPassword";
import Register from "./Register/Register";
import { Context } from "./context/Context";
import LoadingBar from "react-top-loading-bar";
import { ContextProvider } from "./context/Context";

function App() {
	const { user } = useContext(Context);

	return (
		<>
			<ContextProvider value={{ h: "fdg" }}>
				<Topbar />
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Home />
							</>
						}
					/>
					<Route path="/login" element={user ? <Home /> : <Login />} />
					<Route path="/forgotPassword" element={ <ForgotPassword /> } />
					<Route path="/category" element={user ? <ManageCat /> : <Home />} />
					<Route path="/Setting" element={user ? <Setting /> : <Register />} />
					<Route path="/Write" element={user ? <Write /> : <Register />} />
					<Route path="/Register" element={user ? <Home /> : <Register />} />
					<Route path="/setting" element={user ? <Home /> : <Setting />} />
					<Route path={`/Post/:id`} element={<Single />} />
				</Routes>
			</ContextProvider>
		</>
	);
}

export default App;
