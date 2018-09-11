import 'isomorphic-fetch';
import { Banner, Chart, Footer } from '../components/property';

class Property extends React.Component {
  static async getInitialProps() {
    const res = await fetch(
      `https://api.cryptowat.ch/markets/gdax/ethusd/ohlc?period=180`
    );
    const json = await res.json();
    return { data: json.result['180'] };
  }

  constructor(props) {
    super(props);
    this.state = { numItems: 180 };
    this.increaseNumItems = this.increaseNumItems.bind(this);
    this.decreaseNumItems = this.decreaseNumItems.bind(this);
  }

  increaseNumItems() {
    if (this.state.numItems === 500) return;
    this.setState(() => ({ numItems: this.state.numItems + 20 }));
  }

  decreaseNumItems() {
    if (this.state.numItems === 40) return;
    this.setState(() => ({ numItems: this.state.numItems - 20 }));
  }

  render() {
    const { data } = this.props;

    const unix = d => new Date(d * 1000);

    const buckets = data
      .map(b => {
        const [
          closeTime,
          upperQuart,
          maxPrice,
          minPrice,
          lowerQuart,
          volume
        ] = b;
        return {
          closeTime: unix(closeTime),
          upperQuart,
          maxPrice,
          minPrice,
          lowerQuart,
          volume,
          hollow: lowerQuart > upperQuart
        };
      })
      .reverse()
      .slice(0, this.state.numItems);

    const sortedBuckets = buckets.sort((a, b) => {
      return a.closeTime - b.closeTime;
    });
    console.log(sortedBuckets);

    const maxHighPrice = Math.max(
      ...buckets.map(b => Math.max(...[b.maxPrice, b.upperQuart, b.lowerQuart]))
    );
    const minLowPrice = Math.min(
      ...buckets.map(b => Math.min(...[b.minPrice, b.upperQuart, b.lowerQuart]))
    );
    const maxVolume = Math.max(...buckets.map(b => b.volume));

    const start = sortedBuckets[0].closeTime;
    const end = sortedBuckets[sortedBuckets.length - 1].closeTime;

    return (
      <div className="property">
        <div className="container">
          <div className="chart-container">
            <Chart
              data={{
                buckets: sortedBuckets,
                start,
                end,
                maxHighPrice,
                minLowPrice,
                maxVolume
              }}
            />
          </div>
          <Banner
            numItems={this.state.numItems}
            increaseNumItems={this.increaseNumItems}
            decreaseNumItems={this.decreaseNumItems}
          />
        </div>
        <Footer />
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css?family=Open+Sans');

          body {
            background-color: #24062F;
          }
          .property {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            justify-content: center;
            align-items: center;
            font-family: 'Open Sans', monospace;
          }
          .container {
            height: 75vh;
            width: 90vw;
            background-color: #1D0029;
            position: relative;
          }
          .chart-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            cursor: crosshair;
          }
          .controls {
          }
        `}</style>
      </div>
    );
  }
}

export default Property;
