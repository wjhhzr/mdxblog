import React, { useState } from 'react';
import styled from 'styled-components';
import { GoldPosition } from './types';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h3`
  margin: 0 0 24px 0;
  color: #1a1a1a;
  font-size: 1.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '💸';
    font-size: 1.4rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
  margin-bottom: 4px;
`;

const Select = styled.select`
  padding: 16px 20px;
  border: 2px solid #e8eaed;
  border-radius: 16px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #ff6b6b;
    box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.1);
    transform: translateY(-1px);
  }
`;

const Input = styled.input`
  padding: 16px 20px;
  border: 2px solid #e8eaed;
  border-radius: 16px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    border-color: #ff6b6b;
    box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  border: none;
  padding: 18px 32px;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(255, 107, 107, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }


  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const Summary = styled.div`
  background: linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%);
  padding: 20px;
  border-radius: 16px;
  margin-top: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 0.95rem;
  align-items: center;
`;

const SummaryLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const SummaryValue = styled.span<{ isProfit?: boolean }>`
  font-weight: 600;
  color: ${props => props.isProfit !== undefined 
    ? (props.isProfit ? '#28a745' : '#dc3545') 
    : '#1a1a1a'};
`;

const TotalAmount = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
  text-align: right;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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

const MaxAmountHint = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-top: 4px;
  font-weight: 500;
`;

interface SellFormProps {
  onSell: (amount: number, price: number, buyId: string) => void;
  positions: GoldPosition[];
}

export const SellForm: React.FC<SellFormProps> = ({ onSell, positions }) => {
  const [selectedPosition, setSelectedPosition] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    const priceNum = parseFloat(price);
    
    if (amountNum > 0 && priceNum > 0 && selectedPosition) {
      onSell(amountNum, priceNum, selectedPosition);
      setAmount('');
      setPrice('');
      setSelectedPosition('');
    }
  };

  const selectedPos = positions.find(p => p.id === selectedPosition);
  const maxAmount = selectedPos?.remainingAmount || 0;
  const totalRevenue = parseFloat(amount) * parseFloat(price) || 0;
  const profit = selectedPos ? (parseFloat(price) - selectedPos.buyPrice) * parseFloat(amount) : 0;

  if (positions.length === 0) {
    return (
      <Form>
        <Title>卖出黄金</Title>
        <EmptyState>
          暂无持仓，请先买入黄金
        </EmptyState>
      </Form>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Title>卖出黄金</Title>
      
      <InputGroup>
        <Label>选择买入记录</Label>
        <Select
          value={selectedPosition}
          onChange={(e) => setSelectedPosition(e.target.value)}
          required
        >
          <option value="">请选择要卖出的买入记录</option>
          {positions.map(pos => (
            <option key={pos.id} value={pos.id}>
              {pos.buyDate.toLocaleDateString()} - 总{pos.totalAmount}g / 余{pos.remainingAmount}g (¥{pos.buyPrice})
            </option>
          ))}
        </Select>
      </InputGroup>

      <InputGroup>
        <Label>卖出数量 (克)</Label>
        <Input
          type="number"
          step="0.01"
          min="0.01"
          max={maxAmount}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="请输入卖出数量"
          required
        />
        <MaxAmountHint>最大可卖出: {maxAmount}g</MaxAmountHint>
      </InputGroup>

      <InputGroup>
        <Label>卖出价格 (元/克)</Label>
        <Input
          type="number"
          step="0.01"
          min="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="请输入卖出价格"
          required
        />
      </InputGroup>

      {selectedPos && totalRevenue > 0 && (
        <Summary>
          <SummaryRow>
            <SummaryLabel>买入价格:</SummaryLabel>
            <SummaryValue>¥{selectedPos.buyPrice}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>卖出价格:</SummaryLabel>
            <SummaryValue>¥{parseFloat(price) || 0}</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>预计收益:</SummaryLabel>
            <SummaryValue isProfit={profit >= 0}>
              {profit >= 0 ? '+' : ''}¥{profit.toFixed(2)}
            </SummaryValue>
          </SummaryRow>
          <TotalAmount>总收入: ¥{totalRevenue.toFixed(2)}</TotalAmount>
        </Summary>
      )}

      <Button 
        type="submit"
        disabled={!selectedPosition || !amount || !price || parseFloat(amount) <= 0 || parseFloat(price) <= 0 || parseFloat(amount) > maxAmount}
      >
        确认卖出
      </Button>
    </Form>
  );
}; 