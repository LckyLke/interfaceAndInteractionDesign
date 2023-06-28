import Link from 'next/link';

const LinkButton = ({ link, buttonText }) => {
  return (
    <Link href={link}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {buttonText}
      </button>
    </Link>
  );
};

export default LinkButton;
