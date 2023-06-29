import Image from 'next/image';
import { MainScreen } from './components/MainScreen';
import FeedbackSection from './components/FeedbackSection';
import LinkButton from './components/LinkButton';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <MainScreen />
    </div>
  );
}
