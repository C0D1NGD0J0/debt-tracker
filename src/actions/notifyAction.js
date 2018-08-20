import { NOTIFY_USER } from "./types";

const notifyUser = (message, messageType) =>{
	return {
		type: NOTIFY_USER,
		payload: {message, messageType}
	}
}

export default notifyUser;