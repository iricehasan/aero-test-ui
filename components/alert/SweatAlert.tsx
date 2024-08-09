import Swal from "sweetalert2";

export const ToastError = Swal.mixin({
  toast: true,
  position: "top-end",
  customClass: {
    container: "items-center !w-full md:!w-1/3 ",
    title:
      "!text-xs md:!text-sm font-medium shrink-0 !flex items-center justify-start font-sans",
    htmlContainer: "!h-16 items-center flex",
    popup:
      "!h-fit !p-2 !pl-3 items-center flex items-center !w-fit !border-red-500 !border-2 rounded-lg bg-white !border-solid",
    timerProgressBar: "!bg-red-500",
  },
  icon: "error",

  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export const ToastSuccess = ({ tHashLink }: { tHashLink?: string }) =>
  Swal.mixin({
    toast: true,
    position: "top-end",
    icon: "success",
    customClass: {
      container: "items-center !w-full md:!w-1/3 ",
      title: `!text-xs ${
        tHashLink && "!m-0"
      } md:!text-sm font-medium shrink-0 !flex items-center justify-start font-sans`,
      htmlContainer: "items-center flex !m-0",
      popup:
        "!h-fit !p-2 !pl-3 items-center flex items-center !w-fit !border-green-500 !border-2 rounded-lg bg-white !border-solid ",
      timerProgressBar: "!bg-gray-200",
    },
    html: tHashLink
      ? `
  <a href="https://explorer.burnt.com/xion-testnet-1/tx/${tHashLink}" class="flex gap-2 items-center text-xs justify-end" target="_blank" rel="noopener">
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
</a>
  `
      : "",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

export const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  customClass: {
    container: "items-center !w-full md:!w-1/3 ",
    title: "!text-xs md:!text-sm font-medium !flex items-center justify-start",
    htmlContainer: "items-center !h-16",
    popup:
      "!h-fit !p-0 !pl-3 items-center flex items-center !w-fit !border-red-500 !border-2 rounded-lg bg-white !border-solid",
  },

  showConfirmButton: false,
  timer: 4000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});