import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-height: 500px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
`;

const Th = styled.th`
  background: rgba(102, 126, 234, 0.1);
  padding: 5px;
  text-align: left;
  font-weight: 700;
  color: #1a1a1a;
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);
  position: sticky;
  top: 0;
  z-index: 1;
  backdrop-filter: blur(10px);
`;

const Td = styled.td`
  padding: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  vertical-align: middle;
  transition: background-color 0.2s;
`;

const Tr = styled.tr`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:last-child td {
    border-bottom: none;
  }
`;

const TypeBadge = styled.span<{ type: 'buy' | 'sell' }>`
  border-radius: 20%;
  padding: 2px 5px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  background: ${props => props.type === 'buy' 
    ? "rgba(103, 126, 230)"
    : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'};
  color: white;
  display: inline-block;
  min-width: 40px;
  text-align: center;
`;

const ProfitBadge = styled.span<{ profit: number }>`
  padding: 2px 5px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  background: ${props => props.profit >= 0 
    ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' 
    : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'};
  color: white;
  display: inline-block;
  text-align: center;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  color: #666;
  font-style: italic;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  margin: 20px;
  backdrop-filter: blur(10px);
`;

const DateCell = styled.div`
    position: relative;

`;

const DateText = styled.div`
  font-weight: 600;
  color: #1a1a1a;
  position: relative;
  font-size: 12px;
`;

const TimeText = styled.div`
  font-size: 12px;
  color: #666;
`;

const AmountCell = styled.span`
  font-weight: 700;
  color: #1a1a1a;
`;

const PriceCell = styled.span`
  font-weight: 600;
  color: #333;
`;

const TotalCell = styled.div`
  font-weight: 700;
  color: #1a1a1a;
  font-size: 12px;
`;

interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  date: Date;
  buyId?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const calculateProfit = (transaction: Transaction) => {
    if (transaction.type === 'buy') return null;
    
    // 找到对应的买入记录
    const buyTransaction = transactions.find(t => t.id === transaction.buyId);
    if (!buyTransaction) return null;
    
    return (transaction.price - buyTransaction.price) * transaction.amount;
  };

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (transactions.length === 0) {
    return (
      <Container>
        <EmptyState>
          暂无交易记录
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Th>时间</Th>
            <Th>类型</Th>
            <Th>交易价（克/元）</Th>
            <Th>总金额</Th>
            <Th>收益 (¥)</Th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(transaction => {
            const profit = calculateProfit(transaction);
            const totalAmount = transaction.amount * transaction.price;
            
            return (
              <Tr key={transaction.id}>
                <Td>
                  <DateCell>
                    <DateText>
                      {transaction.date.toLocaleDateString()}
                    </DateText>
                    {/* <TimeText>
                      {transaction.date.toLocaleTimeString()}

                    </TimeText> */}
                  </DateCell>
                </Td>
                <Td>
                  <TypeBadge type={transaction.type}>
                    {transaction.type === 'buy' ? '买' : '卖'}
                  </TypeBadge>
                </Td>
                <Td>
                  <AmountCell>{transaction.amount.toFixed(0)}</AmountCell>/
                  <PriceCell>{transaction.price.toFixed(2)}</PriceCell>
                </Td>
                <Td>
                  <TotalCell>{totalAmount.toFixed(2)}</TotalCell>
                </Td>
                <Td>
                  {profit !== null ? (
                    <ProfitBadge profit={profit}>
                      {profit >= 0 ? '+' : ''}{profit.toFixed(2)}
                    </ProfitBadge>
                  ) : (
                    <span style={{ color: '#999', fontStyle: 'italic' }}>-</span>
                  )}
                </Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}; 