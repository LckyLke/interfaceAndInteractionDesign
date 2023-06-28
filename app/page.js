import Image from 'next/image';
import { MainScreen } from './components/MainScreen';
import FeedbackSection from './components/FeedbackSection';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <MainScreen />
    </div>
  );
}
