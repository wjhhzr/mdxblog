import React from 'react';
import styled from 'styled-components';
import { GoldPosition } from './types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const FunnelContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FunnelLevel = styled.div<{ 
  width: number; 
  height: number;
  color: string; 
  isLast?: boolean;
}>`
  width: ${props => props.width}%;
  height: ${props => props.height}px;
  background: ${props => props.color};
  border-radius: ${props => props.isLast ? '20px' : '20px 20px 0 0'};
  margin-bottom: ${props => props.isLast ? '0' : '3px'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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

const LevelInfo = styled.div`
  position: absolute;
  left: -240px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 16px 20px;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #333;
  white-space: nowrap;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  min-width: 200px;
  border: 1px solid rgba(255, 255, 255, 0.2);

`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 0.85rem;

  &:last-child {
    margin-bottom: 0;
    padding-top: 6px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    font-weight: 600;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #666;
  font-style: italic;
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  margin: 20px 0;
  backdrop-filter: blur(10px);
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 24px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: #333;
  background: rgba(255, 255, 255, 0.8);
  padding: 12px 16px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const LegendColor = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background: ${props => props.color};
  border-radius: 6px;
`;

const LegendText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const LegendPrice = styled.div`
  font-weight: 700;
  color: #1a1a1a;
`;

const LegendAmount = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const ValueDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  z-index: 1;
`;

const AmountText = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ValueText = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 600;
`;

const TotalValueCard = styled.div`
  text-align: center;
  margin-top: 24px;
  padding: 20px 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  backdrop-filter: blur(20px);
`;

const TotalValueLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 8px;
  font-weight: 500;
`;

const TotalValueAmount = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

interface FunnelChartProps {
  positions: GoldPosition[];
}

export const FunnelChart: React.FC<FunnelChartProps> = ({ positions }) => {
  if (positions.length === 0) {
    return (
      <Container>
        <EmptyState>
          暂无持仓数据
        </EmptyState>
      </Container>
    );
  }

  // 按买入价格从高到低排序
  const sortedPositions = [...positions].sort((a, b) => b.buyPrice - a.buyPrice);

  // 颜色渐变 - iOS风格
  const colors = [
    '#ff6b6b', // 红色 - 最高价
    '#ffa726', // 橙色
    '#ffd54f', // 黄色
    '#66bb6a', // 绿色
    '#42a5f5', // 蓝色
    '#ab47bc', // 紫色
    '#26a69a', // 青色
    '#8d6e63', // 棕色
  ];

  // 计算每段的价值（单价 * 克数）
  const funnelData = sortedPositions.map((pos, index) => {
    const value = pos.buyPrice * pos.remainingAmount;
    return {
      id: pos.id,
      buyPrice: pos.buyPrice,
      remainingAmount: pos.remainingAmount,
      value,
      color: colors[index % colors.length],
      buyDate: pos.buyDate,
    };
  });

  const totalValue = funnelData.reduce((sum, item) => sum + item.value, 0);
  const maxValue = Math.max(...funnelData.map(item => item.value));

  return (
    <Container>
      <FunnelContainer>
        {funnelData.map((item, index) => {
          // 计算宽度：基于价值占比
          const widthPercent = (item.value / totalValue) * 100;
          // 计算高度：基于价值，但设置最小和最大高度
          const height = Math.max(50, Math.min(90, (item.value / maxValue) * 70 + 50));
          
          return (
            <FunnelLevel
              key={item.id}
              width={widthPercent}
              height={height}
              color={item.color}
              isLast={index === funnelData.length - 1}
            >
              <ValueDisplay>
                <AmountText>{item.remainingAmount.toFixed(2)}g</AmountText>
                <ValueText>¥{item.value.toFixed(0)}</ValueText>
              </ValueDisplay>
              <LevelInfo>
                <InfoRow>
                  <span>买入日期:</span>
                  <span>{item.buyDate.toLocaleDateString()}</span>
                </InfoRow>
                <InfoRow>
                  <span>买入价格:</span>
                  <span>¥{item.buyPrice}/g</span>
                </InfoRow>
                <InfoRow>
                  <span>持仓数量:</span>
                  <span>{item.remainingAmount.toFixed(2)}g</span>
                </InfoRow>
                <InfoRow>
                  <span>持仓价值:</span>
                  <span>¥{item.value.toFixed(2)}</span>
                </InfoRow>
                <InfoRow>
                  <span>价值占比:</span>
                  <span>{widthPercent.toFixed(1)}%</span>
                </InfoRow>
              </LevelInfo>
            </FunnelLevel>
          );
        })}
      </FunnelContainer>

      <Legend>
        {funnelData.map(item => (
          <LegendItem key={item.id}>
            <LegendColor color={item.color} />
            <LegendText>
              <LegendPrice>¥{item.buyPrice}/g</LegendPrice>
              <LegendAmount>{item.remainingAmount.toFixed(2)}g</LegendAmount>
            </LegendText>
          </LegendItem>
        ))}
      </Legend>

      <TotalValueCard>
        <TotalValueLabel>总持仓价值</TotalValueLabel>
        <TotalValueAmount>¥{totalValue.toFixed(2)}</TotalValueAmount>
      </TotalValueCard>
    </Container>
  );
}; 