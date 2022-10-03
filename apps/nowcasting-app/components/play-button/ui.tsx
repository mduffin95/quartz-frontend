import React from "react";

type UiProps = {
  onClick: () => void;
  isPlaying: boolean;
};

const Ui: React.FC<UiProps> = ({ onClick, isPlaying }) => {
  return (
    <button
      className="items-center m-0 w-16 h-12 px-3 text-lg m text-white bg-ocf-gray-900  hover:bg-ocf-gray-800 focus:z-10 focus:bg-ocf-gray-800"
      onClick={() => {
        onClick();
      }}
    >
      {!isPlaying ? (
        <svg viewBox="0 0 24 24" fill="currentColor" height="3rem" width="3rem">
          <path d="M7 6v12l10-6z" />
        </svg>
      ) : (
        <svg fill="none" viewBox="0 0 24 24" height="3rem" width="3rem">
          <path fill="currentColor" d="M11 7H8v10h3V7zM13 17h3V7h-3v10z" />
        </svg>
      )}
    </button>
  );
};

export default Ui;
