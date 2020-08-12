import React from 'react';

import api from '../../services/api';

import { icons } from '../../assets/images/icons';

import './styles.css';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}
interface TeacherItemProps {
  teacher: Teacher;
}

export const TeacherItem: React.FC<TeacherItemProps> = ({
  teacher: { id, avatar, bio, cost, name, subject, whatsapp },
}: TeacherItemProps) => {
  const createNewConnection = (): void => {
    api.post('connections', { user_id: id });
  };
  return (
    <article className="teacher-item">
      <header>
        <img src={avatar} alt={name} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {cost}</strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://wa.me/${whatsapp}`}
          onClick={() => createNewConnection()}
        >
          <img src={icons.whatsapp} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};
