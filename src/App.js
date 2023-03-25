import jsonServerProvider from 'ra-data-json-server';
import { Admin, Resource } from 'react-admin';

import { UserCreate, UserEdit, UserList } from './users/Users';

const dataProvider = jsonServerProvider("http://localhost:4000");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
    />
  </Admin>
);

export default App;
