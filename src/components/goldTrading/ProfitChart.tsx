import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChartContainer = styled.div`
  height: 300px;
  position: relative;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 20px;
  background: #f8f9fa;
`;

const ChartArea = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: 4px;
  padding-bottom: 40px;
`;

const Bar = styled.div<{ height: number; color: string }>`
  flex: 1;
  background: ${props => props.color};
  height: ${props => props.height}%;
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s ease;
  min-height: 4px;


`;

const BarLabel = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  color: #666;
  white-space: nowrap;
`;

const BarValue = styled.div`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
`;

const YAxis = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 40px;
  width: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
`;

const YAxisLabel = styled.div`
  text-align: right;
  padding-right: 10px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-style: italic;
  font-size: 1.1rem;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

const SummaryCard = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
  text-align: center;
`;

const SummaryValue = styled.div<{ color?: string }>`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.color || '#333'};
  margin-bottom: 4px;
`;

const SummaryLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  date: Date;
  buyId?: string;
}

interface ProfitChartProps {
  transactions: Transaction[];
}

export const ProfitChart: React.FC<ProfitChartProps> = ({ transactions }) => {
  const sellTransactions = transactions.filter(t => t.type === 'sell');
  
  if (sellTransactions.length === 0) {
    return (
      <Container>
        <EmptyState>
          暂无卖出记录，无法显示收益分析
        </EmptyState>
      </Container>
    );
  }

  // 计算每笔卖出的收益
  const profitData = sellTransactions.map(sell => {
    const buyTransaction = transactions.find(t => t.id === sell.buyId);
    const profit = buyTransaction ? (sell.price - buyTransaction.price) * sell.amount : 0;
    
    return {
      date: sell.date.toLocaleDateString(),
      profit,
      cumulativeProfit: 0, // 稍后计算
    };
  });

  // 计算累计收益
  let cumulativeProfit = 0;
  profitData.forEach(item => {
    cumulativeProfit += item.profit;
    item.cumulativeProfit = cumulativeProfit;
  });

  // 按月份分组收益数据
  const monthlyData = profitData.reduce((acc, item) => {
    const month = item.date.split('/').slice(0, 2).join('/');
    if (!acc[month]) {
      acc[month] = { profit: 0, count: 0 };
    }
    acc[month].profit += item.profit;
    acc[month].count += 1;
    return acc;
  }, {} as Record<string, { profit: number; count: number }>);

  const monthlyEntries = Object.entries(monthlyData).sort((a, b) => {
    const [monthA] = a;
    const [monthB] = b;
    return new Date(monthA).getTime() - new Date(monthB).getTime();
  });

  const maxProfit = Math.max(...monthlyEntries.map(([, data]) => Math.abs(data.profit)));
  const minProfit = Math.min(...monthlyEntries.map(([, data]) => data.profit));

  const totalProfit = profitData.reduce((sum, item) => sum + item.profit, 0);
  const avgProfit = profitData.length > 0 ? totalProfit / profitData.length : 0;
  const profitableTrades = profitData.filter(item => item.profit > 0).length;
  const profitRate = profitData.length > 0 ? (profitableTrades / profitData.length) * 100 : 0;

  return (
    <Container>
      <SummaryGrid>
        <SummaryCard>
          <SummaryValue color={totalProfit >= 0 ? '#28a745' : '#dc3545'}>
            ¥{totalProfit.toFixed(2)}
          </SummaryValue>
          <SummaryLabel>总收益</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue color={avgProfit >= 0 ? '#28a745' : '#dc3545'}>
            ¥{avgProfit.toFixed(2)}
          </SummaryValue>
          <SummaryLabel>平均收益</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>{profitableTrades}/{profitData.length}</SummaryValue>
          <SummaryLabel>盈利交易</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryValue>{profitRate.toFixed(1)}%</SummaryValue>
          <SummaryLabel>盈利比例</SummaryLabel>
        </SummaryCard>
      </SummaryGrid>

      <ChartContainer>
        <YAxis>
          <YAxisLabel>¥{maxProfit.toFixed(0)}</YAxisLabel>
          <YAxisLabel>¥{(maxProfit / 2).toFixed(0)}</YAxisLabel>
          <YAxisLabel>¥0</YAxisLabel>
          <YAxisLabel>¥{(minProfit / 2).toFixed(0)}</YAxisLabel>
          <YAxisLabel>¥{minProfit.toFixed(0)}</YAxisLabel>
        </YAxis>
        
        <ChartArea style={{ marginLeft: '60px' }}>
          {monthlyEntries.map(([month, data], index) => {
            const height = maxProfit > 0 ? (data.profit / maxProfit) * 100 : 0;
            const color = data.profit >= 0 ? '#28a745' : '#dc3545';
            
            return (
              <Bar
                key={month}
                height={Math.abs(height)}
                color={color}
                style={{ 
                  height: `${Math.abs(height)}%`,
                  alignSelf: data.profit >= 0 ? 'flex-end' : 'flex-start'
                }}
              >
                <BarValue>
                  ¥{data.profit.toFixed(0)}
                </BarValue>
                <BarLabel>
                  {month}
                </BarLabel>
              </Bar>
            );
          })}
        </ChartArea>
      </ChartContainer>
    </Container>
  );
}; 