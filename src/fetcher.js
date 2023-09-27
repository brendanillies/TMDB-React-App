function APIFetcher(url) {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
        }
    };

    return (
        fetch(url, options)
            .then(res => res.json())
    )
};

export { APIFetcher };