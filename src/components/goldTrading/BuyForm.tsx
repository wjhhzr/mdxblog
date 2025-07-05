import React, { useState } from 'react';
import styled from 'styled-components';

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
    content: '💰';
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
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #999;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 18px 32px;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
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
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
  border-radius: 16px;
  margin-top: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
`;

const SummaryText = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 8px;
  font-weight: 500;
`;

const TotalAmount = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1.1rem;
  pointer-events: none;
`;

const StyledInput = styled(Input)<{ hasIcon?: boolean }>`
  padding-left: ${props => props.hasIcon ? '48px' : '20px'};
`;

interface BuyFormProps {
  onBuy: (amount: number, price: number) => void;
}

export const BuyForm: React.FC<BuyFormProps> = ({ onBuy }) => {
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    const priceNum = parseFloat(price);
    
    if (amountNum > 0 && priceNum > 0) {
      onBuy(amountNum, priceNum);
      setAmount('');
      setPrice('');
    }
  };

  const totalCost = parseFloat(amount) * parseFloat(price) || 0;

  return (
    <Form onSubmit={handleSubmit}>
      <Title>买入黄金</Title>
      
      <InputGroup>
        <Label>数量 (克)</Label>
        <InputWrapper>
          <InputIcon>⚖️</InputIcon>
          <StyledInput
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="请输入购买数量"
            required
            hasIcon
          />
        </InputWrapper>
      </InputGroup>

      <InputGroup>
        <Label>价格 (元/克)</Label>
        <InputWrapper>
          <InputIcon>💰</InputIcon>
          <StyledInput
            type="number"
            step="0.01"
            min="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="请输入购买价格"
            required
            hasIcon
          />
        </InputWrapper>
      </InputGroup>

      {totalCost > 0 && (
        <Summary>
          <SummaryText>预计总金额</SummaryText>
          <TotalAmount>¥{totalCost.toFixed(2)}</TotalAmount>
        </Summary>
      )}

      <Button 
        type="submit"
        disabled={!amount || !price || parseFloat(amount) <= 0 || parseFloat(price) <= 0}
      >
        确认买入
      </Button>
    </Form>
  );
}; 