import React, { useRef, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Timeline,
  Tag,
} from 'antd';
import { observer } from 'mobx-react';
import { withRouter } from 'umi'
import { hexToString } from '@polkadot/util';
import { useStores } from '@/store';
import classes from './index.less';

const noop = () => {};

const Energy = function ({
  m1Requested = 0, m2Requested = 0, m3Requested = 0, title = 'Engrgy applied:',
}) {
  const $canvas = useRef(null);
  const total = m1Requested + m2Requested + m3Requested;
  useEffect(() => {
    if (!$canvas.current) return noop;
    // set canvas size;
    const width = $canvas.current.clientWidth;
    const height = $canvas.current.clientHeight;
    $canvas.current.width = width;
    $canvas.current.height = height;
    const ctx = $canvas.current.getContext('2d');
    ctx.strokeStyle = '#000';
    const path = [
      [[20, 15], [120, 15]],
      [[20, 45], [120, 45]],
      [[20, 75], [120, 75]],
      [[20, 15], [20, 75]],
      [[0, 45], [20, 45]],
    ];
    path.forEach(item => {
      ctx.moveTo(item[0][0], item[0][1]);
      ctx.lineTo(item[1][0], item[1][1]);
    })
    ctx.stroke();
    return noop;
  }, [$canvas, m1Requested, m2Requested, m3Requested]);
  return (
    <Row type="flex" align="middle" className={classes.engergy}>
      <p>{title} {total}</p>
      <canvas ref={$canvas} className={classes.canvas}/>
      <div className={classes.detail}>
        <p className={classes.item}>M1: {m1Requested}</p>
        <p className={classes.item}>M2: {m2Requested}</p>
        <p className={classes.item}>M3: {m3Requested}</p>
      </div>
    </Row>
  );
};

const VotedChart = observer(({
  yesVotes,
  noVotes,
  status,
  stageDidPass,
}) => {
  const $canvas = useRef(null);
  const { member } = useStores();
  useEffect(() => {
    member.ensureMembers();
    return noop;
  }, []);
  let rate = Number((yesVotes / member.totalEnergy).toFixed(2));
  if (yesVotes === 0) {
    rate = 0;
  }
  const STATUS_MAP = {
    Initialization: 0,
    Milestone1: 1,
    Milestone2: 2,
    Milestone3: 3,
  }
  const statusValue = STATUS_MAP[status];
  useEffect(() => {
    if (!$canvas.current) return noop;
    const height = $canvas.current.clientHeight;
    const width = $canvas.current.clientWidth;
    const ctx = $canvas.current.getContext('2d');
    $canvas.current.width = width;
    $canvas.current.height = height;
    const paths = [
      ['red', 60, 50, 40, 2 * Math.PI, 0],
      ['green', 60, 50, 40, -0.5 * Math.PI, (2 * rate - 0.5) * Math.PI],
    ];
    paths.forEach(item => {
      ctx.save();
      /* eslint-disable-next-line */
      ctx.strokeStyle = item[0];
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(item[1], item[2], item[3], item[4], item[5]);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    });
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${rate * 100}%`, 60, 45);
    ctx.fillText('Passed', 60, 65);
    ctx.save();
    ctx.beginPath();
    const yPosition = statusValue * 31 + 5;
    ctx.moveTo(120, yPosition);
    ctx.lineTo(170, yPosition);
    ctx.moveTo(160, yPosition + 4);
    ctx.lineTo(170, yPosition);
    ctx.moveTo(160, yPosition - 4);
    ctx.lineTo(170, yPosition);
    ctx.stroke()
    ctx.closePath();
    ctx.restore();
    return noop;
  }, [$canvas, yesVotes, noVotes, member.totalEnergy])
  const getColor = function (current, target) {
    if (target < current) {
      return 'green';
    }
    if (target === current) {
      return 'blue';
    }
    return 'gray';
  }
  return (
    <Row type="flex" className={classes.milestion}>
      <div className={classes.chart}>
        <canvas ref={$canvas} style={{ width: '100%', height: '100%' }}/>
      </div>
      <Col className={classes.detail}>
        <Timeline>
          <Timeline.Item color={getColor(statusValue, 0)}>Initialization #0</Timeline.Item>
          <Timeline.Item color={getColor(statusValue, 1)}>Milestion #1</Timeline.Item>
          <Timeline.Item color={getColor(statusValue, 2)}>Milestion #2</Timeline.Item>
          <Timeline.Item color={getColor(statusValue, 3)}>Milestion #3</Timeline.Item>
        </Timeline>
      </Col>
    </Row>
  );
});

export default withRouter(({ data, index, history }) => {
  const detail = hexToString(data.detail.toString()).split(',');
  const name = detail[0];
  const description = detail[1];
  const m1Requested = data.milestone_1_requested.toNumber();
  const m2Requested = data.milestone_2_requested.toNumber();
  const m3Requested = data.milestone_3_requested.toNumber();
  const yesVotes = data.yes_votes.toNumber();
  const noVotes = data.no_votes.toNumber();
  const status = data.status.toString();
  const toDetail = () => {
    history.push(`/proposals/${index}`);
  }
  const isVoting = data.processed.isFalse;
  const stageDidPass = data.stage_did_pass.isTrue;
  let [extraColor, extraText] = ['', ''];
  if (isVoting) {
    extraColor = 'blue';
    extraText = 'Voting';
  } else if (stageDidPass) {
    extraColor = 'green';
    extraText = 'Passed';
  } else {
    extraColor = 'red';
    extraText = 'Failed';
  }
  const extra = <Tag color={extraColor}>{extraText}</Tag>
  return (
    <Card title={name} onClick={toDetail} className={classes.project_root} extra={extra}>
      <p>{description}</p>
      <Energy m1Requested={m1Requested} m2Requested={m2Requested} m3Requested={m3Requested}/>
      <VotedChart {...{
        yesVotes,
        noVotes,
        status,
        stageDidPass,
      }}/>
    </Card>
  )
});

export { Energy, VotedChart }
