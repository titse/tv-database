/* Header.js
 * show's today's tv show airing today
 * Author: Tiffany Tse
 * Created: July 15, 2018
 */
import React from 'react';
import {Link} from 'react-router-dom';
import {Nav} from './nav.js';
import logo from '../assets/tv-logo.svg';
import './header.css';

export class Header extends React.Component {
  render() {
    return(
      <header>
        <Link to={'/'}><h1><img src={logo} alt="TV Show logo" /> Moviee</h1></Link>
        <Nav />
      </header>
    );
  }
}
