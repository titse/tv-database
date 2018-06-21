/* Latest TV Show.js
 * show's today's tv show airing today
 * Author: Tiffany Tse
 * Created: June 19, 2018
 */
import React from 'react';
import {API_KEY} from './store/api-key';
import {Link} from 'react-router-dom';

export class NewMovies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tvShows: []
    }
  }

  componentDidMount() {
    const key = API_KEY;

    // Get a date range between today and one month ago to dynamically update the link for the request
    let todayDate = new Date();
    let today = todayDate.getFullYear() + '-' + (todayDate.getMonth() + 1) + '-' + todayDate.getDate();
    let oneMonthAgo = (todayDate.getMonth() === 0 ? todayDate.getFullYear() - 1 : todayDate.getFullYear()) + '-' + (todayDate.getMonth() === 0 ? todayDate.getMonth() + 12 : todayDate.getMonth()) + '-' + todayDate.getDate();

    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&first_air_date.gte=${oneMonthAgo}&first_air_date.lte=${today}`)
      .then(response => {
        if (response.status !== 200) {
          console.log('Error: ' + response.status);
          return;
        }

        response.json().then(data => {
          const tvShows = data.results;
          this.setState({ tvShows });
        });

      })
      .catch(err => {
        console.log('Fetch Error :-S', err);
      })
  }

  render() {
    return(
      <section>
        <h2>New releases</h2>
        <div className="newTvShows">
          {this.state.tvShows.map((movie, index) => {
            return (
              <Link to={`/movie/${this.state.tvShows[index].id}`} key={index} className="tvLink">
                <img src={this.state.tvShows[index].poster_path === null ? 'http://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300/${this.state.tvShows[index].poster_path}`} alt={`${this.state.tvShows.title} poster`} className="imgResponsive" />

                <div className="tvInfo">
                  <h3>{this.state.tvShows[index].original_name}</h3>
                  <p>{this.state.tvShows[index].first_air_date}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    );
  }
}