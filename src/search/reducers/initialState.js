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
    favourites: {},
    showFavourites: false,
    cache: {}
}