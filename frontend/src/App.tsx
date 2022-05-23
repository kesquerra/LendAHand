import * as React from 'react';
import { HashRouter, Outlet, Route, Routes } from "react-router-dom"; // remember to import/change HashRouter to BrowserRouter if not gh-pages
import AppBar from './Components/AppBar';
import LandingPage from './Components/LandingPage';
import NotFound from './Components/NotFound';
import LendPage from './Components/LendPage';
import RequestPage from './Components/RequestPage';
import LoginPage from './Components/LoginPage';
import ProfilePage from './Components/ProfilePage';
import { ROUTER_PATHS } from './Constants';
import "../public/lendahand.css";
import { useEffect } from 'react';
import { testBackendConnection, testBackendStatus } from './Services/BackendStatusService';




function App() {

	useEffect(()=> {
		console.log("AppBar first Render")
		testBackendConnection()
		testBackendStatus()
	},[])


	const Page = () => {
		return(
		<div>
			<AppBar/>
			<Outlet/>
		</div>
		);
	}

	const landingPage = <LandingPage/>
	const notFound = <NotFound/>
	const lendPage = <LendPage/>
	const requestPage = <RequestPage/>
	const loginPage = <LoginPage/>
	const profilePage = <ProfilePage/>

  return (
	
			<HashRouter >
				<Routes>

					<Route path={ROUTER_PATHS.landing} element={<Page/>}>
				
							<Route path={ROUTER_PATHS.landing} element={landingPage}/>
							<Route path={ROUTER_PATHS.lend} element={lendPage}/>
							<Route path={ROUTER_PATHS.request} element={requestPage}/>
							<Route path={ROUTER_PATHS.login} element={loginPage}/>
							<Route path={ROUTER_PATHS.profile} element={profilePage}/>

					</Route>

					<Route path={ROUTER_PATHS.error} element={notFound}/>

				</Routes>
			</HashRouter>
  );
}

export default App;
