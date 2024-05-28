import { useAccount, useConnect, useDisconnect } from "wagmi";
import SendTransaction from "./components/SendTransaction";

function App() {
	//Подключение кошелька
	const { connectors, connect, status, error } = useConnect();

	// Информация о подключенном аккаунте
	const { status: accountStatus, address, chainId } = useAccount();

	// Функция для отключения кошелька
	const { disconnect } = useDisconnect();

	return (
		<>
			<div>
				<h2>Account</h2>

				<div>
					status: {status}
					<br />
					address: {address}
					<br />
					chainId: {chainId}
				</div>

				{accountStatus === "connected" && (
					<button type="button" onClick={() => disconnect()}>
						Disconnect
					</button>
				)}
			</div>

			<div>
				<h2>Connect</h2>
				{connectors.map(connector => (
					<button
						key={connector.uid}
						onClick={() => connect({ connector })}
						type="button"
					>
						{connector.name}
					</button>
				))}
				<div>{status}</div>
				<div>{error?.message}</div>
			</div>

			<SendTransaction />
		</>
	);
}

export default App;
