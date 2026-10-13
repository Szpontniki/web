import { BLUETOOTH_CONSTANTS } from "./constants";

class BluetoothManager {
	private device: BluetoothDevice | null = null;
	private commandCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
	private isConnected = false;

	public async connectBLE() {
		this.device = await navigator.bluetooth.requestDevice({
			filters: [{ namePrefix: BLUETOOTH_CONSTANTS.namePrefix }],
			optionalServices: [BLUETOOTH_CONSTANTS.serviceUUID],
		});

		this.device.addEventListener("gattserverdisconnected", () => {
			this.commandCharacteristic = null;
			this.isConnected = false;
		});

		if (!this.device.gatt)
			throw new Error("Failed to connect to the bluetooth device!");

		const server = await this.device.gatt.connect();
		const service = await server.getPrimaryService(BLUETOOTH_CONSTANTS.serviceUUID);

		this.commandCharacteristic = await service.getCharacteristic(BLUETOOTH_CONSTANTS.characteristicUUID);
		this.isConnected = true;
	}

	public async sendCommand(command: string) {
		if (!this.isConnected || !this.commandCharacteristic)
			throw new Error("Not connected to the bluetooth device!");

		const data = new TextEncoder().encode(command);

		await this.commandCharacteristic.writeValueWithResponse(data);
	}

	public getIsConnected() {
		return this.isConnected;
	}
}

// TODO: perhaps it would be better to manage this variable via a React hook of some kind? `useBluetooth` maybe?
export const bluetoothManager = new BluetoothManager();
