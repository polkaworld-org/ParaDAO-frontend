import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
 } from 'antd';
import AccountSelector from '@/components/AccountSelector';
import classes from './index.less';
import { useStores } from '@/store';
import ProjectSelector from '@/components/ProjectSelector';

const { TextArea } = Input;
const ProposalForm = ({ form, active, onResult }) => {
  const { project } = useStores();
  const [loading, setLoading] = useState(false);
  const formConfig = {
    member_join: () => (
      <>
        <Form.Item label="Investment Amount (DOT)">
          {
            form.getFieldDecorator('investment')(<Input/>)
          }
        </Form.Item>
        <Form.Item label="Energy Applide">
          {
            form.getFieldDecorator('energyApplied')(<Input/>)
          }
        </Form.Item>
        <Form.Item label="Mortgate Value (DOT)">
          {
            form.getFieldDecorator('mortgate')(<Input/>)
          }
        </Form.Item>
      </>
    ),
    member_invest_extra: () => (
      <>
        <Form.Item label="Investment Amount (DOT)">
          {
            form.getFieldDecorator('investment')(<Input/>)
          }
        </Form.Item>
        <Form.Item label="Energy Applide">
          {
            form.getFieldDecorator('energyApplied')(<Input/>)
          }
        </Form.Item>
        <Form.Item label="Mortgate Value (DOT)">
          {
            form.getFieldDecorator('mortgate')(<Input/>)
          }
        </Form.Item>
      </>
    ),
    memebr_exit: () => (
      <>
        <Form.Item label="Energy Exit">
          {
            form.getFieldDecorator('energyExit')(<Input/>)
          }
        </Form.Item>
        <Form.Item label="Mortgate Value (DOT)">
          {
            form.getFieldDecorator('mortgate')(<Input/>)
          }
        </Form.Item>
      </>
    ),
    project_submit: () => (
      <>
        <Form.Item label="Account">
          {
            form.getFieldDecorator('account')(<AccountSelector/>)
          }
        </Form.Item>
        <Form.Item label="Project Name">
          {
            form.getFieldDecorator('name')(<Input/>)
          }
        </Form.Item>
        <Form.Item label="Project Description">
          {
            form.getFieldDecorator('detail')(<TextArea/>)
          }
        </Form.Item>
        <Form.Item label="M1 Description">
          {
            form.getFieldDecorator('M1_description')(<TextArea/>)
          }
        </Form.Item>
        <Form.Item label="M1 Grant">
          {
            form.getFieldDecorator('milestone_1_requested')(<InputNumber className={classes.input}/>)
          }
        </Form.Item>
        <Form.Item label="M2 Description">
          {
            form.getFieldDecorator('M2_description')(<TextArea/>)
          }
        </Form.Item>
        <Form.Item label="M2 Grant">
          {
            form.getFieldDecorator('milestone_2_requested')(<InputNumber className={classes.input}/>)
          }
        </Form.Item>
        <Form.Item label="M3 Description">
          {
            form.getFieldDecorator('M3_description')(<TextArea/>)
          }
        </Form.Item>
        <Form.Item label="M3 Grant">
          {
            form.getFieldDecorator('milestone_3_requested')(<InputNumber className={classes.input}/>)
          }
        </Form.Item>
      </>
    ),
    project_delivery: () => (
      <>
        <Form.Item label="Account">
          {
            form.getFieldDecorator('account')(<AccountSelector/>)
          }
        </Form.Item>
        <Form.Item label="Project">
          {
            form.getFieldDecorator('project')(<ProjectSelector/>)
          }
        </Form.Item>
      </>
    ),
  };
  const onSubmit = () => {
    form.validateFields(async (error, values) => {
      if (error) return false;
      setLoading(true);
      try {
        switch (active) {
          case 'project_submit': {
            await project.submitProject({
              milestone_1_requested: values.milestone_1_requested,
              milestone_2_requested: values.milestone_2_requested,
              milestone_3_requested: values.milestone_3_requested,
              account: values.account,
              detail: `${values.name},${values.detail},${values.M1_description},${values.M2_description},,${values.M3_description}`,
            });
            break;
          }
          case 'project_delivery': {
            await project.forwardToMilestone({
              project: String(values.project),
              account: values.account,
            });
            break;
          }
          default: { break; }
        }
        setLoading(false);
        setTimeout(() => { onResult(true) }, 1000);
      } catch (e) {
        console.log(e);
        setLoading(false);
        setTimeout(() => { onResult(false) }, 1000);
      }
    });
  }
  return (
    <Row>
      <Col span={12}>
        <Form>
          {formConfig[active]()}
          <Form.Item>
            <Button loading={loading} size="large" type="primary" onClick={onSubmit}>SUBMIT</Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
};

export default Form.create()(ProposalForm)
