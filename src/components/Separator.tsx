import { ISeparator } from 'interfaces';

const Separator: React.FC<ISeparator> = ({ separatorColor }) => {
  return (
    <div
      className="separator"
      style={{
        border: `1px solid ${separatorColor}`,
        backgroundColor: `${separatorColor}`
      }}
    ></div>
  );
};

export default Separator;
