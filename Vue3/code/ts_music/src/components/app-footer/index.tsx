import React, { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { AppFooterWrapper, LogoWrapper } from './style';

interface IProps {
  children?: ReactNode;
  handleShow: () => void;
}

interface IFooterLogo {
  info: string;
  link: string;
  logoPosition: number[];
  logoPositionHover: number[];
}

const AppFooter: FC<IProps> = ({ handleShow }): JSX.Element => {
  const logoList: IFooterLogo[] = [
    {
      info: '音乐开放平台',
      link: 'https://developer.music.163.com/st/developer',
      logoPosition: [-170, -5],
      logoPositionHover: [-5, -115]
    },
    {
      info: '云村交易所',
      link: 'https://music.163.com/st/web-sublicense/home',
      logoPosition: [-5, -170],
      logoPositionHover: [-60, -170]
    },
    {
      info: 'Ampet Studio',
      link: 'https://web-amped.music.163.com/',
      logoPosition: [-5, -60],
      logoPositionHover: [-60, -5]
    },
    {
      info: '用户认证',
      link: 'https://music.163.com/st/userbasic#/auth',
      logoPosition: [-60, -60],
      logoPositionHover: [-115, -5]
    },
    {
      info: '音乐交易平台',
      link: 'https://music.163.com/st/ad-cms-bills/mlogin?from=mainStation',
      logoPosition: [-115, -115],
      logoPositionHover: [-5, -5]
    },
    {
      info: '赞赏',
      link: 'https://music.163.com/web/reward',
      logoPosition: [-170, -115],
      logoPositionHover: [-60, -115]
    },
    {
      info: '视频激励',
      link: 'https://music.163.com/st/ncreator/revenue-plan',
      logoPosition: [-170, -60],
      logoPositionHover: [-115, -60]
    }
  ];
  const moreLink: { name: string; link: string }[] = [
    {
      name: '服务条款',
      link: 'https://st.music.163.com/official-terms/service'
    },
    {
      name: '隐私政策',
      link: 'https://st.music.163.com/official-terms/privacy'
    },
    {
      name: '儿童隐私政策',
      link: 'https://st.music.163.com/official-terms/children'
    },
    {
      name: '版权投诉',
      link: 'https://music.163.com/st/staticdeal/complaints.html'
    },
    {
      name: '投资者关系',
      link: 'http://ir.music.163.com/'
    },
    {
      name: '广告合作',
      link: 'https://music.163.com/ui/resource'
    },
    {
      name: '联系我们',
      link: 'https://mp.music.163.com/600948c936c13f4d09752e73/contact-us-web/index.html'
    }
  ];

  return (
    <AppFooterWrapper onClick={(e) => handleShow()}>
      <div className="content">
        <div className="wrap-v2">
          <div className="enter">
            {logoList.map((item: IFooterLogo) => {
              return (
                <div className="enter-item" key={item.info}>
                  <LogoWrapper
                    $logoPosition={item.logoPosition}
                    $logoPositionHover={item.logoPositionHover}
                  >
                    <a
                      className="logo logo-position sprite_footer"
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    ></a>
                  </LogoWrapper>
                  <span className="info">{item.info}</span>
                </div>
              );
            })}
          </div>
          <div className="copy">
            <p className="more-link">
              {moreLink.map((item) => {
                return (
                  <span key={item.name}>
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.name}
                    </a>
                    <span className="divider">|</span>
                  </span>
                );
              })}
            </p>
            <p className="more-info">
              <a href="https://jubao.163.com" target="_blank" className="margin1" rel="noreferrer">
                廉正举报
              </a>
              <span className="margin1">不良信息举报邮箱: 51jubao@service.netease.com</span>
              <span className="margin1">客服热线：95163298</span>
            </p>
            <p className="more-info">
              <span className="margin2">不需要宗教信息服务批准证：文（2023）0000199</span>
              <span className="margin2">不需要电信业务经营批准证：文B2-200000199</span>
              <a
                href="https://beian.miit.gov.cn/#/Integrated/index"
                rel="noopener noreferrer"
                target="_blank"
              >
                晋ICP备2021017941号-1&nbsp;&nbsp;工业和信息化部备案管理系统网站
              </a>
            </p>
            <p className="more-info">
              <span className="margin1">个人使用无版权所有©1997-2023</span>
              <span className="margin1">
                个人娱乐无科技有限公司运营：
                <a href="/" target="_blank" rel="noreferrer">
                  小心宝[2023] 1186-077号
                </a>
              </span>
              <a href="https://beian.miit.gov.cn/" rel="noopener noreferrer" target="_blank">
                <span className="police-logo"></span>
                <span className="info-link">晋ICP备2021017941号-1</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </AppFooterWrapper>
  );
};

export default memo(AppFooter);
