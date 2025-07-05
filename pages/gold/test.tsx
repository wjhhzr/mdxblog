import React, { useState } from 'react';
import styled from 'styled-components';
import { FunnelChart } from '../../src/components/goldTrading/FunnelChart';
import { GoldPosition } from '../../src/components/goldTrading/types';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  margin-bottom: 20px;
`;

const TestButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  margin: 10px;

  &:hover {
    transform: translateY(-2px);
  }
`;

const GoldTradingTest: React.FC = () => {
  const [positions, setPositions] = useState<GoldPosition[]>([]);

  // 测试数据1：不同价格的持仓
  const testData1 = [
    {
      id: '1',
      buyDate: new Date('2024-01-15'),
      buyPrice: 520,
      totalAmount: 12,
      remainingAmount: 8,
      avgPrice: 520,
    },
    {
      id: '2',
      buyDate: new Date('2024-02-20'),
      buyPrice: 480,
      totalAmount: 6,
      remainingAmount: 6,
      avgPrice: 480,
    },
    {
      id: '3',
      buyDate: new Date('2024-03-10'),
      buyPrice: 450,
      totalAmount: 5,
      remainingAmount: 5,
      avgPrice: 450,
    },
    {
      id: '4',
      buyDate: new Date('2024-04-05'),
      buyPrice: 430,
      totalAmount: 8,
      remainingAmount: 8,
      avgPrice: 430,
    },
    {
      id: '5',
      buyDate: new Date('2024-05-12'),
      buyPrice: 420,
      totalAmount: 10,
      remainingAmount: 7,
      avgPrice: 420,
    },
    {
      id: '6',
      buyDate: new Date('2024-06-01'),
      buyPrice: 380,
      totalAmount: 15,
      remainingAmount: 12,
      avgPrice: 380,
    },
  ];

  // 测试数据2：更多不同价格的持仓
  const testData2 = [
    {
      id: '1',
      buyDate: new Date('2024-01-15'),
      buyPrice: 550,
      totalAmount: 5,
      remainingAmount: 5,
      avgPrice: 550,
    },
    {
      id: '2',
      buyDate: new Date('2024-02-20'),
      buyPrice: 520,
      totalAmount: 8,
      remainingAmount: 8,
      avgPrice: 520,
    },
    {
      id: '3',
      buyDate: new Date('2024-03-10'),
      buyPrice: 480,
      totalAmount: 10,
      remainingAmount: 10,
      avgPrice: 480,
    },
    {
      id: '4',
      buyDate: new Date('2024-04-05'),
      buyPrice: 450,
      totalAmount: 12,
      remainingAmount: 12,
      avgPrice: 450,
    },
    {
      id: '5',
      buyDate: new Date('2024-05-12'),
      buyPrice: 420,
      totalAmount: 15,
      remainingAmount: 15,
      avgPrice: 420,
    },
    {
      id: '6',
      buyDate: new Date('2024-06-01'),
      buyPrice: 400,
      totalAmount: 20,
      remainingAmount: 20,
      avgPrice: 400,
    },
    {
      id: '7',
      buyDate: new Date('2024-07-15'),
      buyPrice: 380,
      totalAmount: 25,
      remainingAmount: 25,
      avgPrice: 380,
    },
  ];

  const loadTestData1 = () => {
    setPositions(testData1);
  };

  const loadTestData2 = () => {
    setPositions(testData2);
  };

  const clearData = () => {
    setPositions([]);
  };

  const totalValue = positions.reduce((sum, pos) => sum + pos.buyPrice * pos.remainingAmount, 0);
  const totalAmount = positions.reduce((sum, pos) => sum + pos.remainingAmount, 0);

  return (
    <Container>
      <Header>🏆 黄金交易漏斗图测试</Header>
      
      <Card>
        <h3>测试数据控制</h3>
        <div>
          <TestButton onClick={loadTestData1}>加载测试数据1</TestButton>
          <TestButton onClick={loadTestData2}>加载测试数据2</TestButton>
          <TestButton onClick={clearData}>清空数据</TestButton>
        </div>
        
        {positions.length > 0 && (
          <div style={{ marginTop: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div>总持仓: <strong>{totalAmount.toFixed(2)}g</strong></div>
            <div>总价值: <strong>¥{totalValue.toFixed(2)}</strong></div>
            <div>持仓笔数: <strong>{positions.length}</strong></div>
          </div>
        )}
      </Card>

      <Card>
        <h2>📊 持仓漏斗图</h2>
        <FunnelChart positions={positions} />
      </Card>

      {positions.length > 0 && (
        <Card>
          <h3>持仓明细</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {positions
              .sort((a, b) => b.buyPrice - a.buyPrice)
              .map(pos => (
                <div key={pos.id} style={{ 
                  padding: '12px', 
                  border: '1px solid #e1e5e9', 
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div>买入价格: ¥{pos.buyPrice}/g</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      买入日期: {pos.buyDate.toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div>持仓: {pos.remainingAmount.toFixed(2)}g</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      价值: ¥{(pos.buyPrice * pos.remainingAmount).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}
    </Container>
  );
};

export default GoldTradingTest; 