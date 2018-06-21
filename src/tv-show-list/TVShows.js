/* TVShow.js
 * show tv details
 * Author: Tiffany Tse
 * Created: June 19, 2018
 */
//import depencdies and modules 
import React from 'react';
import {API_KEY} from './store/api-key';

var LatestTvShows = class  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tvShows: {
        genres: [],
        credits: {
          cast: [],
          crew: []
        }
      }
    }
    this.getData = this.getData.bind(this);
  }

  getData() {
    const key = API_KEY;
    const id = window.location.pathname.substring(7);

    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${key}&language=en-US&append_to_response=credits`)
      .then(response => {
        if (response.status !== 200) {
          console.log('Error: ' + response.status);
          return;
        }

        response.json().then(data => {
          const tvShows = data;
          this.setState({ tvShows });
        });

      })
      .catch(err => {
        console.log('Fetch Error :-S', err);
      })
  }

  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.tvShows !== this.state.tvShows) {
      this.getData();
    }
  }

  render() {
    return(
      <div className="container">
        <Header />
        <Form id="form" />

        <div className="tvShowsPage">
          <div className="poster">
            <img src={this.state.tvShows.poster_path === null ? 'http://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300${this.state.tvShows.poster_path}`} alt={`${this.state.tvShows.title} poster`} className="posterImg" />
          </div>

          <section className="tvShowsDetails">
            <h2 className="sectionTitle">{this.state.tvShows.name}</h2>
            <ul className="detailsList">
              <li><span className="bold">Release date:</span> {this.state.tvShows.last_air_date}</li>
              <li><span className="bold">Rating:</span> {this.state.tvShows.popularity}</li>
              <li><span className="bold">Vote count:</span> {this.state.tvShows.vote_count}</li>
              <li><span className="bold">Genres: </span> {this.state.tvShows.genres.map((element, index) => {
                  if (index < this.state.tvShows.genres.length - 1) {
                    return this.state.tvShows.genres[index].name + ', '
                  } else {
                    return this.state.tvShows.genres[index].name
                  }
                })}
              </li>
            </ul>

            <p>{this.state.tvShows.overview}</p>
          </section>
        </div>{/* Latest TV Shows Airing today */}

        <Cast cast={this.state.tvShows.credits.cast} />
      </div>
    );
  }
};
export { LastestTVShow };