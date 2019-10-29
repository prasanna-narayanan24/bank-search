import { makeUrl, makeParams, apiCall } from "../utils/api_utils"


export default class BankAPI {
    static fetchBanks = (params, onSuccess, onFailure) => {
        let url = makeUrl("bankss");
        const data = makeParams(params);
        apiCall({url, data}, onSuccess, onFailure);
    }
}