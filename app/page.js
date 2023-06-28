import Image from 'next/image';
import { MainScreen } from './components/MainScreen';
import FeedbackSection from './components/FeedbackSection';
import LinkButton from './components/LinkButton';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <MainScreen />
      <div className=" fixed right-0 m-10">
        <LinkButton
          link="https://devices-pied.vercel.app/devices"
          buttonText="Devices"
        />
      </div>
      <div className=" fixed left-0 m-10">
        <LinkButton
          link="https://form-nine-beta.vercel.app/"
          buttonText="Form"
        />
      </div>
    </div>
  );
}
