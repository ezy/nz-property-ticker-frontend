import { Tooltip } from '@vx/tooltip';

export default function Details({
  formatPrice,
  formatNumber,
  bucket,
  xScale,
  yScale
}) {
  const left = xScale(bucket.closeTime) + xScale.bandwidth() + 5;
  const halfway = xScale.range()[1] / 2;

  return (
    <Tooltip
      style={{
        borderRadius: 0,
        boxShadow: '0 1px 10px rgba(0,0,0,0.1)',
        backgroundColor: '#27273f',
        color: '#BFB1C4',
        transform: xScale(bucket.closeTime) > halfway ? 'translate(-104%)' : ''
      }}
      top={yScale(bucket.lowPrice)}
      left={left}
    >
      <div className="details">
        <div className="detail">
          <div className="tooltip-label">max</div>
          <div>
            {formatPrice(bucket.highPrice)}
          </div>
        </div>
        <div className="detail">
          <div className="tooltip-label">upper</div>
          <div>
            {formatPrice(bucket.openPrice)}
          </div>
        </div>
        <div className="detail">
          <div className="tooltip-label">lower</div>
          <div>
            {formatPrice(bucket.closePrice)}
          </div>
        </div>
        <div className="detail">
          <div className="tooltip-label">min</div>
          <div>
            {formatPrice(bucket.lowPrice)}
          </div>
        </div>
        <div className="detail">
          <div className="tooltip-label">sample</div>
          <div>
            {formatNumber(bucket.volume)}
          </div>
        </div>
      </div>
      <style jsx>{`
        .details {
          display: flex;
          flex-direction: row;
        }
        .detail {
          margin-right: 1rem;
        }
        .tooltip-label {
          font-size: 9px;
          font-weight: 900;
          color: #85738C;
        }
      `}</style>
    </Tooltip>
  );
}
