import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 mt-auto py-4 text-center text-sm text-white border-t bg-black">
      <div className="flex justify-center items-center">
        <FontAwesomeIcon 
          icon={faHeart} 
          className="text-red-500 mr-2 text-sm w-4 h-4"
          width="16"
          height="16"
        />
        Created by {' '}
        <a 
          href="https://github.com/vgnshiyer" 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-1 text-white hover:text-gray-300 underline font-semibold"
        >
          @vgnshiyer
        </a>
      </div>
    </footer>
  )
}

export default Footer
