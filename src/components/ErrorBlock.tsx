import { memo } from "react";

type ErrorBlockProps = {
  error: string;
};

const ErrorBlock = ({ error }: ErrorBlockProps) => {
  if (!error) {
    return null;
  }

  return <div className="error mt-8px mb-8px">{error}</div>;
};

export default memo(ErrorBlock);
