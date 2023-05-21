import React, { memo, useCallback, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { PlayerVolumeWrapper } from './style';
import { Slider } from 'antd';
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store';
import { changePlayVolumeAction } from '@/views/player/store/player';

interface IProps {
  children?: ReactNode;
}

const PlayerVolume: FC<IProps> = (): JSX.Element => {
  const { volume } = useAppSelector(
    (state) => ({
      volume: state.player.playVolume
    }),
    shallowEqualApp
  );
  const dispatch = useAppDispatch();

  const [progress, setProgress] = useState<number>(volume);

  useEffect(() => {
    setProgress(volume * 100);
  }, [volume]);

  /** 按下调整音量 */
  const sliderChange = useCallback(
    (value: number) => {
      dispatch(changePlayVolumeAction(value / 100));
    },
    [dispatch]
  );

  return (
    <PlayerVolumeWrapper className="sprite_playbar">
      <div className="container">
        <Slider
          vertical
          className="sprite_playbar"
          value={progress}
          onChange={sliderChange}
          tooltip={{ formatter: null }}
        />
      </div>
    </PlayerVolumeWrapper>
  );
};

export default memo(PlayerVolume);
