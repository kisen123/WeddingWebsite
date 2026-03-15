const STEM = '#4d6b3a';
const BERRY_FILL = '#f4efd8';
const BERRY_STROKE = '#c3b282';
const GREENS = ['#4d7d30', '#3d6b24', '#5e9438', '#467a2c', '#5a8832'];

const UP_X = [55, 273, 491, 709, 927, 1145];
const DOWN_X = [164, 382, 600, 818, 1036];

function UpCluster({ x, i }: { x: number; i: number }) {
    return (
        <g>
            <path d={`M ${x},41 Q ${x - 7},24 ${x - 12},8`}
                stroke={STEM} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx={x - 14} cy={24} rx={15} ry={6.5} fill={GREENS[i % 5]}       transform={`rotate(-68 ${x - 14} 24)`} />
            <ellipse cx={x + 2}  cy={30} rx={15} ry={6.5} fill={GREENS[(i + 1) % 5]} transform={`rotate(-68 ${x + 2} 30)`} />
            <ellipse cx={x - 17} cy={14} rx={14} ry={6}   fill={GREENS[(i + 2) % 5]} transform={`rotate(-63 ${x - 17} 14)`} />
            <ellipse cx={x - 3}  cy={20} rx={14} ry={6}   fill={GREENS[(i + 3) % 5]} transform={`rotate(-63 ${x - 3} 20)`} />
            <circle cx={x - 15} cy={10} r={4}   fill={BERRY_FILL} stroke={BERRY_STROKE} strokeWidth={1.2} />
            <circle cx={x - 9}  cy={8}  r={4}   fill={BERRY_FILL} stroke={BERRY_STROKE} strokeWidth={1.2} />
            <circle cx={x - 13} cy={5}  r={3.5} fill={BERRY_FILL} stroke={BERRY_STROKE} strokeWidth={1.2} />
        </g>
    );
}

function DownCluster({ x, i }: { x: number; i: number }) {
    return (
        <g>
            <path d={`M ${x},43 Q ${x - 6},60 ${x - 10},75`}
                stroke={STEM} strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx={x - 12} cy={54} rx={15} ry={6.5} fill={GREENS[(i + 1) % 5]} transform={`rotate(68 ${x - 12} 54)`} />
            <ellipse cx={x + 1}  cy={60} rx={15} ry={6.5} fill={GREENS[i % 5]}        transform={`rotate(68 ${x + 1} 60)`} />
            <ellipse cx={x - 16} cy={64} rx={14} ry={6}   fill={GREENS[(i + 3) % 5]} transform={`rotate(63 ${x - 16} 64)`} />
            <ellipse cx={x - 3}  cy={70} rx={14} ry={6}   fill={GREENS[(i + 2) % 5]} transform={`rotate(63 ${x - 3} 70)`} />
            <circle cx={x - 14} cy={74} r={4}   fill={BERRY_FILL} stroke={BERRY_STROKE} strokeWidth={1.2} />
            <circle cx={x - 8}  cy={73} r={4}   fill={BERRY_FILL} stroke={BERRY_STROKE} strokeWidth={1.2} />
            <circle cx={x - 12} cy={78} r={3.5} fill={BERRY_FILL} stroke={BERRY_STROKE} strokeWidth={1.2} />
        </g>
    );
}

export function MistletoeDecor() {
    return (
        <svg
            className="header__decor"
            viewBox="0 0 1200 85"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Main branch — gentle wave across full width */}
            <path
                d="M -5,41 C 80,35 180,48 300,41 C 420,35 520,48 640,41 C 760,35 880,48 1000,41 C 1100,35 1160,45 1205,40"
                stroke={STEM} strokeWidth="3.5" fill="none" strokeLinecap="round"
            />
            {UP_X.map((x, i) => <UpCluster key={i} x={x} i={i} />)}
            {DOWN_X.map((x, i) => <DownCluster key={i} x={x} i={i} />)}
        </svg>
    );
}
