import React from 'react';
import { Logo } from './Logo';
import { HomeBtn } from './HomeBtn';
import LayerScreen from './LayerScreen';
import ChatBox from './ChatBox';
import LinkButton from './LinkButton';

export const MainScreen = () => {
  return (
    <div className="flex flex-col justify-between  mainScreen">
      <div className="flex justify-around">
        <div>
          <Logo text={'AI DOC'} />
        </div>
        <div className="mt-4">
          <LinkButton
            link={'https://devices-pied.vercel.app/devices'}
            buttonText="Devices"
          />
        </div>
        <div></div>
        <div className="mt-4">
          <LinkButton
            link={'https://form-nine-beta.vercel.app/'}
            buttonText="Form"
          />
        </div>
        <div>
          <HomeBtn />
        </div>
      </div>
      <LayerScreen />
    </div>
  );
};
