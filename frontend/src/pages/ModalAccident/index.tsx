import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { TileLayer, Marker, Map } from 'react-leaflet';
import axios from 'axios';
import { FiPower } from 'react-icons/fi';
import { RiAlertLine } from 'react-icons/ri';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { LeafletMouseEvent } from 'leaflet';
import api from '../../services/api';

import Food from '../../components/Food';
import ModalEditFood from '../../components/ModalEditFood';

import { useAuth } from '../../hooks/auth';

import { Container, Header, HeaderContent, Profile } from './styles';

import './styles.css';
import logoImg from '../../assets/srar-logo.png';

interface Item {
  id: number;
  title: string;
  image_url: string;
  type: string;
}

interface IBGEUFResponse {
  nome: string;
}

interface IFoodPlate {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

const CreatePoint: React.FC = () => {
  const user = localStorage.getItem('@App:user');

  const userName =
    user && JSON.parse(user) && JSON.parse(user).id
      ? JSON.parse(user).name
      : '';

  const userId =
    user && JSON.parse(user) && JSON.parse(user).id ? JSON.parse(user).id : '';

  const [modal, setModal] = useState(false);
  const [foods, setFoods] = useState<IFoodPlate[]>([]);
  const [editingFood, setEditingFood] = useState<IFoodPlate>({} as IFoodPlate);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const { signOut } = useAuth();

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    horario: '',
  });

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('/accident?limit=6&offset=0').then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/regioes',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.nome);

        setUfs(ufInitials);
      });
  }, []);

  const toggle = () => setModal(!modal);

  async function handleUpdateFood(
    food: Omit<IFoodPlate, 'id' | 'available'>,
  ): Promise<void> {
    const response = await api.put(`/foods/${editingFood.id}`, {
      ...food,
      id: editingFood.id,
      available: editingFood.available,
    });

    const foodListUpdated = foods.map(currentFood => {
      if (editingFood.id !== currentFood.id) {
        return currentFood;
      }
      return response.data;
    });

    setFoods(foodListUpdated);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFoodPlate): void {
    setEditingFood(food);
    toggleEditModal();
  }

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);

      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, type, horario } = formData;
    const uf = selectedUf;
    const [latitude, longitude] = selectedPosition;
    // const items = selectedItems;

    const data = new FormData();
    const coor_dinates = [];
    coor_dinates.push(Number(longitude));
    coor_dinates.push(Number(latitude));
    data.append('user_id', userId);
    data.append('type', type);
    data.append('date_hour', horario);
    data.append('region', uf);
    /*data.append("coordinates", coor_dinates);
    data.append("items", items.join(","));

    if (selectedFile) {
      data.append("image", selectedFile);
    }
    console.log(data);
*/
    console.log(String(latitude), Number(latitude));

    await api.post('accident', {
      date_hour: horario,
      coordinates: coor_dinates,
      region: uf,
      type: type,
      shift: new Date(horario).getHours() > 18 ? 'Noite' : 'Dia',
      user_id: userId,
    });

    alert('Acidente informado!');

    history.push('/');
  }

  async function handlePanicButton(event: FormEvent) {
    event.preventDefault();

    const [latitude, longitude] = [-122.5, 37.7]; //initialPosition;
    const now = new Date(new Date().valueOf() - 10800000);
    const hour = now.toISOString().split('T')[1].substring(0, 5);
    const todayDate = `${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()} ${hour}`;
    await api.post('panic_button', {
      date_hour: todayDate,
      coordinates: [latitude, longitude],
      user_id: userId,
    });
    alert('Alerta acionado!');
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="SRAR" />

          <Profile>
            <div>
              <span>Bem-vindo</span>
              <strong>{user && JSON.parse(user).name ? userName : ''}</strong>
            </div>
          </Profile>

          <button type="button" onClick={handlePanicButton}>
            <RiAlertLine />
          </button>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <div id="page-create-point">
        <header></header>

        <form onSubmit={handleSubmit}>
          <h1>Informe o acidente</h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Usuário</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="type">Type</label>
                <input
                  type="type"
                  name="type"
                  id="type"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="horario">Horário</label>
                <input
                  type="text"
                  name="horario"
                  id="horario"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>
            <div className="field-group">
              <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
              />

              <Map
                center={initialPosition}
                zoom={15}
                scrollWheelZoom={false}
                onClick={handleMapClick}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={selectedPosition} />
              </Map>
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="uf">Regiões</label>
                <select
                  name="uf"
                  id="uf"
                  value={selectedUf}
                  onChange={handleSelectUf}
                >
                  <option value="0">Selecione uma Região</option>
                  {ufs.map(uf => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Acidentes infomados:</h2>
              <span>Selecione um ou mais ítens abaixo</span>
            </legend>

            <ul className="items-grid">
              {items.map(item => (
                <li
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                >
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.type}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          <button type="submit">Informar acidente</button>
        </form>
      </div>
    </Container>
  );
};

export default CreatePoint;
