import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ThresholdSliderCard({ title, minvalue, maxvalue, currValue }) {
  const [value, setValue] = useState(currValue);
  const min = minvalue;
  const max = maxvalue;
  const theme = useSelector(state => state.theme.colors)
  const percentage = ((value - min) / (max - min)) * 100;

  const ticks = [];
  const tickCount = 10;
  for (let i = 0; i <= tickCount; i++) {
    const tickValue = (max / tickCount) * i;
    ticks.push(tickValue);
  }

  return (
    <div className={`w-full m-4 max-w-md mx-auto p-6 ${theme.background.card} rounded-xl shadow-lg h-full`}>
      <h3 className={`text-sm font-normal mb-6`}>
        {title}
      </h3>

      <div className="relative">
        <div className="relative pt-2 px-4 pb-2">
          <div className={`absolute h-6 rounded-full ${theme.background.card}left-0 px-2 top-1/2 left-0 right-0 -translate-y-1/2`}>
            <div
              className="absolute h-6 bg-purple-800 rounded-l-full left-0"
              style={{ width: `${percentage}%` }}
            />
            <div
              className="absolute h-6 bg-purple-200 rounded-r-full right-0"
              style={{ width: `${100 - percentage}%` }}
            />
          </div>

          <div className="relative">
            {ticks.map((tick, index) => {
              const tickPercentage = (tick / max) * 100;
              const isPassed = tick <= value;

              return (
                <div
                  key={index}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${tickPercentage}%` }}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isPassed ? 'bg-white' : 'bg-purple-800'}`} />
                </div>
              );
            })}
          </div>

          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="absolute w-full top-1/2 -translate-y-1/2 opacity-0 cursor-pointer z-10"
          />

          <div
            className="absolute top-1/2 w-1.5 h-8 border-2 rounded-xl border-white bg-purple-700 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: `${percentage}%` }}
          />
        </div>

        <div className="flex justify-between mt-1 px-1">
          <span className="text-xs font-bold">{min}</span>
          <span className="text-xs font-bold">{max}</span>
        </div>
      </div>
    </div>
  );
}