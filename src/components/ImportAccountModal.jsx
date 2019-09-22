import React from 'react';
import { Modal, Form, Input } from 'antd';

const { TextArea } = Input;

const ImportAccountModal = ({
  visible,
  form,
  onCancel,
  onOk,
}) => {
  const innerOnOk = () => {
    form.validateFields((error, values) => {
      if (error) return false;
      onOk(values.map(item => item.trim()));
      return true;
    })
  }
  return (
    <Modal title="Import Account" visible={visible} onCancel={onCancel} onOk={innerOnOk}>
      <Form>
        <Form.Item label="Name">
          {
            form.getFieldDecorator('name')(<Input/>)
          }
        </Form.Item>
        <Form.Item label="Mnemonic">
          {
            form.getFieldDecorator('mnemonic')(<TextArea/>)
          }
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default Form.create()(ImportAccountModal)
