import React from 'react';
import { Link } from 'react-router-dom';

import { images } from '../../assets/images';
import { icons } from '../../assets/images/icons';

import './styles.css';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  children,
}: PageHeaderProps) => {
  return (
    <header id="page-header" className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={icons.back} alt="Voltar" />
        </Link>
        <img src={images.logo} alt="Proffy" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}

        {children}
      </div>
    </header>
  );
};
