import React from 'react';
import {
  Card, Statistic, Row, Col,
} from 'antd';

export default ({
  totalEngergy, totalDot, totalProjects, totalMembers,
}) => (
  <Card title="DASHBOARD">
    <Row>
      <Col span={6}>
        <Statistic
          title="TOTAL ENGERGY"
          value={totalEngergy}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="TOTAL DOT"
          value={totalDot}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="TOTAL PROJECTS"
          value={totalProjects}
        />
      </Col>
      <Col span={6}>
        <Statistic
          title="TOTAL MEMBERS"
          value={totalMembers}
        />
      </Col>
    </Row>
  </Card>
);

