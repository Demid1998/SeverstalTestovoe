import React, { useState } from 'react';
import type { User } from '../type/User';

function ExpandableRow({ row, nestedData }: { row: User; nestedData: User[] }): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <tr>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.balance}</td>
        <td>
          <button className='' type='button' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Закрыть' : 'Открыть'} дочерние элементы
          </button>
        </td>
      </tr>
      {isOpen &&
        (nestedData.length ? (
          <tr>
            <td colSpan={5}>
              <table>
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Баланс</th>
                    <th>Активность</th>
                  </tr>
                  {nestedData.map((nestedRow) => (
                    <tr key={nestedRow.id}>
                      <td>{nestedRow.id}</td>
                      <td>{nestedRow.name}</td>
                      <td>{nestedRow.email}</td>
                      <td>{nestedRow.balance}</td>
                      <td>{nestedRow.isActive ? 'Активен' : 'Неактивен'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        ) : (
          <tr>
            <td className='text-center' colSpan={5}>
              Нет дочерних элементов
            </td>
          </tr>
        ))}
    </>
  );
}

export default ExpandableRow;
