import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { MdMail } from "react-icons/md";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="justify-center items-center gap-4">
          <div className="flex items-center justify-center pb-11 space-x-4">
            <a
              href="https://github.com/suhail-mujtabir"
              target="_blank"
              rel="noopener noreferrer"
              className="flex transition duration-300 ease-in-out hover:scale-125 justify-center items-center text-muted-foreground border-[1px] h-8 w-8 dark:border-white border-black rounded-full dark:hover:bg-red-600 hover:bg-green-500"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5 " />
            </a>
            <a
              href="https://www.linkedin.com/in/suhail-mujtabir/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center text-muted-foreground border-[1px] h-8 w-8 dark:border-white border-black rounded-full dark:hover:bg-red-600 hover:bg-green-500 transition duration-300 ease-in-out hover:scale-125"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com/suhail.mujtabir"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center text-muted-foreground border-[1px] h-8 w-8 dark:border-white border-black rounded-full dark:hover:bg-red-600 hover:bg-green-500 transition duration-300 ease-in-out hover:scale-125"
              aria-label="Twitter"
            >
              <FaFacebook className="h-5 w-5" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="flex justify-center items-center text-muted-foreground border-[1px] h-8 w-8 dark:border-white border-black rounded-full dark:hover:bg-red-600 hover:bg-green-500 transition duration-300 ease-in-out hover:scale-125"
              aria-label="Email"
            >
              <MdMail className="h-5 w-5" />
            </a>
          </div>
          <div className="text-sm flex justify-center text-muted">
            © {currentYear} Suhail Mujtabir. All rights reserved.
          </div>
          
        </div>
      </div>
    </footer>
  );
};
