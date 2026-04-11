interface CheckerboardProps {
  columns: number;
  rows: number;
}

export function Checkerboard({ columns, rows }: CheckerboardProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: '100%',
        aspectRatio: `${columns} / ${rows}`,
      }}
    >
      {Array.from({ length: columns * rows }, (_, i) => {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const isDark = (col + row) % 2 === 0;
        return (
          <div
            key={i}
            style={{
              backgroundColor: isDark ? '#7a6d3e' : '#ffffff',
              borderRadius: '5%',
              opacity: 0.4,
            }}
          />
        );
      })}
    </div>
  );
}
