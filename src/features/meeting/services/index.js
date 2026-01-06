import AxiosInstance from "../../../configs/axios";
import { CREATE_ROOM_API } from "../apis";

export const createRoomService = async (data = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosInstance(CREATE_ROOM_API(data));
            resolve(response.data.roomId);
        } catch (error) {
            console.error("Error creating room:", error);
            reject(error);
        }
    });
};
