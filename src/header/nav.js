/* Nav.js
 * show's today's tv show airing today
 * Author: Tiffany Tse
 * Created: July 15, 2018
 */

import React from 'react';

export class Nav extends React.Component {
  render() {
    return(
      <nav>
        <ul className="navbar">
          <li><a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">API: The Movie Database</a></li>
        </ul>
      </nav>
    );
  }
}
