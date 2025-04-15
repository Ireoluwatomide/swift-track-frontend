import React from 'react';
import Card from '../common/Card';
import Skeleton from '../common/Skeleton';

interface StatisticCardProps {
    title: string;
    value: number | string;
    change?: number;
    isPositive?: boolean;
    icon?: React.ReactNode;
    isLoading?: boolean;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
                                                                title,
                                                                value,
                                                                change,
                                                                isPositive = true,
                                                                icon,
                                                                isLoading = false,
                                                            }) => {
    return (
        <Card>
            <div className="flex items-center">
                {icon && <div className="mr-3">{icon}</div>}
                <div>
                    <h3 className="text-sm font-medium text-neutral-500">{title}</h3>
                    {isLoading ? (
                        <Skeleton width="5rem" height="1.5rem" className="mt-1" />
                    ) : (
                        <p className="text-2xl font-semibold text-neutral-900">{value}</p>
                    )}
                </div>
            </div>
            {change !== undefined && (
                <div className="mt-2 flex items-center">
                    {isLoading ? (
                        <Skeleton width="6rem" height="1rem" />
                    ) : (
                        <>
              <span
                  className={`text-sm font-medium ${
                      isPositive ? 'text-success' : 'text-danger'
                  }`}
              >
                {isPositive ? '+' : '-'} {change}%
              </span>
                            <span className="ml-1 text-xs text-neutral-500">from last week</span>
                        </>
                    )}
                </div>
            )}
        </Card>
    );
};