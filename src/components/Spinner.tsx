interface Props {
  width?: string;
  height?: string;
  borderWidth?: string;
  color?: string;
  background?:string
}
const Spinner = ({ width, color, height, borderWidth,background }: Props) => {
  return (
    <div
      className="spinner-border fs-5"
      style={{
        width: width || "5rem",
        height: height || "5rem",
        borderWidth: borderWidth || "5px",
        color,
        background
      }}
    ></div>
  );
};

export default Spinner;
