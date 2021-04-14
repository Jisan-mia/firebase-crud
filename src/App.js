import "./App.css";
import Contacts from "./components/Contacts";

function App() {
	return (
		<div className="container">
			<div className="container-fluid py-5 mb-3 bg-light">
				<h1 className="display-5 fw-bold py-4 text-center">Register Contact</h1>
			</div>
			<Contacts />
		</div>
	);
}

export default App;
