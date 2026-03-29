const fetchGIF = async (query, pos) => {
    const response = await fetch(
        `https://g.tenor.com/v1/search?q=${query}&key=LIVDSRZULELA&limit=9&pos=${pos}`
    );
    const data = await response.json();
    return data;
};

export default fetchGIF