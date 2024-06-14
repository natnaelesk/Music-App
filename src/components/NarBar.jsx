import React from 'react';
import { Link } from 'react-router-dom';
import * as Styles from './Styles/NavBarStyles'; 
import sparkle from '../images/sparkle.png';

const NavBar = () => {
  return (
    <Styles.NavbarContainer>
      <Link to="/create">
        <Styles.Button>
          <Styles.SparkleIcon src={sparkle} alt="sparkle icon" /> Create Song
        </Styles.Button>
      </Link>
      <Link to="/">
        <Styles.HomeIcon>Home</Styles.HomeIcon> 
      </Link>
    </Styles.NavbarContainer>
  );
}

export default NavBar;
