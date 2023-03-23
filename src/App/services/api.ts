import axios from 'axios';
import { env_var } from "../config/env";

import { removeTokens } from "./localStorage";
import { getHeaderInfo, getFormDataHeader } from "../helpers/tokenCreator";




const handleResponse = (response: any) => {

    if (response.status === 401) {
        removeTokens();
    
        window.location.reload();
    }
    if (response.data.status !== 'OK') {
        return response.data;
    }
    return response;
}

export const post = async function (url: string, body: any) {
    let header = await getHeaderInfo();
    try {
        let resp = await axios.post(env_var.BASE_URL + url, body, header);
        return handleResponse(resp);
    } catch (err:any) {
        return handleResponse(err.response)
    }
};

export const get = async function (url: any, params: any = {}) {
    let header = await getHeaderInfo();
    try {
        let resp = await axios.get(url, { ...header, params });
        return handleResponse(resp);
    } catch (err:any) {
        throw handleResponse(err.response)
    }
};

export const put = async function (body: any, url: any) {
    let header = await getHeaderInfo();

    try {
        let resp = await axios.put(env_var.BASE_URL + url, body, header);

        return handleResponse(resp);
    } catch (err:any) {
        throw handleResponse(err.response)
    }
};

export const deleteApi = async function (url: any) {
    let header = await getHeaderInfo();

    try {
        let resp = await axios.delete(env_var.BASE_URL + url, header);

        return handleResponse(resp);
    } catch (err:any) {
        throw handleResponse(err.response)
    }
};

export const postImage = async function (url: string, body: any) {

    let header = await getFormDataHeader();
    var formData = new FormData();
    formData.append('file', body);
    try {
        let resp = await axios.put(env_var.BASE_URL + url, formData, header);
        return handleResponse(resp);
    } catch (err:any) {
        throw handleResponse(err.response)
    }

};