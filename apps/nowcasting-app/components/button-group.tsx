interface IButtonGroup {
  rightString: string;
}

const ButtonGroup = ({ rightString }: IButtonGroup) => {
  return (
    <span className="relative z-0 w-full flex justify-end shadow-sm mx-0">
      <div className="absolute left-0 top-0 items-center px-3 py-[1px] font-extrabold 2xl:text-xl 2xl:tracking-wide 2xl:py-1 text-white bg-black">
        {rightString}
      </div>
    </span>
  );
};

export default ButtonGroup;
