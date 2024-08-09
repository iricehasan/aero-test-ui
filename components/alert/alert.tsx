import { useEffect, useState } from "react";

export function Alert({
  text = "Transaction Successful",
  tHashLink,
  status = true,
}: {
  text?: string;
  tHashLink?: string;
  status?: boolean;
}) {

  
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, [text,status]);

  return (
    show && (
      <div
        className={` absolute w-fit right-6 top-2 max-w-xs rounded-lg z-20 border-[3px] animate__animated animate__fadeInDown animate__faster ${
          status ? "border-green-500" : "border-red-500"
        } text-black px-4 py-3  `}
        role="alert"
      >
        <div className="w-fit">
          <div className="flex items-center gap-3">
            {status ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM14.6402 6.2318C15.0645 6.58537 15.1218 7.21593 14.7682 7.64021L9.76823 13.6402C9.59366 13.8497 9.34111 13.9788 9.06907 13.9976C8.79704 14.0165 8.52911 13.9234 8.32733 13.74L5.32733 11.0127C4.91868 10.6412 4.88856 10.0087 5.26007 9.60008C5.63157 9.19142 6.26402 9.16131 6.67268 9.53281L8.90016 11.5578L13.2318 6.35984C13.5854 5.93556 14.2159 5.87824 14.6402 6.2318Z"
                  fill="#1FCB4F"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                className=" shrink-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L10 8.58579L12.2929 6.29289C12.6834 5.90237 13.3166 5.90237 13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711L11.4142 10L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L10 11.4142L7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929L8.58579 10L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289Z"
                  fill="#F43722"
                />
              </svg>
            )}
            <span className="block sm:inline text-xs font-semibold">{text}</span>
          </div>
          {status && tHashLink && <a href={tHashLink} className="flex gap-2 items-center text-xs justify-end" target="_blank" rel="noopener">
            View explorer
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.75 1.5C2.75 1.08579 3.08579 0.75 3.5 0.75H8C8.41421 0.75 8.75 1.08579 8.75 1.5V6C8.75 6.41421 8.41421 6.75 8 6.75C7.58579 6.75 7.25 6.41421 7.25 6V2.25H3.5C3.08579 2.25 2.75 1.91421 2.75 1.5Z"
                fill="#1A1B2F"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.53033 0.96967C8.82322 1.26256 8.82322 1.73744 8.53033 2.03033L1.78033 8.78033C1.48744 9.07322 1.01256 9.07322 0.71967 8.78033C0.426777 8.48744 0.426777 8.01256 0.71967 7.71967L7.46967 0.96967C7.76256 0.676777 8.23744 0.676777 8.53033 0.96967Z"
                fill="#1A1B2F"
              />
            </svg>
          </a>}
        </div>
        <button
          onClick={() => setShow(false)}
          className="absolute hidden top-0 bottom-0 right-0 px-4 py-3"
        >
          <svg
            className="fill-current h-4 w-4 text-black"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.414 10l4.293-4.293a1 1 0 00-1.414-1.414L10 8.586 5.707 4.293a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 101.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10z"
            />
          </svg>
        </button>
      </div>
    )
  );
}