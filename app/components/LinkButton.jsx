import Link from 'next/link';

const LinkButton = ({ link, buttonText }) => {
  return (
    <Link href={link}>
      <button className="newBtn text-white font-bold py-1 px-2 rounded">
        {buttonText}
      </button>
    </Link>
  );
};

export default LinkButton;
