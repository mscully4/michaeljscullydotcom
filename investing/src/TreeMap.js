import React from 'react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { interpolateRdYlGn } from 'd3-scale-chromatic'
import { dateFormatter, percentageFormatter, dollarFormatter } from './utils.js';
import { MEASURE_DOLLARS, MEASURE_PERCENT } from './constants.js'
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const measure_percent = 'percent'
const measure_dollars = 'dollars'

const styles = {
  container: {
    position: 'absolute',
    marginLeft: '7.5%'
  },
  toolTip: {
    padding: "5px 10px",
    backgroundColor: "#fff",
    border: 'solid 2px #ccc',
    boxShadow: '0 0 3px #ccc'
  }
};

class CustomizedContent extends React.PureComponent {
  render() {
    const { depth, x, y, width, height, max, min, valueField, symbol } = this.props;

    var v;
    // console.log(this.props)
    if (this.props[valueField] > 0) {
      v = ((this.props[valueField] / max) * .5) + .5
    } else {
      v = .5 - ((this.props[valueField] / min) * .5)
    }

    const color = interpolateRdYlGn(v)
    const fontColor = Math.abs(v - .5) < .2 ? "#000" : "#fff"

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: color,
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill={fontColor} fontSize={14}>
          {symbol}
        </text>
      </g>
    );
  }
}

class TreeMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: true
    }
  }

  renderCustomLabel = (section) => {
    return (
      <text x={section.x} y={section.y} textAnchor={section.x > section.cx ? 'start' : 'end'} dominantBaseline="central">
        {section.Symbol}
      </text>
    )
  }

  CustomTooltip = (props) => {
    if (props.active && props.payload && props.payload.length) {
      console.log(props.payload[0].payload)
      if (this.props.measure === MEASURE_PERCENT) {
        return (
          <div style={styles.toolTip}>
            <p>{props.payload[0].payload.symbol}</p>
            <p>{props.payload[0].payload.name}</p>
            <p>Shares Owned: {props.payload[0].payload.quantity.toFixed(3)}</p>
            <p>Percent Gain: {percentageFormatter(props.payload[0].payload.percentage_gain * 100, 2)}</p>
          </div>
        );
      } else if (this.props.measure === MEASURE_DOLLARS) {
        return (
          <div style={styles.toolTip}>
            <p>{props.payload[0].payload.symbol}</p>
            <p>{props.payload[0].payload.name}</p>
            <p>Shares Owned: {props.payload[0].payload.quantity.toFixed(3)}</p>
            {/* <p >Latest Price: {dollarFormatter(props.payload[0].payload.latest_price, 2)}</p> */}
            {/* <p >Cost Basis: {dollarFormatter(props.payload[0].payload.average_cost, 2)}</p> */}
            <p>Total Value: {dollarFormatter(props.payload[0].payload.total_value, 2)}</p>
            <p>Total Cost: {dollarFormatter(props.payload[0].payload.total_cost, 2)}</p>
            <p>Net Gain: {dollarFormatter(props.payload[0].payload.net, 2)}</p>
          </div>
        );
      }
    }

    return null;
  };

  render = () => {
    const classes = this.props.classes;
    const valueField = this.props.measure === MEASURE_DOLLARS ? 'net' : 'percentage_gain';
    const max = Math.max.apply(Math, this.props.holdings.map(el => { return el[valueField] }))
    const min = Math.min.apply(Math, this.props.holdings.map(el => { return el[valueField] }))

    // if (this.props.measure === measure_dollars) {
      return (
        <ResponsiveContainer height={"80%"} width={"50%"} className={clsx(classes.container)}>
          <Treemap
            data={this.props.holdings}
            dataKey="total_value"
            nameKey="symbol"
            ratio={4 / 3}
            label={true}
            isAnimationActive={false}
            content={<CustomizedContent max={max} min={min} valueField={valueField} />}
          >
            <Tooltip content={this.CustomTooltip} />
          </Treemap>
        </ResponsiveContainer>
      )
    // } else if (this.props.measure === measure_percent) {
    //   return (
    //     <ResponsiveContainer height={800} width={800}>
    //       <Treemap
    //         data={this.props.holdings}
    //         dataKey="total_value"
    //         nameKey="symbol"
    //         ratio={4 / 3}
    //         label={true}
    //         isAnimationActive={false}
    //         content={<CustomizedContent max={max} min={min} valueField={valueField} />}
    //       >
    //         <Tooltip content={this.CustomTooltip} />
    //       </Treemap>
    //     </ResponsiveContainer>
    //   )
    // } else {
    //   return <div></div>
    // }
  }
}

export default withStyles(styles)(TreeMap);