import { Component } from 'react'
import fetchGIF from './components/API'
import './App.css'

const GifList = ({gifitems = []}) =>{
  return(
  <ul className='gallery'>
    {gifitems.map((item) => (
    <li key={item.id}>
    <img className='gifitem' src={item.media[0].gif.url} alt={item.id} />
    </li>
    ))}
    </ul>
  )
}

class App extends Component{
  state = {
    gifitems: [],
    query: '',
    CurrentPage: 1,
    isLoading: false,
    error: null
  };
  handleChange = (e) => { 
    this.setState({
      query: e.target.value,
      gifitems: [],
      CurrentPage: 1,
    });
  };
  handleSubmit = async () => {
    const {query} = this.state;
    if (!query) return;
    this.setState({ isLoading:true, error: null, CurrentPage: 1});

    try {
      const data = await fetchGIF(query, 0);
      this.setState({ gifitems: data.results });
    }  catch (error){
      this.setState({ error: "error fetching gif"});
    } finally {
      this.setState({ isLoading: false})
    }
  };
  handleLoad = async () => {
    const { query, CurrentPage } = this.state;
    const nextPage = CurrentPage + 1;
  
    this.setState({ isLoading: true });
  
    try {
      const newItems = await fetchGIF(query, nextPage);
  
      this.setState((prevState) => ({
        gifitems: [...prevState.gifitems, ...newItems.results],
        CurrentPage: nextPage
      }));
    } catch {
      this.setState({ error: 'error fetching img' });
    } finally {
      this.setState({ isLoading: false });
    }
  };
   render() {
    const {isLoading, error, query, gifitems} = this.state;
    return(
<div>
        <header className="searchbar">
          <form className="form" onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}>
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>

            <input
              className="input"
              type="text"
              autoComplete="off"
              value={query}
              onChange={this.handleChange}
              placeholder="Search gifs"
            />
          </form>
        </header>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
<GifList gifitems={gifitems} />
{gifitems.length > 0 && (
  <button className='Load' onClick={this.handleLoad}>Load more</button>
)}      </div>
    )
   }
 }

export default App
