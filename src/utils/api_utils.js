/** Wrapper for api requests */

import $ from 'jquery';

export const makeParams = params => $.param(params)

export const makeUrl = url => {
    const base_url = "https://vast-shore-74260.herokuapp.com";
    if(!url.startsWith("/")) {
        url = `/${url}`;
    }

    return base_url + url;
}

/** ajax call to the given url  */
export const apiCall = (settings, onSuccess = null, onFailure = null) => {
    $.ajax(settings)
    .done(data => onSuccess != null ? onSuccess(data) : console.log('fetch success'))
    .fail(e => onFailure != null ? onFailure(e) : console.error('fetch failed'))
}
