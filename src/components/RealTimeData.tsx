const RealTimeData = (data: object | undefined) => {
  if (data !== undefined) {
    console.log(data);
  } else return undefined;

  return <div>Hello from realtime!</div>;
};

export default RealTimeData;
