interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div style={{ color: "red" }}>
      <p>{message}</p>
    </div>
  );
};

export default Error;
