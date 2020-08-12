import React, { useState, FormEvent } from 'react';

import { PageHeader } from '../../components/PageHeader';
import { TeacherItem, Teacher } from '../../components/TeacherItem';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';

import './styles.css';
import api from '../../services/api';

export const TeacherList: React.FC = () => {
  const [state, setState] = useState({ subject: '', week_day: '', time: '' });
  const [teachers, setTeachers] = useState([]);

  const handleOnChange = (e: React.ChangeEvent<any>): void => {
    const { id, value } = e.target;

    setState({
      ...state,
      [id]: value,
    });
  };

  const handleOnSubmitForm = async (e: FormEvent): Promise<any> => {
    e.preventDefault();

    const res = await api.get('classes', { params: { ...state } });

    setTeachers(res.data);
  };

  const disableButton = (): boolean => {
    return !(state.subject && state.time && state.week_day);
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={(e) => handleOnSubmitForm(e)}>
          <Select
            name="subject"
            label="Matéria"
            value={state.subject}
            onChange={(e) => {
              handleOnChange(e);
            }}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Física', label: 'Física' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'História', label: 'História' },
              { value: 'Química', label: 'Química' },
              { value: 'Português', label: 'Português' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={state.week_day}
            onChange={(e) => {
              handleOnChange(e);
            }}
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-feira' },
              { value: '2', label: 'Terça-feira' },
              { value: '3', label: 'Quarta-feira' },
              { value: '4', label: 'Quinta-feira' },
              { value: '5', label: 'Sexta-feira' },
              { value: '6', label: 'Sábado' },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={state.time}
            onChange={(e) => {
              handleOnChange(e);
            }}
          />

          <button type="submit" disabled={disableButton()}>
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};
