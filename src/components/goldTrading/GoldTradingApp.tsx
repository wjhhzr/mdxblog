// @ts-nocheck
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BuyForm } from './BuyForm';
import { SellForm } from './SellForm';
import { TransactionList } from './TransactionList';
import { ProfitChart } from './ProfitChart';
import { FunnelChart } from './FunnelChart';
import { FunnelChartECharts } from './FunnelChartECharts';
import { FunnelChartAdvanced } from './FunnelChartAdvanced';
import { GoldPosition } from './types';
import { GlobalStyles } from './GlobalStyles';
import { StatsCard } from './StatsCard';
import { log } from 'console';
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  padding: 0px 0;
`;

const HeaderTitle = styled.h1`
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-size: 2.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderSubtitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 1.1rem;
  font-weight: 400;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 10px 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ gradient: string }>`
  background: ${props => props.gradient};
  color: white;
  padding: 24px;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s;
  }


`;

const StatValue = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatLabel = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0.95;
  letter-spacing: 0.5px;
`;

const DemoButton = styled.button`
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  color: #333;
  border: none;
  padding: 16px 32px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 24px;

  &:active {
    transform: translateY(0) scale(1);
  }
`;

const SectionTitle = styled.h2`
  color: #1a1a1a;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-style: italic;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  margin: 20px 0;
`;

export const GoldTradingApp: React.FC = () => {
  const [transactions, setTransactions] = useState<Array<{
    id: string;
    type: 'buy' | 'sell';
    amount: number;
    price: number;
    date: Date;
    buyId?: string;
  }>>([]);

  const [positions, setPositions] = useState<GoldPosition[]>([]);
  const [funnelType, setFunnelType] = useState<'custom' | 'echarts' | 'advanced'>('advanced');
  console.log("positions", positions);

  // 计算总持仓
  const totalPosition = positions.reduce((sum, pos) => sum + pos.remainingAmount, 0);

  // 计算总买入价格
  const totalBuyPrice = positions.reduce((sum, pos) => sum + pos.buyPrice * pos.totalAmount, 0);

  // 计算总收益
  const totalProfit = transactions
    .filter(t => t.type === 'sell')
    .reduce((sum, sell) => {
      const buyTransaction = transactions.find(t => t.id === sell.buyId);
      if (buyTransaction) {
        return sum + (sell.price - buyTransaction.price) * sell.amount;
      }
      return sum;
    }, 0);

  // 计算平均买入价格
  const avgBuyPrice = positions.length > 0
    ? positions.reduce((sum, pos) => sum + pos.avgPrice * pos.remainingAmount, 0) / totalPosition
    : 0;

  // 添加示例数据
  const addDemoData = () => {
    const demoTransactions = [
      {
        id: '1',
        type: 'buy' as const,
        amount: 10,
        price: 420,
        date: new Date('2024-01-15'),
      },
      {
        id: '2',
        type: 'buy' as const,
        amount: 5,
        price: 450,
        date: new Date('2024-02-20'),
      },
      {
        id: '3',
        type: 'sell' as const,
        amount: 3,
        price: 480,
        date: new Date('2024-03-10'),
        buyId: '1',
      },
      {
        id: '4',
        type: 'buy' as const,
        amount: 8,
        price: 430,
        date: new Date('2024-04-05'),
      },
      {
        id: '5',
        type: 'sell' as const,
        amount: 2,
        price: 460,
        date: new Date('2024-05-12'),
        buyId: '2',
      }
    ];

    setTransactions(demoTransactions);
    updatePositions(demoTransactions);
  };

  // 添加买入记录
  const handleBuy = (amount: number, price: number) => {
    const newTransaction = {
      id: Date.now().toString(),
      type: 'buy' as const,
      amount,
      price,
      date: new Date(),
    };

    setTransactions(prev => {
      const updated = [...prev, newTransaction];
      updatePositions(updated);
      return updated;
    });
  };

  // 添加卖出记录
  const handleSell = (amount: number, price: number, buyId: string) => {
    const newTransaction = {
      id: Date.now().toString(),
      type: 'sell' as const,
      amount,
      price,
      date: new Date(),
      buyId,
    };

    setTransactions(prev => {
      const updated = [...prev, newTransaction];
      updatePositions(updated);
      return updated;
    });
  };

  // 更新持仓状态
  const updatePositions = (allTransactions: typeof transactions) => {
    const buyTransactions = allTransactions.filter(t => t.type === 'buy');
    const sellTransactions = allTransactions.filter(t => t.type === 'sell');

    const newPositions: GoldPosition[] = [];

    buyTransactions.forEach(buy => {
      const soldAmount = sellTransactions
        .filter(sell => sell.buyId === buy.id)
        .reduce((sum, sell) => sum + sell.amount, 0);

      const remainingAmount = buy.amount - soldAmount;

      if (remainingAmount > 0) {
        newPositions.push({
          id: buy.id,
          buyDate: buy.date,
          buyPrice: buy.price,
          totalAmount: buy.amount,
          remainingAmount,
          avgPrice: buy.price,
        });
      }
    });

    setPositions(newPositions);
  };

  // 1. 初始化时从localStorage读取交易数据
  useEffect(() => {
    const saved = localStorage.getItem('gold_transactions');


    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        console.log("读取庶几乎", parsed);

        if (Array.isArray(parsed)) {
          setTransactions(parsed.map(t => ({
            ...t,
            date: t.date ? new Date(t.date) : new Date(),
          })));
        }
      } catch { }
    }
  }, []);

  // 2. 每次transactions变化时写入localStorage
  useEffect(() => {
    localStorage.setItem('gold_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // 初始化时更新持仓
  useEffect(() => {
    updatePositions(transactions);
  }, [transactions]);
  console.log(positions);

  return (
    <>
      <GlobalStyles />
      <Container>
        <StatsCard
          // 总克数
          totalWeight={totalPosition}
          // 总买入价格
          totalBuy={totalBuyPrice}
          // 总收益
          totalProfit={totalProfit}
          // 均价
          avgBuyPrice={avgBuyPrice}
          profitRate={5}
        />
        <Card>
          <SectionTitle>📊 持仓漏斗图</SectionTitle>
          {<FunnelChartAdvanced positions={positions} />}
        </Card>
        <Card>
          <BuyForm onBuy={handleBuy} />
        </Card>
        <Card>
          <SellForm
            onSell={handleSell}
            positions={positions}
          />
        </Card>
        <Card>
          <SectionTitle>📋 交易记录</SectionTitle>
          <TransactionList transactions={transactions} />
        </Card>
      </Container>
    </>
  );
}; 