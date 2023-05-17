import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { ThemeHeaderWrapper } from './style';

interface IProps {
  children?: ReactNode;
  title: string;
  link?: string;
  subTitle?: string;
  subNav?: any[];
  onAreaChange?: (area: string) => void;
}

const ThemeHeader: FC<IProps> = (props): JSX.Element => {
  const { title, link, subTitle, subNav = [], onAreaChange } = props;

  return (
    <ThemeHeaderWrapper>
      <div className="title">
        <h2>{title}</h2>
        {subNav.length && onAreaChange ? (
          <div className="subNav">
            {subNav.map((item, index) => {
              return (
                <span className="item" key={index}>
                  <a onClick={() => onAreaChange(item.id)}>{item.name}</a>
                  <span className="divider">|</span>
                </span>
              );
            })}
          </div>
        ) : (
          ''
        )}
      </div>
      {link ? (
        <p className="sub">
          <a href={link}>{subTitle + ' >'}</a>
        </p>
      ) : (
        ''
      )}
    </ThemeHeaderWrapper>
  );
};

export default memo(ThemeHeader);
