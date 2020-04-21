import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from '@alifd/next';
import CustomForm from '../CustomForm';
import styles from './index.module.scss';

export default function SearchFilter(props) {
  const { formConfig, value, onChange, onReset, hasButton } = props;

  /**
   * 提交回调函数
   */
  const handleSubmit = (errors, formValue) => {
    if (errors) {
      console.log({ errors });
      return;
    }

    props.onSubmit(formValue);
  };




  return (
    <CustomForm
      config={formConfig}
      value={value}
      formChange={onChange}
      handleSubmit={handleSubmit}
      handleReset={onReset}
     // extraContent={renderExtraContent()}
     hasButton={hasButton || false}
    />
  );
}

SearchFilter.propTypes = {
  formConfig: PropTypes.array.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};

SearchFilter.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  onReset: () => {},
};
