import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { ThemePaginationWrapper } from './style';
import { Pagination } from 'antd';

interface IProps {
  children?: ReactNode;
  currentPage: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const ThemePagination: FC<IProps> = (props): JSX.Element => {
  const { currentPage, total, pageSize, onPageChange } = props;

  // handle function
  // 修改页码的展示样式，“上一页”，“下一页”
  const itemRender = (current: any, type: string, originalElement: any) => {
    if (type === 'prev') {
      return <button className="control prev"> &lt; 上一页</button>;
    }
    if (type === 'next') {
      return <button className="control next">下一页 &gt;</button>;
    }
    return originalElement;
  };

  return (
    <ThemePaginationWrapper>
      <Pagination
        className="pagination"
        size="small"
        current={currentPage}
        defaultCurrent={1}
        total={total}
        pageSize={pageSize}
        showSizeChanger={false}
        itemRender={itemRender}
        onChange={onPageChange}
      />
    </ThemePaginationWrapper>
  );
};

export default memo(ThemePagination);
