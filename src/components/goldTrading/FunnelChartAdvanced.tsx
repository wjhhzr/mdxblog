import React, { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { GoldPosition } from './types';
import deepClone from 'src/lib/function/deepClone';

interface FunnelChartAdvancedProps {
    positions: GoldPosition[];
}

export const FunnelChartAdvanced: React.FC<FunnelChartAdvancedProps> = ({ positions }) => {
    const [selectedView, setSelectedView] = useState<'value' | 'amount'>('value');


    console.log(positions);


    // 按买入价格从高到低排序
    const sortedPositions = deepClone(positions)

    console.log("sortedPositions", sortedPositions);


    // 颜色配置 - iOS风格渐变
    const colors = [
        { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ff6b6b' }, { offset: 1, color: '#ee5a24' }] },
        { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ffa726' }, { offset: 1, color: '#ff9800' }] },
        { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ffd54f' }, { offset: 1, color: '#ffc107' }] },
        { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#66bb6a' }, { offset: 1, color: '#4caf50' }] },
        { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#42a5f5' }, { offset: 1, color: '#2196f3' }] },
        { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#ab47bc' }, { offset: 1, color: '#9c27b0' }] },
        { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#26a69a' }, { offset: 1, color: '#009688' }] },
        { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: '#8d6e63' }, { offset: 1, color: '#795548' }] },
    ];

    const chartData = useMemo(() => {
        let newData = [];
        // 如果价格相同，就整合为一条数据到newData
        sortedPositions.forEach(item => {
            const existingItem = newData.find(i => i.buyPrice === item.buyPrice);
            if (existingItem) {
                existingItem.totalAmount += item.totalAmount;
                existingItem.remainingAmount += item.remainingAmount;
            } else {
                newData.push(item);
            }
        });

        const data = newData.map((pos, index) => {
            const value = pos.buyPrice * pos.remainingAmount;
            const amount = pos.remainingAmount;

            return {
                name: `¥${pos.buyPrice}/g`,
                value,
                itemStyle: {
                    color: colors[index % colors.length]
                },
                // 自定义数据
                buyDate: pos.buyDate,
                buyPrice: pos.buyPrice,
                remainingAmount: pos.remainingAmount,
                totalValue: value,
                valuePercentage: 0,
                amountPercentage: 0
            };
        });


        const totalValue = data.reduce((sum, item) => sum + item.totalValue, 0);
        const totalAmount = data.reduce((sum, item) => sum + item.remainingAmount, 0);

        data.forEach(item => {
            item.valuePercentage = (item.totalValue / totalValue) * 100;
            item.amountPercentage = (item.remainingAmount / totalAmount) * 100;
        });

        console.log("data", data, totalValue,);

        // 排序


        return { data: data.sort((a, b) => b.buyPrice - a.buyPrice), totalValue, totalAmount };
    }, [sortedPositions]);


    console.log("排序", chartData.data);


    const option = {
        title: {
            text: selectedView === 'value' ? '持仓价值分布' : '持仓数量分布',
            subtext: selectedView === 'value'
                ? `总价值: ¥${chartData.totalValue.toFixed(2)}`
                : `总数量: ${chartData.totalAmount.toFixed(2)}g`,
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
            formatter: function (params: any) {
                const data = params.data;
                return `
          <div style="padding: 12px; min-width: 200px;">
            <div style="font-weight: bold; margin-bottom: 12px; color: #1a1a1a; font-size: 14px;">
              ${params.name}
            </div>
            <div style="margin-bottom: 6px; display: flex; justify-content: space-between;">
              <span style="color: #666;">买入日期:</span>
              <span style="font-weight: 500;">${data.buyDate.toLocaleDateString()}</span>
            </div>
            <div style="margin-bottom: 6px; display: flex; justify-content: space-between;">
              <span style="color: #666;">买入价格:</span>
              <span style="font-weight: 500;">¥${data.buyPrice}/g</span>
            </div>
            <div style="margin-bottom: 6px; display: flex; justify-content: space-between;">
              <span style="color: #666;">持仓数量:</span>
              <span style="font-weight: 500;">${data.remainingAmount.toFixed(2)}g</span>
            </div>
            <div style="margin-bottom: 6px; display: flex; justify-content: space-between;">
              <span style="color: #666;">持仓价值:</span>
              <span style="font-weight: bold; color: #1a1a1a;">¥${data.totalValue.toFixed(2)}</span>
            </div>
            <div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #eee;">
              <div style="margin-bottom: 4px; display: flex; justify-content: space-between;">
                <span style="color: #666;">价值占比:</span>
                <span style="font-weight: bold; color: #667eea;">${data.valuePercentage.toFixed(1)}%</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #666;">数量占比:</span>
                <span style="font-weight: bold; color: #43e97b;">${data.amountPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>
        `;
            }
        },
        legend: {
            type: 'scroll',
            orient: 'horizontal',
            bottom: 10,
            data: chartData.data.map(item => item.name),
            textStyle: {
                color: '#333',
                fontSize: 12
            },
            itemGap: 20,
            itemWidth: 20,
            itemHeight: 12,
            borderRadius: 6,
            selectedMode: true
        },
        series: [
            {
                name: selectedView === 'value' ? '持仓价值' : '持仓数量',
                type: 'funnel',
                left: '10%',
                right: '10%',
                top: '15%',
                bottom: '15%',
                width: '80%',
                height: '70%',
                gap: 3,
                sort: 'none', 
                minSize: "20%",
                maxSize: "100%",
                label: {
                    show: true,
                    position: 'inside',
                    formatter: function (params: any) {
                        if (selectedView === 'value') {
                            return `${params.data.remainingAmount.toFixed(1)}g\n¥${params.value.toFixed(0)}`;
                        } else {
                            return `${params.value.toFixed(1)}g\n¥${params.data.totalValue.toFixed(0)}`;
                        }
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
                    borderWidth: 2,
                    borderRadius: 8,
                    shadowBlur: 5,
                    shadowColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis: {
                    label: {
                        fontSize: 14
                    },
                    itemStyle: {
                        shadowBlur: 15,
                        shadowColor: 'rgba(0, 0, 0, 0.4)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                },
                data: chartData.data
            }
        ],
        animation: true,
        animationDuration: 1200,
        animationEasing: 'cubicOut',
        animationDelay: function (idx: number) {
            return idx * 150;
        }
    };
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
    } else {
        return <div style={{ width: '100%' }}>
            {/* 图表容器 */}
            <div style={{
                width: '100%',
                height: '500px',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                padding: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                <ReactECharts
                    option={option}
                    style={{ height: '100%', width: '100%' }}
                    opts={{ renderer: 'canvas' }}
                />
            </div>
        </div>
    }
}; 