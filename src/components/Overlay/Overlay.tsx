import "./overlay.scss";

type OverlayProps = {
  children: React.ReactNode;
};

const Overlay = ({ children }: OverlayProps) => {
  return <div className="overlay">{children}</div>;
};

export default Overlay;
