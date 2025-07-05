import React from 'react';
import { FunnelChartECharts, FunnelChartAdvanced } from '../../src/components/goldTrading';
import { GoldPosition } from '../../src/components/goldTrading/types';

// 模拟数据
const mockPositions: GoldPosition[] = [
  {
    id: '1',
    buyDate: new Date('2024-01-15'),
    buyPrice: 580,
    buyAmount: 10,
    remainingAmount: 10,
    totalSoldAmount: 0,
    totalProfit: 0
  },
  {
    id: '2',
    buyDate: new Date('2024-02-20'),
    buyPrice: 520,
    buyAmount: 15,
    remainingAmount: 12,
    totalSoldAmount: 3,
    totalProfit: 180
  },
  {
    id: '3',
    buyDate: new Date('2024-03-10'),
    buyPrice: 480,
    buyAmount: 20,
    remainingAmount: 20,
    totalSoldAmount: 0,
    totalProfit: 0
  },
  {
    id: '4',
    buyDate: new Date('2024-04-05'),
    buyPrice: 450,
    buyAmount: 8,
    remainingAmount: 5,
    totalSoldAmount: 3,
    totalProfit: 90
  },
  {
    id: '5',
    buyDate: new Date('2024-05-12'),
    buyPrice: 420,
    buyAmount: 12,
    remainingAmount: 12,
    totalSoldAmount: 0,
    totalProfit: 0
  }
];

const EChartsTestPage: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: 'white',
          marginBottom: '40px',
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          ECharts 漏斗图测试
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '40px'
        }}>
          {/* 基础ECharts漏斗图 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: '1.5rem'
            }}>
              基础 ECharts 漏斗图
            </h2>
            <FunnelChartECharts positions={mockPositions} />
          </div>

          {/* 高级ECharts漏斗图 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '20px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h2 style={{
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
              fontSize: '1.5rem'
            }}>
              高级 ECharts 漏斗图
            </h2>
            <FunnelChartAdvanced positions={mockPositions} />
          </div>
        </div>

        {/* 数据说明 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white'
        }}>
          <h3 style={{
            marginBottom: '20px',
            fontSize: '1.3rem',
            textAlign: 'center'
          }}>
            测试数据说明
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            {mockPositions.map((pos, index) => (
              <div key={pos.id} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '15px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  持仓 {index + 1}
                </div>
                <div>买入价格: ¥{pos.buyPrice}/g</div>
                <div>持仓数量: {pos.remainingAmount}g</div>
                <div>持仓价值: ¥{(pos.buyPrice * pos.remainingAmount).toFixed(2)}</div>
                <div>买入日期: {pos.buyDate.toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 功能说明 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '30px',
          marginTop: '30px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white'
        }}>
          <h3 style={{
            marginBottom: '20px',
            fontSize: '1.3rem',
            textAlign: 'center'
          }}>
            ECharts 漏斗图特性
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <h4 style={{ marginBottom: '10px', color: '#ffd54f' }}>🎨 视觉效果</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>• 渐变色彩设计</li>
                <li>• 平滑动画效果</li>
                <li>• 阴影和边框美化</li>
                <li>• 响应式布局</li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '10px', color: '#66bb6a' }}>🔍 交互功能</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>• 悬停显示详细信息</li>
                <li>• 图例点击切换显示</li>
                <li>• 缩放和平移支持</li>
                <li>• 数据钻取功能</li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '10px', color: '#42a5f5' }}>📊 数据展示</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>• 价值/数量双视图切换</li>
                <li>• 百分比计算显示</li>
                <li>• 多维度数据对比</li>
                <li>• 实时数据更新</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EChartsTestPage; 