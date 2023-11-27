export default function Button({
  textColor = `white`,
  bgColor = `[#38A7B6]`,
  onClick,
  children,
  className,
  isSmall = false,
}) {
  return (
    <button
      className={
        `text-${textColor} bg-${bgColor} ${
          !isSmall ? `w-36 h-12` : `w-24 h-[40px]`
        } rounded-3xl shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer font-medium ` +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
