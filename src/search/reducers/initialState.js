export default {
    selectedCity: '',
    searchTerm: '',
    loader: false,
    error: {
        hasError: false,
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
    favourites: {}, // stores ifsc code as keys with true / false as value
    showFavourites: false,
    cache: {}
}