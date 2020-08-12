import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../assets/images';
import { icons } from '../../assets/images/icons';

import './styles.css';
import axios from '../../services/api';

export const Landing: React.FC = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    axios.get('connections').then((res) => {
      const { total } = res.data;
      setTotalConnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={images.logo} alt="Proffy" />
          <h2>Sua plataforma de estudos on-line</h2>
        </div>

        <img
          src={images.landing}
          alt="Plataforma de estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={icons.study} alt="Estudar" />
            Estudar
          </Link>

          <Link to="/give-classes" className="give-classes">
            <img src={icons.giveClasses} alt="Dar aulas" />
            Dar aulas
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas{' '}
          <img src={icons.purpleHeart} alt="Coração roxo" />
        </span>
      </div>
    </div>
  );
};
