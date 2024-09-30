import axios from "axios";

// THE AXIOS INSTANCE WILL BE USED TO MAKE REQUESTS TO THE SERVER
const axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

axiosInstance.interceptors.request.use(
    async (config) => {
            config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWU4MTM0N2QyMjkyMTgyNGVhMjY3OGJiNzE1NTFmZiIsIm5iZiI6MTcyNzUyNTk4MC4yNDY0MTksInN1YiI6IjY2ZTJhMzVlMDAwMDAwMDAwMGI5MTIzYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NoyDnqPHn9CZYc8YPZfXU5T37bOYDkdycjRQ5swuVg8`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// GET POPULAR MOVIE FUNCTION
// UPCOMING SECTION
async function fetchHomeData() {

    try {
        const response1 = await axiosInstance.get('/trending/all/day');
        const response2 = await axiosInstance.get('/trending/movie/week');
        const response3 = await axiosInstance.get('/trending/tv/week');

        const rData1 = response1.data.results;
        const rData2 = response2.data.results;
        const rData3 = response3.data.results;

        if (response1.status == "200" && response2.status == "200" && response3.status == "200") {
            return [rData1, rData2, rData3];
        }

    } catch (error) {
        if (error.response) {
            console.log('Error response data:', error.response.data);
            
        } else if (error.request) {
            console.error('Error request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }
}

// MOVIE SECTION
async function fetchMoviesData() {

    try {
        const response1 = await axiosInstance.get('/movie/now_playing');
        const response2 = await axiosInstance.get('/movie/popular');
        const response3 = await axiosInstance.get('/movie/top_rated');

        const rData1 = response1.data.results;
        const rData2 = response2.data.results;
        const rData3 = response3.data.results;

        if (response1.status == "200") {
            return [rData1, rData2, rData3];
        }

    } catch (error) {
        if (error.response) {
            console.log('Error response data:', error.response.data);
            
        } else if (error.request) {
            console.error('Error request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }
}

// TV SHOWS SECTION
async function fetchTvShowsData() {

    try {
        const response1 = await axiosInstance.get('/tv/top_rated');
        const response2 = await axiosInstance.get('/tv/on_the_air');
        const response3 = await axiosInstance.get('/tv/popular');

        const rData1 = response1.data.results;
        const rData2 = response2.data.results;
        const rData3 = response3.data.results;

        if (response1.status == "200" && response2.status == "200" && response3.status == "200") {
            return [rData1, rData2, rData3];
        }

    } catch (error) {
        if (error.response) {
            console.log('Error response data:', error.response.data);
            
        } else if (error.request) {
            console.error('Error request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }
}

// UPCOMING SECTION
async function fetchUpcomingData() {

    try {
        const response1 = await axiosInstance.get('/trending/all/day');
        const response2 = await axiosInstance.get('/movie/upcoming' ,{
            params: {
                page: 3
            }
        });
        const response3 = await axiosInstance.get('/tv/airing_today');

        const rData1 = response1.data.results;
        const rData2 = response2.data.results;
        const rData3 = response3.data.results;

        if (response1.status == "200" && response2.status == "200" && response3.status == "200") {
            return [rData1, rData2, rData3];
        }

    } catch (error) {
        if (error.response) {
            console.log('Error response data:', error.response.data);
            
        } else if (error.request) {
            console.error('Error request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }
}

// GET MOVIE & SERIES BY NAME FUNCTION
async function getByName(name) {
    try {
        const response = await axiosInstance.get(`/search/multi`, {
            params: {
                query: name
            }
        });
        const rData = response.data.results;
        if (response.status == "200") {
            return rData;
        }

    } catch (error) {
        if (error.response) {
            console.log('Error response data:', error.response.data);
            
        } else if (error.request) {
            console.error('Error request data:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
    }
}

export { fetchHomeData , getByName, fetchMoviesData, fetchTvShowsData, fetchUpcomingData };