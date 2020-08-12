import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Select } from '../../components/Select';

import api from '../../services/api';

import { icons } from '../../assets/images/icons';

import './styles.css';

export const TeacherForm: React.FC = () => {
  const history = useHistory();

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  const [state, setState] = useState({
    name: '',
    avatar: '',
    whatsapp: '',
    bio: '',
    subject: '',
    cost: Number(''),
  });

  const addNewScheduleItem = (): void => {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  };

  const setScheduleItemValue = (
    position: number,
    field: string,
    value: string,
  ): void => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  };

  const handleOnChange = (e: React.ChangeEvent<any>): void => {
    const { id, value } = e.target;

    setState({
      ...state,
      [id]: value,
    });
  };

  const handleOnSubmitForm = (e: FormEvent): void => {
    e.preventDefault();

    api
      .post('classes', { ...state, schedule: scheduleItems })
      .then(() => {
        alert('Cadastro realizado com sucesso!');
        setTimeout(() => {
          history.push('/');
        }, 2000);
      })
      .catch(() => {
        alert('Erro ao cadastrar');
      });
  };

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={(e) => handleOnSubmitForm(e)}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={state.name}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={state.avatar}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={state.whatsapp}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={state.bio}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Física', label: 'Física' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'História', label: 'História' },
                { value: 'Química', label: 'Química' },
              ]}
              value={state.subject}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={state.cost === 0 ? '' : state.cost}
              onChange={(e) => {
                handleOnChange(e);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis{' '}
              <button type="button" onClick={() => addNewScheduleItem()}>
                + Novo horário
              </button>{' '}
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={index} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'week_day', e.target.value)
                    }
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
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={icons.warning} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};
