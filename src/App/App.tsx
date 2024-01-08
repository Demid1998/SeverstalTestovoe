import React, { useState} from 'react';
import type { User } from '../type/User';
import ExpandableRow from '../features/ExpandleRow';
import tableData from '../data/data';
import './App.css';

function App(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('Сортировка по');

  const sortedAndFilteredData = tableData
    .filter((row: User) => row.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a: User, b: User) => {
      if (sortOrder === 'asc') {
        return (
          parseFloat(b.balance.replace(/[$,]/g, '')) - parseFloat(a.balance.replace(/[$,]/g, ''))
        );
      }
      if (sortOrder === 'desc') {
        return (
          parseFloat(a.balance.replace(/[$,]/g, '')) - parseFloat(b.balance.replace(/[$,]/g, ''))
        );
      }
      return 0;
    });

  return (
    <div className='content'>
      <div className='flex justify-center pb-8 '>
        <input
          className='pl-2 mr-8 rounded text-black'
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Поиск по имени'
        />
        <div className='text-black'>
          <select
            className='rounded'
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option disabled>Сортировка по</option>
            <option value='desc'>По возрастанию</option>
            <option value='asc'>По убыванию</option>
          </select>
        </div>
      </div>
      <div className='flex justify-center items-stretch'>
        <table className='w-full'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Email</th>
              <th>Баланс</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredData.length > 0 ? (
              sortedAndFilteredData.map((row) => (
                <ExpandableRow key={row.id} row={row} nestedData={row.nestedData} />
              ))
            ) : (
              <tr>
                <td className='text-center' colSpan={5}>
                  Не найдено!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
