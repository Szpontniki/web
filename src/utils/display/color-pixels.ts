import {
	type DisplayColorPixelsBody,
	getDisplayColorPixelsUrl,
	displayColorPixels as HTTPColorPixels,
} from "../../api/firmware/generated";
import { bluetoothManager } from "../bluetooth";

const bluetoothColorPixels = async (body: DisplayColorPixelsBody) => {
	const commandName = new URL(getDisplayColorPixelsUrl()).pathname;
	const stringifiedBody = JSON.stringify(body);

	await bluetoothManager.sendCommand(`${commandName};${stringifiedBody}`);
};

export const colorDisplayPixels = async (body: DisplayColorPixelsBody) => {
	if (bluetoothManager.getIsConnected()) {
		await bluetoothColorPixels(body);
	} else {
		await HTTPColorPixels(body);
	}
};
