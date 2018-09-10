import { Group } from '@vx/group';
import { Bar } from '@vx/shape';

export default function Volume({ top, scale, xScale, height, data }) {
  return (
    <Group top={top}>
      <Bar
        data={data}
        width={xScale.bandwidth()}
        height={height - scale(data.volume)}
        x={xScale(data.closeTime)}
        y={scale(data.volume)}
        fill="rgba(180,0,255,1)"
        stroke="rgba(180,0,255,1)"
        fillOpacity={0.5}
        strokeOpacity={0.5}
      />
    </Group>
  );
}
