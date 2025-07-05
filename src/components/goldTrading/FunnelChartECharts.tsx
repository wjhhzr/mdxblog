import React from 'react';
import ReactECharts from 'echarts-for-react';
import { GoldPosition } from './types';

interface FunnelChartEChartsProps {
  positions: GoldPosition[];
}

export const FunnelChartECharts: React.FC<FunnelChartEChartsProps> = ({ positions }) => {
  if (positions.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '80px 20px',
        color: '#666',
        fontStyle: 'italic',
        fontSize: '1.2rem',
        background: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '20px',
        margin: '20px 0',
        backdropFilter: 'blur(10px)'
      }}>
        暂无持仓数据
      </div>
    );
  }

  // 按买入价格从高到低排序
  const sortedPositions = [...positions].sort((a, b) => b.buyPrice - a.buyPrice);

  // 颜色配置 - iOS风格
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

  // 准备ECharts数据
  const funnelData = sortedPositions.map((pos, index) => {
    const value = pos.buyPrice * pos.remainingAmount;
    return {
      name: `¥${pos.buyPrice}/g`,
      value: value,
      itemStyle: {
        color: colors[index % colors.length]
      },
      // 自定义数据，用于tooltip显示
      buyDate: pos.buyDate,
      buyPrice: pos.buyPrice,
      remainingAmount: pos.remainingAmount,
      totalValue: value,
      percentage: 0 // 稍后计算
    };
  });

  // 计算百分比
  const totalValue = funnelData.reduce((sum, item) => sum + item.value, 0);
  funnelData.forEach(item => {
    item.percentage = (item.value / totalValue) * 100;
  });

  const option = {
    title: {
      text: '持仓价值分布',
      subtext: `总价值: ¥${totalValue.toFixed(2)}`,
      left: 'center',
      top: 10,
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a'
      },
      subtextStyle: {
        fontSize: 14,
        color: '#666'
      }
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      borderRadius: 12,
      textStyle: {
        color: '#333'
      },
      formatter: function(params: any) {
        const data = params.data;
        return `
          <div style="padding: 8px;">
            <div style="font-weight: bold; margin-bottom: 8px; color: #1a1a1a;">
              ${params.name}
            </div>
            <div style="margin-bottom: 4px;">
              <span style="color: #666;">买入日期:</span>
              <span style="margin-left: 8px;">${data.buyDate.toLocaleDateString()}</span>
            </div>
            <div style="margin-bottom: 4px;">
              <span style="color: #666;">买入价格:</span>
              <span style="margin-left: 8px;">¥${data.buyPrice}/g</span>
            </div>
            <div style="margin-bottom: 4px;">
              <span style="color: #666;">持仓数量:</span>
              <span style="margin-left: 8px;">${data.remainingAmount.toFixed(2)}g</span>
            </div>
            <div style="margin-bottom: 4px;">
              <span style="color: #666;">持仓价值:</span>
              <span style="margin-left: 8px; font-weight: bold; color: #1a1a1a;">
                ¥${data.totalValue.toFixed(2)}
              </span>
            </div>
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #eee;">
              <span style="color: #666;">价值占比:</span>
              <span style="margin-left: 8px; font-weight: bold; color: #667eea;">
                ${data.percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        `;
      }
    },
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      bottom: 10,
      data: funnelData.map(item => item.name),
      textStyle: {
        color: '#333',
        fontSize: 12
      },
      itemGap: 20,
      itemWidth: 20,
      itemHeight: 12,
      borderRadius: 6
    },
    series: [
      {
        name: '持仓价值',
        type: 'funnel',
        left: '10%',
        right: '10%',
        top: '15%',
        bottom: '15%',
        width: '80%',
        height: '70%',
        min: 0,
        max: totalValue,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside',
          formatter: function(params: any) {
            return `${params.data.remainingAmount.toFixed(1)}g\n¥${params.value.toFixed(0)}`;
          },
          fontSize: 12,
          fontWeight: 'bold',
          color: '#fff',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
          borderRadius: 8
        },
        emphasis: {
          label: {
            fontSize: 14
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        },
        data: funnelData
      }
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicOut',
    animationDelay: function(idx: number) {
      return idx * 100;
    }
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
}; 