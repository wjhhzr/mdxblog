import React from 'react';
import styled from 'styled-components';

interface StatsCardProps {
  totalWeight: number;
  totalBuy: number;
  totalProfit: number;
  avgBuyPrice: number;
  profitRate: number;
}

const Card = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 28px 32px 18px 32px;
  position: relative;
  min-width: 340px;
  max-width: 520px;
  margin: 0 auto 32px auto;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const Title = styled.div`
  color: #888;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 1px;
`;

const Icon = styled.span`
  display: flex;
  align-items: center;
  color: #bdbdbd;
  font-size: 1.1rem;
`;

const ActionIcons = styled.div`
  position: absolute;
  top: 18px;
  right: 22px;
  display: flex;
  gap: 18px;
`;

const MainValue = styled.div`
  color: #FFD600;
  font-size: 3.2rem;
  font-weight: 800;
  text-align: center;
  letter-spacing: 2px;
  margin-bottom: 10px;
  line-height: 1.1;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 18px;
`;

const StatBlock = styled.div`
  flex: 1;
  text-align: center;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 0.98rem;
  margin-bottom: 2px;
`;

const StatValue = styled.div<{ red?: boolean }>`
  color: ${p => p.red ? '#FF4D4F' : '#222'};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
`;

export const StatsCard: React.FC<StatsCardProps> = ({
  totalWeight,
  totalBuy,
  totalProfit,
  avgBuyPrice,
  profitRate
}) => {
  return (
    <Card>
      <ActionIcons>
        {/* <Icon><FiSettings /></Icon>
        <Icon><TbBatch /></Icon> */}
      </ActionIcons>
      <TopRow>
        <Title>持仓（{totalWeight.toFixed(2)}g）</Title>
        {/* <Icon><FiEye /></Icon> */}
      </TopRow>
      <MainValue>{totalBuy.toFixed(2)}</MainValue>
      <StatsRow>
        <StatBlock>
          <StatLabel>均价(元)</StatLabel>
          <StatValue red>{avgBuyPrice.toFixed(2)}</StatValue>
        </StatBlock>
        <StatBlock>
          <StatLabel>总收益(元)</StatLabel>
          <StatValue red>{totalProfit.toFixed(2)}</StatValue>
        </StatBlock>
        <StatBlock>
          <StatLabel>收益率(%)</StatLabel>
          <StatValue red>{profitRate.toFixed(2)}</StatValue>
        </StatBlock>
      </StatsRow>
    </Card>
  );
}; 