import { useEffect, useState } from "react";
import {
	useSendTransaction,
	useWaitForTransactionReceipt,
	useWriteContract,
} from "wagmi";
import { parseEther } from "viem";
import { abi } from "../abi";

// НАЙТИ СВАПАЛКУ ДЛЯ СЕПОЛИИ И ОБМЕНЯТЬ ТАМ ЭФИР НА ТОКЕНЫ

const SendTransaction = () => {
	const [address, setAddress] = useState<string>("");
	const [value, setValue] = useState<string>("");
	// const { data: hash, isPending, sendTransaction } = useSendTransaction();
	const { data: hash, isPending, writeContract } = useWriteContract();

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
			confirmations: 1,
		});

	const submitHandle = () => {
		const payload = {
			address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
			abi,
			to: address as `0x${string}`,
			value: parseEther(value),
		};

		// writeContract(payload);
	};

	useEffect(() => {
		console.log("isSuccess:", isConfirmed, new Date());
	}, [isConfirmed]);

	return (
		<div>
			<h2>Send Transaction</h2>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					width: "250px",
					gap: "10px",
				}}
			>
				<input
					name="address"
					value={address}
					onChange={e => setAddress(e.target.value)}
					placeholder="0x2fce..2d3"
					required
				/>
				<input
					name="value"
					onChange={e => setValue(e.target.value)}
					value={value}
					placeholder="0.05"
					required
				/>
				<button disabled={isPending} onClick={() => submitHandle()}>
					{isPending ? "В процессе..." : "Отправить"}
				</button>
				{hash && <div>Transaction Hash: {hash}</div>}
				{isConfirming && <div>Waiting for confirmation...</div>}
				{isConfirmed && <div>Transaction confirmed.</div>}
			</div>
		</div>
	);
};

export default SendTransaction;
