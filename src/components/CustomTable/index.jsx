import React, { useState, useEffect,useRef } from 'react';
import cloneDeep from 'lodash.clonedeep';
import PropTypes from 'prop-types';
import { Table, Pagination } from '@alifd/next';
import IceContainer from '@icedesign/container/lib/IceContainer';
import SearchFilter from './SearchFilter';
import styles from './index.module.scss';

export default function CustomTable(props) {
  const { enableFilter, columns, formConfig,hasButton } = props;
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState(cloneDeep(props.searchQueryHistory));
  const [pageIndex, setPageIndex] = useState(1);
  const [dataSource, setData] = useState(cloneDeep(props.dataSource));
  const [pageList, setPageList] = useState([5, 10, 50, 100, 150]);
  const prevCountRef = useRef(props);

  useEffect(() => { 
    const fetchDataSource = async () => {
        await setData(props.dataSource);
        await setLoading(false);
    };
    prevCountRef.current = props;
    fetchDataSource();   
  }, [props, props.dataSource]);


  const filterData = (query) =>{
    let newArray = [];
     newArray = cloneDeep(props.dataSource);
     Object.keys(query).forEach(v=>{      
       if(query[v]!==''){
          newArray = newArray.filter(data=>{
             return  data[v].toLocaleLowerCase().search(query[v].toLocaleLowerCase())!==-1;
           });
        }else if(newArray.length<=0){
                newArray = props.dataSource;
            }  
     });
     setData(newArray);
  };

  const onSearchSubmit = async (query) => {
    await setSearchQuery(query);
    await setPageIndex(1);
    filterData(query);
  };

  const onSearchReset = () => {
    setSearchQuery(cloneDeep(props.searchQueryHistory));
  };


  const formChange = async (query) => {
     if(!hasButton){
        await setSearchQuery(query);
        await setPageIndex(1);
        filterData(query);
      }    
  };


  const onPaginationChange = async (currentPageIndex) => {
    await setPageIndex(currentPageIndex);
  };

  const handlePageSizeChange = async (page)=>{
        await setPageSize(page);
  };

 
  
  
 
  const newArray = dataSource.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);

  return (
    <div>
      {enableFilter && (
        <IceContainer className={styles.filterContain}>
        <SearchFilter
          formConfig={formConfig}
          value={searchQuery}
          onSubmit={onSearchSubmit}
          onReset={onSearchReset}
          hasButton={hasButton}
          onChange={formChange}
        />
        </IceContainer>
        
      )}
       <IceContainer className={styles.iceContainer}>
       <div className={styles.spaces}/>
       <Table dataSource={newArray} hasBorder={false} loading={loading}>
        {columns.map((item) => {
          return (
            <Table.Column
              title={item.title}
              dataIndex={item.dataIndex}
              key={item.key}
              sortable={item.sortable || false}
              cell={item.cell}
              width={item.width || 'auto'}
              lock={item.lock}
            />
          );
        })}
      </Table>
      <Pagination
        className={styles.pagination}
        current={pageIndex}
        pageSize={pageSize}
        total={dataSource.length}
        onChange={onPaginationChange}
        totalRender={total => `Total: ${dataSource.length}`}
        pageSizeSelector="filter"
        pageSizePosition="end"
        pageSizeList={pageList}
        onPageSizeChange={handlePageSizeChange}
      />
       </IceContainer>
     
    
    </div>
  );
}

CustomTable.propTypes = {
  enableFilter: PropTypes.bool,
  searchQueryHistory: PropTypes.object,
  dataSource: PropTypes.array,
  hasButton:PropTypes.bool,
};

CustomTable.defaultProps = {
  enableFilter: true,
  searchQueryHistory: null,
  dataSource: [],
  hasButton:true,
};
