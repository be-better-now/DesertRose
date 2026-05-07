

import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import {
  LayoutDashboard, TrendingUp, TrendingDown, ShoppingCart,
  Users, Leaf, Bell, Settings, ChevronDown, Eye, Edit, Lock,
  Download, BarChart2, Check, X, DollarSign, ShoppingBag,
  Package, AlertTriangle, Plus, FileSpreadsheet,
} from 'lucide-react';

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  brand: '#1D9E75',
  brandDark: '#0F6E56',
  brandLight: '#E1F5EE',
  brandMid: '#9FE1CB',
  blue: '#378ADD',
  blueLight: '#E6F1FB',
  blueDark: '#185FA5',
  amber: '#BA7517',
  amberLight: '#FAEEDA',
  amberDark: '#633806',
  red: '#E24B4A',
  redLight: '#FCEBEB',
  redDark: '#A32D2D',
  bg: '#ffffff',
  bgSurface: '#F8F8F6',
  bgPage: '#F2F1EE',
  border: 'rgba(0,0,0,0.08)',
  borderMed: 'rgba(0,0,0,0.14)',
  text: '#1a1a18',
  textSec: '#5F5E5A',
  textTer: '#888780',
};

const RADIUS = { sm: 6, md: 8, lg: 12, xl: 16, full: 9999 };

// ─── DATA ─────────────────────────────────────────────────────────────────────
const REVENUE_DATA = {
  day: {
    chart: [
      { label: '06:00', value: 0.8 }, { label: '08:00', value: 1.2 },
      { label: '10:00', value: 2.1 }, { label: '12:00', value: 3.4 },
      { label: '14:00', value: 4.2 }, { label: '16:00', value: 5.8 },
      { label: '18:00', value: 7.1 }, { label: '20:00', value: 8.0 },
      { label: '22:00', value: 8.45 },
    ],
    total: '8.45M ₫', orders: '23', avg: '367K ₫', peak: '18:00–20:00',
    change: '+12.4%', changeType: 'up',
  },
  week: {
    chart: [
      { label: 'Thứ 2', value: 5.2 }, { label: 'Thứ 3', value: 7.8 },
      { label: 'Thứ 4', value: 6.3 }, { label: 'Thứ 5', value: 9.1 },
      { label: 'Thứ 6', value: 8.4 }, { label: 'Thứ 7', value: 11.2 },
      { label: 'CN', value: 8.45 },
    ],
    total: '56.4M ₫', orders: '147', avg: '384K ₫', peak: 'T7: 11.2M',
    change: '+8.9%', changeType: 'up',
  },
  month: {
    chart: [
      { label: 'T1', value: 95 }, { label: 'T2', value: 88 },
      { label: 'T3', value: 102 }, { label: 'T4', value: 118 },
      { label: 'T5', value: 125 }, { label: 'T6', value: 143 },
      { label: 'T7', value: 138 }, { label: 'T8', value: 152 },
      { label: 'T9', value: 127 }, { label: 'T10', value: 145 },
      { label: 'T11', value: 131 }, { label: 'T12', value: 127 },
    ],
    total: '127.3M ₫', orders: '823', avg: '409K ₫', peak: 'T8: 152M',
    change: '-2.9%', changeType: 'down',
  },
  year: {
    chart: [
      { label: '2021', value: 890 }, { label: '2022', value: 1020 },
      { label: '2023', value: 1150 }, { label: '2024', value: 1280 },
      { label: '2025', value: 1580 },
    ],
    total: '1.58B ₫', orders: '9,247', avg: '396K ₫', peak: '2025: 1.58B',
    change: '+23.4%', changeType: 'up',
  },
};

const ORDERS = [
  { id: '#HD0823', time: '09:32 · 06/05', customer: 'Nguyễn Thị Mai', product: 'Hồng nhung đỏ', qty: 3, total: '650.000 ₫', payment: 'Đã TT', status: 'Hoàn thành', statusType: 'green', payType: 'green' },
  { id: '#HD0822', time: '08:15 · 06/05', customer: 'Trần Văn Hùng', product: 'Cẩm chướng', qty: 5, total: '420.000 ₫', payment: 'Đã TT', status: 'Đang giao', statusType: 'blue', payType: 'green' },
  { id: '#HD0821', time: '07:48 · 06/05', customer: 'Lê Thị Hoa', product: 'Hoa lily trắng', qty: 2, total: '1.200.000 ₫', payment: 'COD', status: 'Chờ xác nhận', statusType: 'amber', payType: 'amber' },
  { id: '#HD0820', time: '06:20 · 06/05', customer: 'Phạm Minh Tuấn', product: 'Tulip vàng', qty: 4, total: '880.000 ₫', payment: 'Đã TT', status: 'Hoàn thành', statusType: 'green', payType: 'green' },
  { id: '#HD0819', time: '22:10 · 05/05', customer: 'Hoàng Thị Lan', product: 'Bó hoa cưới', qty: 1, total: '2.500.000 ₫', payment: 'Đã TT', status: 'Hoàn thành', statusType: 'green', payType: 'green' },
  { id: '#HD0818', time: '19:45 · 05/05', customer: 'Vũ Thị Thanh', product: 'Hoa hướng dương', qty: 6, total: '780.000 ₫', payment: 'Hoàn tiền', status: 'Đã hủy', statusType: 'red', payType: 'red' },
];

const USERS = [
  { initials: 'NM', color: C.brand, name: 'Nguyễn Thị Mai', email: 'ntmai@gmail.com', phone: '0912 345 678', orders: 28, spent: '15.2M ₫', tier: '🥇 Vàng', tierType: 'amber', lastOrder: '06/05/2026', status: 'Hoạt động', statusType: 'green', locked: false },
  { initials: 'LH', color: '#D85A30', name: 'Lê Thị Hoa', email: 'lthoa@yahoo.com', phone: '0909 111 222', orders: 42, spent: '28.9M ₫', tier: '💎 Kim cương', tierType: 'red', lastOrder: '06/05/2026', status: 'Hoạt động', statusType: 'green', locked: false },
  { initials: 'TH', color: C.blue, name: 'Trần Văn Hùng', email: 'tvhung@gmail.com', phone: '0987 654 321', orders: 15, spent: '8.7M ₫', tier: '🥈 Bạc', tierType: 'gray', lastOrder: '05/05/2026', status: 'Hoạt động', statusType: 'green', locked: false },
  { initials: 'VT', color: C.textTer, name: 'Vũ Thị Thanh', email: 'vthanh@gmail.com', phone: '0933 222 111', orders: 3, spent: '1.8M ₫', tier: '🥉 Đồng', tierType: 'gray', lastOrder: '05/05/2026', status: 'Bị khóa', statusType: 'red', locked: true },
  { initials: 'PM', color: C.brandMid, textColor: C.brandDark, name: 'Phạm Minh Tuấn', email: 'pmtuan@gmail.com', phone: '0977 888 999', orders: 8, spent: '4.4M ₫', tier: '🥈 Bạc', tierType: 'gray', lastOrder: '06/05/2026', status: 'Hoạt động', statusType: 'green', locked: false },
];

const PRODUCTS = [
  { rank: 1, name: '🌹 Hồng nhung đỏ', category: 'Cắt cành', catType: 'green', price: '50K ₫', cost: '32K ₫', margin: '+56%', stock: 128, stockStatus: 'good', sold: 342, status: 'Còn hàng', statusType: 'green' },
  { rank: 2, name: '🌸 Bó hoa cưới cao cấp', category: 'Hoa cưới', catType: 'blue', price: '250K ₫', cost: '160K ₫', margin: '+56%', stock: 34, stockStatus: 'good', sold: 89, status: 'Còn hàng', statusType: 'green' },
  { rank: 3, name: '🌷 Tulip vàng Hà Lan', category: 'Nhập khẩu', catType: 'amber', price: '90K ₫', cost: '58K ₫', margin: '+55%', stock: 12, stockStatus: 'low', sold: 215, status: 'Sắp hết', statusType: 'amber' },
  { rank: 4, name: '💐 Hoa lily trắng', category: 'Cắt cành', catType: 'green', price: '600K ₫', cost: '380K ₫', margin: '+58%', stock: 67, stockStatus: 'good', sold: 178, status: 'Còn hàng', statusType: 'green' },
  { rank: 5, name: '🌻 Hướng dương mini', category: 'Cắt cành', catType: 'green', price: '35K ₫', cost: '20K ₫', margin: '+43%', stock: 0, stockStatus: 'out', sold: 156, status: 'Hết hàng', statusType: 'red' },
];

const CATEGORY_BREAKDOWN = [
  { name: '🌹 Hoa cắt cành', value: 43.2, pct: 64, color: C.brand },
  { name: '🌷 Hoa nhập khẩu', value: 32.1, pct: 48, color: C.amber },
  { name: '🌸 Hoa cưới', value: 28.5, pct: 42, color: C.blue },
  { name: '🪴 Chậu cây', value: 15.8, pct: 24, color: C.brandMid },
  { name: '🎀 Phụ kiện', value: 7.7, pct: 12, color: C.textTer },
];

const ORDER_STATUS_PIE = [
  { name: 'Hoàn thành', value: 74, color: C.brand },
  { name: 'Đang giao', value: 17, color: C.blue },
  { name: 'Đã hủy', value: 9, color: C.red },
];

const COMPARISONS = [
  { label: 'Hôm nay vs Hôm qua', current: '8.45M', prev: '7.52M', change: '+12.4%', up: true },
  { label: 'Tuần này vs Tuần trước', current: '56.4M', prev: '51.8M', change: '+8.9%', up: true },
  { label: 'Tháng này vs Tháng trước', current: '127.3M', prev: '131.2M', change: '-2.9%', up: false },
  { label: 'Năm nay vs Năm trước', current: '1.58B', prev: '1.28B', change: '+23.4%', up: true },
];

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const BADGE_MAP = {
  green: { bg: C.brandLight, color: C.brandDark },
  red: { bg: C.redLight, color: C.redDark },
  amber: { bg: C.amberLight, color: C.amberDark },
  blue: { bg: C.blueLight, color: C.blueDark },
  gray: { bg: '#EEEEE8', color: '#444441' },
};

const Badge = ({ type = 'gray', children, style = {} }) => {
  const s = BADGE_MAP[type] || BADGE_MAP.gray;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      fontSize: 10, fontWeight: 500, padding: '2px 7px',
      borderRadius: RADIUS.full, whiteSpace: 'nowrap',
      background: s.bg, color: s.color, ...style,
    }}>
      {children}
    </span>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{
    background: C.bg,
    border: `0.5px solid ${C.border}`,
    borderRadius: RADIUS.lg,
    padding: '14px 18px',
    marginBottom: 10,
    ...style,
  }}>
    {children}
  </div>
);

const KpiCard = ({ label, value, sub, subType, icon: Icon, subColor }) => (
  <div style={{ background: C.bgSurface, borderRadius: RADIUS.md, padding: '13px 15px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
      <span style={{ fontSize: 11, color: C.textSec }}>{label}</span>
      {Icon && <Icon size={14} color={C.brand} />}
    </div>
    <div style={{ fontSize: 20, fontWeight: 500, color: C.text, marginBottom: sub ? 5 : 0 }}>{value}</div>
    {sub && (subType
      ? <Badge type={subType}>{sub}</Badge>
      : <span style={{ fontSize: 10, color: subColor || C.textTer }}>{sub}</span>
    )}
  </div>
);

const SmallKpi = ({ label, value, sub, subColor }) => (
  <div style={{ background: C.bgSurface, borderRadius: RADIUS.md, padding: '12px 15px' }}>
    <div style={{ fontSize: 11, color: C.textSec, marginBottom: 3 }}>{label}</div>
    <div style={{ fontSize: 16, fontWeight: 500, color: C.text }}>{value}</div>
    {sub && <div style={{ fontSize: 10, color: subColor || C.textTer, marginTop: 2 }}>{sub}</div>}
  </div>
);

const Grid = ({ cols = 4, children, style = {} }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: 8,
    marginBottom: 10,
    ...style,
  }}>
    {children}
  </div>
);

const SectionHeader = ({ title, subtitle, action }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
    <div>
      <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{title}</div>
      {subtitle && <div style={{ fontSize: 10.5, color: C.textTer, marginTop: 1 }}>{subtitle}</div>}
    </div>
    {action}
  </div>
);

const LinkBtn = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    fontSize: 11, color: C.brand, background: 'transparent',
    border: 'none', cursor: 'pointer', fontWeight: 500, padding: 0,
  }}>
    {children}
  </button>
);

const PrimaryBtn = ({ children, onClick, small }) => (
  <button onClick={onClick} style={{
    fontSize: small ? 11 : 12,
    padding: small ? '4px 10px' : '5px 12px',
    border: `0.5px solid ${C.brand}`,
    borderRadius: RADIUS.md,
    background: C.brand,
    color: '#fff',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
  }}>
    {children}
  </button>
);

const OutlineBtn = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    fontSize: 11, padding: '4px 9px',
    border: `0.5px solid ${C.border}`,
    borderRadius: RADIUS.md,
    background: 'transparent',
    color: C.textSec,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
  }}>
    {children}
  </button>
);

const IconBtn = ({ children, onClick, color }) => (
  <button onClick={onClick} style={{
    border: 'none', background: 'transparent', cursor: 'pointer',
    color: color || C.textSec, padding: 0, lineHeight: 1,
    display: 'inline-flex', alignItems: 'center',
  }}>
    {children}
  </button>
);

const Input = ({ placeholder, style = {} }) => (
  <input placeholder={placeholder} style={{
    fontSize: 12, padding: '5px 10px',
    border: `0.5px solid ${C.border}`,
    borderRadius: RADIUS.md, outline: 'none',
    background: C.bg, color: C.text,
    ...style,
  }} />
);

const Select = ({ children, style = {} }) => (
  <select style={{
    fontSize: 12, padding: '5px 8px',
    border: `0.5px solid ${C.border}`,
    borderRadius: RADIUS.md, outline: 'none',
    background: C.bg, color: C.text, cursor: 'pointer',
    ...style,
  }}>
    {children}
  </select>
);

// Table primitives
const Th = ({ children }) => (
  <th style={{
    textAlign: 'left', padding: '7px 10px', fontSize: 10.5,
    fontWeight: 500, color: C.textTer, textTransform: 'uppercase',
    letterSpacing: '0.4px', borderBottom: `0.5px solid ${C.border}`,
    whiteSpace: 'nowrap', background: 'transparent',
  }}>
    {children}
  </th>
);

const Td = ({ children, style = {} }) => (
  <td style={{
    padding: '8px 10px', fontSize: 12, color: C.text,
    borderBottom: `0.5px solid ${C.border}`, verticalAlign: 'top', textAlign: 'left',
    ...style,
  }}>
    {children}
  </td>
);

const Table = ({ children }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
      {children}
    </table>
  </div>
);

const Avatar = ({ initials, color, textColor, size = 26 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: color, display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: size * 0.38,
    fontWeight: 500, color: textColor || '#fff', flexShrink: 0,
  }}>
    {initials}
  </div>
);

// Recharts custom tooltip
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: '#fff', border: `0.5px solid ${C.border}`,
      borderRadius: RADIUS.md, padding: '8px 12px',
      fontSize: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    }}>
      <div style={{ color: C.textSec, marginBottom: 3 }}>{label}</div>
      <div style={{ fontWeight: 500, color: C.text }}>{payload[0].value.toFixed(1)}M ₫</div>
    </div>
  );
};

const PeriodBtn = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{
    padding: '4px 11px',
    border: `0.5px solid ${active ? C.brand : C.border}`,
    borderRadius: RADIUS.md,
    background: active ? C.brand : 'transparent',
    color: active ? '#fff' : C.textSec,
    cursor: 'pointer', fontSize: 11.5, fontWeight: 500,
    transition: 'all 0.12s',
  }}>
    {children}
  </button>
);

const ProgressBar = ({ pct, color }) => (
  <div style={{ height: 5, background: C.bgSurface, borderRadius: 3, overflow: 'hidden' }}>
    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3 }} />
  </div>
);

// ─── TAB: TỔNG QUAN ──────────────────────────────────────────────────────────
const OverviewTab = ({ setTab }) => {
  const weekData = REVENUE_DATA.week;
  return (
    <>
      <Grid cols={4}>
        <KpiCard label="Doanh thu hôm nay" value="8.45M ₫" icon={DollarSign}
          sub={<><TrendingUp size={9} /> +12.4% hôm qua</>} subType="green" />
        <KpiCard label="Đơn hàng hôm nay" value="23" icon={ShoppingBag}
          sub="3 chờ xác nhận" subType="amber" />
        <KpiCard label="Khách hàng" value="1,847" icon={Users}
          sub={<><TrendingUp size={9} /> +8 tháng này</>} subType="green" />
        <KpiCard label="Sản phẩm" value="156" icon={Package}
          sub="5 hết hàng" subType="red" />
      </Grid>

      <Grid cols={4}>
        <SmallKpi label="Doanh thu tuần" value="56.4M ₫" sub="+8.9% vs tuần trước" subColor={C.brand} />
        <SmallKpi label="Doanh thu tháng" value="127.3M ₫" sub="-2.9% vs tháng trước" subColor={C.red} />
        <SmallKpi label="Doanh thu năm" value="1.58B ₫" sub="+23.4% vs năm ngoái" subColor={C.brand} />
        <SmallKpi label="Tỷ lệ hoàn đơn" value="94.3%" sub="Mục tiêu: 95%" />
      </Grid>

      {/* Mini revenue chart */}
      <Card>
        <SectionHeader
          title="Doanh thu 7 ngày gần nhất"
          action={<LinkBtn onClick={() => setTab('rv')}>Xem chi tiết →</LinkBtn>}
        />
        <ResponsiveContainer width="100%" height={140}>
          <AreaChart data={weekData.chart} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gMini" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.brand} stopOpacity={0.12} />
                <stop offset="95%" stopColor={C.brand} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(136,135,128,0.1)" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: C.textTer }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: C.textTer }} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="value" stroke={C.brand} strokeWidth={2}
              fill="url(#gMini)" dot={{ r: 3, fill: C.brand, strokeWidth: 1.5, stroke: '#fff' }}
              activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent orders + donut */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 10, marginBottom: 10 }}>
        <Card style={{ marginBottom: 0 }}>
          <SectionHeader
            title="Đơn hàng gần đây"
            action={<LinkBtn onClick={() => setTab('od')}>Xem tất cả</LinkBtn>}
          />
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr><Th>Mã đơn</Th><Th>Khách hàng</Th><Th>Sản phẩm</Th><Th>Tổng</Th><Th>Trạng thái</Th></tr>
            </thead>
            <tbody>
              {ORDERS.slice(0, 5).map(o => (
                <tr key={o.id} style={{ cursor: 'default' }}
                  onMouseEnter={e => e.currentTarget.style.background = C.bgSurface}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <Td style={{ fontWeight: 500, color: C.brand }}>{o.id}</Td>
                  <Td>{o.customer}</Td>
                  <Td style={{ color: C.textSec }}>{o.product}</Td>
                  <Td style={{ fontWeight: 500 }}>{o.total.replace('.000', 'K').replace('1.200', '1.2M').replace('2.500', '2.5M')}</Td>
                  <Td><Badge type={o.statusType}>{o.status}</Badge></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card style={{ marginBottom: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Trạng thái đơn</div>
          <PieChart width={160} height={130} style={{ margin: '0 auto' }}>
            <Pie data={ORDER_STATUS_PIE} cx={80} cy={55} innerRadius={38} outerRadius={54}
              paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
              {ORDER_STATUS_PIE.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 8 }}>
            {ORDER_STATUS_PIE.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: C.textSec }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color, display: 'inline-block' }} />
                  {s.name}
                </span>
                <span style={{ fontWeight: 500 }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top products */}
      <Card>
        <SectionHeader
          title="Sản phẩm bán chạy"
          action={<LinkBtn onClick={() => setTab('pr')}>Quản lý sản phẩm →</LinkBtn>}
        />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr><Th>#</Th><Th>Sản phẩm</Th><Th>Danh mục</Th><Th>Đã bán</Th><Th>Doanh thu</Th><Th>Tồn kho</Th><Th>Lợi nhuận</Th></tr>
          </thead>
          <tbody>
            {PRODUCTS.map(p => (
              <tr key={p.rank}
                onMouseEnter={e => e.currentTarget.style.background = C.bgSurface}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <Td style={{ color: C.textTer }}>{p.rank}</Td>
                <Td style={{ fontWeight: 500 }}>{p.name}</Td>
                <Td><Badge type={p.catType}>{p.category}</Badge></Td>
                <Td>{p.sold}</Td>
                <Td style={{ fontWeight: 500 }}>{p.rank === 1 ? '17.1M' : p.rank === 2 ? '22.2M' : p.rank === 3 ? '19.3M' : p.rank === 4 ? '14.2M' : '5.5M'}</Td>
                <Td style={{ color: p.stockStatus === 'out' ? C.red : p.stockStatus === 'low' ? C.amber : C.brand, fontWeight: 500 }}>
                  {p.stock}{p.stockStatus === 'low' ? ' ⚠' : p.stockStatus === 'out' ? ' ✗' : ''}
                </Td>
                <Td style={{ color: C.brand }}>{p.margin}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
};

// ─── TAB: DOANH THU ──────────────────────────────────────────────────────────
const RevenueTab = () => {
  const [period, setPeriod] = useState('week');
  const d = REVENUE_DATA[period];

  return (
    <>
      <Card>
        <SectionHeader
          title="Thống kê doanh thu"
          subtitle="Phân tích doanh thu theo thời gian"
          action={
            <div style={{ display: 'flex', gap: 4 }}>
              {['day', 'week', 'month', 'year'].map(p => (
                <PeriodBtn key={p} active={period === p} onClick={() => setPeriod(p)}>
                  {{ day: 'Ngày', week: 'Tuần', month: 'Tháng', year: 'Năm' }[p]}
                </PeriodBtn>
              ))}
            </div>
          }
        />
        <Grid cols={4}>
          <div style={{ background: C.bgSurface, borderRadius: RADIUS.md, padding: '12px 15px' }}>
            <div style={{ fontSize: 11, color: C.textSec, marginBottom: 3 }}>Tổng doanh thu</div>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{d.total}</div>
            <Badge type={d.changeType === 'up' ? 'green' : 'red'}>
              {d.changeType === 'up' ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
              {' '}{d.change}
            </Badge>
          </div>
          <div style={{ background: C.bgSurface, borderRadius: RADIUS.md, padding: '12px 15px' }}>
            <div style={{ fontSize: 11, color: C.textSec, marginBottom: 3 }}>Số đơn hàng</div>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{d.orders}</div>
            <span style={{ fontSize: 10, color: C.textTer }}>Trong kỳ</span>
          </div>
          <div style={{ background: C.bgSurface, borderRadius: RADIUS.md, padding: '12px 15px' }}>
            <div style={{ fontSize: 11, color: C.textSec, marginBottom: 3 }}>Giá trị TB/đơn</div>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{d.avg}</div>
            <Badge type="green"><TrendingUp size={9} /> +5.2%</Badge>
          </div>
          <div style={{ background: C.bgSurface, borderRadius: RADIUS.md, padding: '12px 15px' }}>
            <div style={{ fontSize: 11, color: C.textSec, marginBottom: 3 }}>Đỉnh doanh thu</div>
            <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{d.peak}</div>
            <span style={{ fontSize: 10, color: C.textTer }}>Cao nhất kỳ</span>
          </div>
        </Grid>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={d.chart} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gMain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.brand} stopOpacity={0.12} />
                <stop offset="95%" stopColor={C.brand} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(136,135,128,0.1)" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: C.textTer }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: C.textTer }} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="value" stroke={C.brand} strokeWidth={2}
              fill="url(#gMain)" dot={{ r: 3.5, fill: C.brand, strokeWidth: 1.5, stroke: '#fff' }}
              activeDot={{ r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        {/* Category breakdown */}
        <Card style={{ marginBottom: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Doanh thu theo danh mục (tháng này)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {CATEGORY_BREAKDOWN.map((cat, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12 }}>
                  <span style={{ color: C.textSec }}>{cat.name}</span>
                  <span style={{ fontWeight: 500 }}>{cat.value}M ₫</span>
                </div>
                <ProgressBar pct={cat.pct} color={cat.color} />
              </div>
            ))}
          </div>
        </Card>

        {/* Period comparison */}
        <Card style={{ marginBottom: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>So sánh cùng kỳ</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {COMPARISONS.map((c, i) => (
              <div key={i} style={{ padding: '10px 12px', background: C.bgSurface, borderRadius: RADIUS.md }}>
                <div style={{ fontSize: 10.5, color: C.textTer, marginBottom: 4 }}>{c.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>{c.current}</span>
                  <span style={{ fontSize: 13, color: C.textTer }}>vs {c.prev}</span>
                  <Badge type={c.up ? 'green' : 'red'}>
                    {c.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />} {c.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Hourly chart */}
      <Card>
        <SectionHeader title="Phân tích doanh thu theo giờ (hôm nay)" />
        <ResponsiveContainer width="100%" height={130}>
          <AreaChart data={REVENUE_DATA.day.chart} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gHour" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.brand} stopOpacity={0.1} />
                <stop offset="95%" stopColor={C.brand} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(136,135,128,0.1)" />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: C.textTer }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: C.textTer }} axisLine={false} tickLine={false} tickFormatter={v => `${v}M`} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="value" stroke={C.brand} strokeWidth={2}
              fill="url(#gHour)" dot={{ r: 3, fill: C.brand, strokeWidth: 1.5, stroke: '#fff' }} />
          </AreaChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11, color: C.textTer }}>
          <span>🕐 Giờ cao điểm: <strong style={{ color: C.text }}>16:00 – 20:00</strong></span>
          <span>📈 Tốc độ hiện tại: <strong style={{ color: C.brand }}>+842K ₫/giờ</strong></span>
          <span>🎯 Dự báo hôm nay: <strong style={{ color: C.text }}>~9.2M ₫</strong></span>
        </div>
      </Card>
    </>
  );
};

// ─── TAB: ĐƠN HÀNG ───────────────────────────────────────────────────────────
const OrdersTab = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = ORDERS.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search);
    const matchStatus = statusFilter === 'all' || o.statusType === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <Grid cols={4}>
        <SmallKpi label="Tổng đơn hôm nay" value="23" />
        <SmallKpi label="Chờ xác nhận" value="3" subColor={C.amber} sub="Cần xử lý ngay" />
        <SmallKpi label="Đang giao" value="5" subColor={C.blue} sub="Đang vận chuyển" />
        <SmallKpi label="Hoàn thành" value="15" subColor={C.brand} sub="Tỷ lệ: 65.2%" />
      </Grid>

      <Card>
        <SectionHeader
          title="Danh sách đơn hàng"
          subtitle={`${filtered.length} / 832 đơn hàng`}
          action={
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Input placeholder="Tìm đơn hàng..." style={{ width: 150 }}
                value={search} onChange={e => setSearch(e.target.value)} />
              <Select onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">Tất cả trạng thái</option>
                <option value="amber">Chờ xác nhận</option>
                <option value="blue">Đang giao</option>
                <option value="green">Hoàn thành</option>
                <option value="red">Đã hủy</option>
              </Select>
              <OutlineBtn><Download size={12} /> Xuất Excel</OutlineBtn>
            </div>
          }
        />
        <Table>
          <thead>
            <tr>
              <Th>Mã đơn</Th><Th>Thời gian</Th><Th>Khách hàng</Th>
              <Th>Sản phẩm</Th><Th>SL</Th><Th>Tổng tiền</Th>
              <Th>TT Thanh toán</Th><Th>TT Đơn hàng</Th><Th>Thao tác</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id}
                style={{ background: o.statusType === 'amber' ? 'rgba(186,117,23,0.03)' : 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = C.bgSurface}
                onMouseLeave={e => e.currentTarget.style.background = o.statusType === 'amber' ? 'rgba(186,117,23,0.03)' : 'transparent'}>
                <Td style={{ fontWeight: 500, color: C.brand }}>{o.id}</Td>
                <Td style={{ color: C.textTer, fontSize: 10.5 }}>{o.time}</Td>
                <Td>{o.customer}</Td>
                <Td style={{ color: C.textSec }}>{o.product}</Td>
                <Td>{o.qty}</Td>
                <Td style={{ fontWeight: 500 }}>{o.total}</Td>
                <Td><Badge type={o.payType}>{o.payment}</Badge></Td>
                <Td><Badge type={o.statusType}>{o.status}</Badge></Td>
                <Td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <IconBtn><Eye size={13} /></IconBtn>
                    {o.statusType === 'amber' && (
                      <>
                        <IconBtn color={C.brand}><Check size={13} /></IconBtn>
                        <IconBtn color={C.red}><X size={13} /></IconBtn>
                      </>
                    )}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <span style={{ fontSize: 11, color: C.textTer }}>Hiển thị {filtered.length} / 832 đơn hàng</span>
          <div style={{ display: 'flex', gap: 3 }}>
            {['←', '1', '2', '3', '→'].map((p, i) => (
              <button key={i} style={{
                padding: '2px 8px', fontSize: 11,
                border: `0.5px solid ${i === 1 ? C.brand : C.border}`,
                borderRadius: RADIUS.md, cursor: 'pointer',
                background: i === 1 ? C.brand : 'transparent',
                color: i === 1 ? '#fff' : C.textSec,
              }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </>
  );
};

// ─── TAB: KHÁCH HÀNG ─────────────────────────────────────────────────────────
const UsersTab = () => {
  const [search, setSearch] = useState('');

  return (
    <>
      <Grid cols={4}>
        <SmallKpi label="Tổng khách hàng" value="1,847" />
        <SmallKpi label="💎 Kim cương" value="42" subColor="#D85A30" sub=">20M ₫ chi tiêu" />
        <SmallKpi label="🥇 Hạng vàng" value="183" subColor={C.amber} sub=">8M ₫ chi tiêu" />
        <SmallKpi label="Mới tháng này" value="+8" subColor={C.brand} sub="Tăng 14.3%" />
      </Grid>

      <Card>
        <SectionHeader
          title="Quản lý khách hàng"
          subtitle="1,847 khách hàng đã đăng ký"
          action={
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Input placeholder="Tìm khách hàng..." style={{ width: 160 }}
                value={search} onChange={e => setSearch(e.target.value)} />
              <Select>
                <option>Tất cả hạng</option>
                <option>💎 Kim cương</option>
                <option>🥇 Vàng</option>
                <option>🥈 Bạc</option>
                <option>🥉 Đồng</option>
              </Select>
              <PrimaryBtn small><Plus size={12} /> Thêm KH</PrimaryBtn>
            </div>
          }
        />
        <Table>
          <thead>
            <tr>
              <Th>Khách hàng</Th><Th>Liên hệ</Th><Th>Tổng đơn</Th>
              <Th>Chi tiêu</Th><Th>Hạng VIP</Th><Th>Lần cuối</Th>
              <Th>Trạng thái</Th><Th>Thao tác</Th>
            </tr>
          </thead>
          <tbody>
            {USERS.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map((u, i) => (
              <tr key={i}
                onMouseEnter={e => e.currentTarget.style.background = C.bgSurface}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <Td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar initials={u.initials} color={u.color} textColor={u.textColor} />
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 12 }}>{u.name}</div>
                      <div style={{ fontSize: 10, color: C.textTer }}>{u.email}</div>
                    </div>
                  </div>
                </Td>
                <Td style={{ fontSize: 11, color: C.textSec }}>{u.phone}</Td>
                <Td style={{ fontWeight: 500, color: C.brand }}>{u.orders}</Td>
                <Td style={{ fontWeight: 500 }}>{u.spent}</Td>
                <Td><Badge type={u.tierType}>{u.tier}</Badge></Td>
                <Td style={{ fontSize: 11, color: C.textTer }}>{u.lastOrder}</Td>
                <Td><Badge type={u.statusType}>{u.status}</Badge></Td>
                <Td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <IconBtn><Eye size={13} /></IconBtn>
                    <IconBtn>{u.locked ? <Lock size={13} /> : <Edit size={13} />}</IconBtn>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <OutlineBtn><Download size={12} /> Xuất Excel (RFM)</OutlineBtn>
        </div>
      </Card>
    </>
  );
};

// ─── TAB: SẢN PHẨM ───────────────────────────────────────────────────────────
const ProductsTab = () => {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');

  const filtered = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'all' || p.catType === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <>
      <Grid cols={4}>
        <SmallKpi label="Tổng sản phẩm" value="156" />
        <SmallKpi label="Còn hàng" value="139" subColor={C.brand} sub="89.1% tổng kho" />
        <SmallKpi label="Sắp hết hàng" value="12" subColor={C.amber} sub="Cần nhập thêm" />
        <SmallKpi label="Hết hàng" value="5" subColor={C.red} sub="Dừng bán tạm" />
      </Grid>

      <Card>
        <SectionHeader
          title="Quản lý sản phẩm"
          subtitle="156 sản phẩm · 5 hết hàng · 12 sắp hết"
          action={
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Input placeholder="Tìm sản phẩm..." style={{ width: 140 }}
                value={search} onChange={e => setSearch(e.target.value)} />
              <Select onChange={e => setCatFilter(e.target.value)}>
                <option value="all">Tất cả danh mục</option>
                <option value="green">Hoa cắt cành</option>
                <option value="blue">Hoa cưới</option>
                <option value="amber">Nhập khẩu</option>
              </Select>
              <Select>
                <option>Tất cả tồn kho</option>
                <option>Còn hàng</option>
                <option>Sắp hết</option>
                <option>Hết hàng</option>
              </Select>
              <PrimaryBtn small><Plus size={12} /> Thêm SP</PrimaryBtn>
            </div>
          }
        />
        <Table>
          <thead>
            <tr>
              <Th>#</Th><Th>Sản phẩm</Th><Th>Danh mục</Th><Th>Giá bán</Th>
              <Th>Giá vốn</Th><Th>Lợi nhuận</Th><Th>Tồn kho</Th>
              <Th>Đã bán</Th><Th>Trạng thái</Th><Th>Thao tác</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.rank}
                style={{ background: p.stockStatus === 'out' ? 'rgba(226,75,74,0.03)' : p.stockStatus === 'low' ? 'rgba(186,117,23,0.03)' : 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = C.bgSurface}
                onMouseLeave={e => e.currentTarget.style.background =
                  p.stockStatus === 'out' ? 'rgba(226,75,74,0.03)' : p.stockStatus === 'low' ? 'rgba(186,117,23,0.03)' : 'transparent'}>
                <Td style={{ color: C.textTer }}>{p.rank}</Td>
                <Td style={{ fontWeight: 500 }}>{p.name}</Td>
                <Td><Badge type={p.catType}>{p.category}</Badge></Td>
                <Td style={{ fontWeight: 500 }}>{p.price}</Td>
                <Td style={{ color: C.textSec }}>{p.cost}</Td>
                <Td style={{ color: C.brand, fontWeight: 500 }}>{p.margin}</Td>
                <Td style={{ color: p.stockStatus === 'out' ? C.red : p.stockStatus === 'low' ? C.amber : C.brand, fontWeight: 500 }}>
                  {p.stock}{p.stockStatus === 'low' ? ' ⚠' : p.stockStatus === 'out' ? ' ✗' : ''}
                </Td>
                <Td>{p.sold}</Td>
                <Td><Badge type={p.statusType}>{p.status}</Badge></Td>
                <Td>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <IconBtn><Edit size={13} /></IconBtn>
                    <IconBtn><BarChart2 size={13} /></IconBtn>
                    {p.stockStatus !== 'good' && (
                      <button style={{
                        fontSize: 10, padding: '2px 7px',
                        border: `0.5px solid ${p.stockStatus === 'out' ? C.red : C.brand}`,
                        borderRadius: 4,
                        color: p.stockStatus === 'out' ? C.red : C.brand,
                        background: 'transparent', cursor: 'pointer',
                      }}>
                        {p.stockStatus === 'out' ? 'Nhập hàng!' : 'Đặt nhập'}
                      </button>
                    )}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
          <span style={{ fontSize: 11, color: C.textTer }}>Hiển thị {filtered.length} / 156 sản phẩm</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <OutlineBtn><BarChart2 size={12} /> Báo cáo tồn kho</OutlineBtn>
            <OutlineBtn><Download size={12} /> Xuất Excel</OutlineBtn>
          </div>
        </div>
      </Card>
    </>
  );
};

// ─── NAV TABS ─────────────────────────────────────────────────────────────────
const NAV_TABS = [
  { id: 'ov', label: 'Tổng quan', icon: LayoutDashboard },
  { id: 'rv', label: 'Doanh thu', icon: TrendingUp },
  { id: 'od', label: 'Đơn hàng', icon: ShoppingCart },
  { id: 'us', label: 'Khách hàng', icon: Users },
  { id: 'pr', label: 'Sản phẩm', icon: Leaf },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('ov');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('vi-VN', {
      weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric',
    }));
  }, []);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      background: C.bgPage,
      minHeight: '100vh',
      padding: '16px',
      boxSizing: 'border-box',
      color: C.text,
      fontSize: 14,
      lineHeight: 1.5,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* ── HEADER ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 18px', background: C.bg,
          border: `0.5px solid ${C.border}`, borderRadius: RADIUS.lg,
          marginBottom: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <img src="/images/logo.png" alt="logo" className="logo-img" />
            </div>
            <div>
              <div style={{ fontWeight: 500, fontSize: 15, color: C.text, lineHeight: 1.2 }}>
                DesertRose<span style={{ color: C.brand }}> Shop</span>
              </div>
              <div style={{ fontSize: 10.5, color: C.textTer }}>Admin Dashboard</div>
            </div>
            <span style={{
              fontSize: 9.5, padding: '2px 8px', background: C.brandLight,
              color: C.brandDark, borderRadius: RADIUS.full, fontWeight: 500, marginLeft: 4,
            }}>
              ● Đang hoạt động
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10.5, color: C.textTer, marginRight: 4 }}>{currentDate}</span>

            {/* Notification Bell with Red Dot */}
            <button style={{
              width: 30, height: 30, border: `0.5px solid ${C.border}`,
              borderRadius: RADIUS.md, background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}>
              <Bell size={14} color={C.textSec} />
              <span style={{
                position: 'absolute', top: 5, right: 5, width: 5, height: 5,
                borderRadius: '50%', background: C.red,
              }} />
            </button>

            {/* Settings Icon Button */}
            <button style={{
              width: 30, height: 30, border: `0.5px solid ${C.border}`,
              borderRadius: RADIUS.md, background: 'transparent', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Settings size={14} color={C.textSec} />
            </button>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '4px 11px', border: `0.5px solid ${C.border}`, borderRadius: RADIUS.md,
            }}>
              <Avatar initials="NA" color={C.brand} size={22} />
              <span style={{ fontSize: 12, color: C.textSec }}>Admin</span>
              <ChevronDown size={11} color={C.textTer} />
            </div>
          </div>
        </div>

        {/* ── NAV TABS ── */}
        <div style={{
          display: 'flex', gap: 2, marginBottom: 10,
          background: C.bgSurface, borderRadius: RADIUS.md, padding: 3,
        }}>
          {NAV_TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, padding: '6px 8px',
                  border: 'none', borderRadius: RADIUS.sm,
                  background: isActive ? C.bg : 'transparent',
                  cursor: 'pointer', fontSize: 12, fontWeight: 500,
                  color: isActive ? C.brand : C.textSec,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                  transition: 'all 0.12s',
                }}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── TAB CONTENT ── */}
        {activeTab === 'ov' && <OverviewTab setTab={setActiveTab} />}
        {activeTab === 'rv' && <RevenueTab />}
        {activeTab === 'od' && <OrdersTab />}
        {activeTab === 'us' && <UsersTab />}
        {activeTab === 'pr' && <ProductsTab />}

      </div>
    </div>
  );
}