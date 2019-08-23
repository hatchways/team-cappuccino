import React from 'react';
import Lists from '../components/list/lists';
import CreateList from '../components/list/list-actions/add-list';

const ListsPage = () => (
    <div>
        <Lists />
        <CreateList />
    </div>
)

export default ListsPage;