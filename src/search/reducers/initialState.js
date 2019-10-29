export default {
    selectedCity: '',
    searchTerm: '',
    loader: false,
    error: {
        hasError: false,
        errorCode: null,
        message: ''
    },
    banks: [],
    displayingBanks: [],
    availableCities: [
        "Bangalore",
        "Mumbai",
        "Coimbatore",
        "Pune",
        "Delhi",
    ],
    favourites: {}, // hash that stores ifsc code as keys with true / false as value
    showFavourites: false,
    /** 
     * cache is a hash that temporarily caches the results of a selected city.
     * next time when the same city is requested, the results are fetched from this cache object
     * instead of making an api request. 
     */
    cache: {}
}