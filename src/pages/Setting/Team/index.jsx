import React, { useState, useEffect } from 'react';
import {  Icon, Dialog, Message } from '@alifd/next';
import { injectIntl } from 'react-intl';
import CustomTable from '@/components/CustomTable';
import styles from './index.module.scss';


function TeamTest(props) {
  const { intl: { formatMessage } } = props;
  const [dataSource, setData] = useState([]);
  const [editVisable, setEditVisable] = useState(false);
  const [value, setValue] = useState({});
  const [userVisable, setUserVisable] = useState(false);
  const [userValue, setUserValue] = useState({});
  const fetchData = async () => {
    const result = [{'name':'test'}];
    setData(result);
  };
    
  useEffect(
    () => {
          
      fetchData();
    },
    []
  );


  function handleAddUser(record) {
    setUserVisable(!userVisable);
    setUserValue(record);
  }
  function handleEdit(record) {
    setEditVisable(true);
    setValue(record);
  }
  function handleDelete(record) {
    Dialog.confirm({
      title: 'Delete Team',
      content: `confirm delete this team: ${record.name}?`,
      onOk: () => deleteTeam(record.name),
    });

  }

  function deleteTeam(name) {
    
  }


  function renderOper(value, index, record) {
    return (
      <div style={styles.oper}>
        <span
          title="AddUser"
          className={styles.operBtn}
        >
          <Icon size="xs" type="account" onClick={() => { handleAddUser(record); }} />
        </span>

        <span className={styles.separator} />
        <span title="Edit" className={styles.operBtn} >
          <Icon size="xs" type="edit" onClick={() => { handleEdit(record); }} />
        </span>
        <span className={styles.separator} />
        <span title="Delete" className={styles.operBtn} >
          <Icon size="xs" type="close" onClick={() => { handleDelete(record); }} />
        </span>

      </div>
    );
  };

  function addNewTeam() {
    setEditVisable(!editVisable);
    setValue({});
  }
  const formConfig = [
    {
      label: 'Filter',
      component: 'Input',
      componentProps: {
        placeholder: '请输入',
        size:'small',
        className:styles.fromInput,
      },
      formBinderProps: {
        name: 'name',
        required: false,
        message: '请输入',
               
      },
    },
    {
      label: <Icon type="add">New Team</Icon>,
      component: 'Button',
      componentProps: {
        className:styles.addbtn,
        type:'secondary',
        onClick:addNewTeam,
      },
    },
  ];
  const getTableColumns = () => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        lock: true,
      },
      {
        title: 'Operation',
        key: 'Operation',
        cell: renderOper,
      },

    ];
  };

  const defaultSearchQuery = {
    name: '',
  };

  function teamManager() {
    return (
      <div>
        <CustomTable
          columns={getTableColumns()}
          dataSource={dataSource.slice()}
          searchQueryHistory={defaultSearchQuery}
          formConfig={formConfig}
          hasButton={false}
        />
      </div>
    );
  }

  function changeView() {
    setUserVisable(false);
  }

  function changeEditView() {
    setEditVisable(!editVisable);
  }

  function addUserView() {
    return (
      <div />
    );
  }

  return (
    <div>
      {userVisable ? addUserView() : teamManager()}
    </div>

  );
}

export default injectIntl(TeamTest);