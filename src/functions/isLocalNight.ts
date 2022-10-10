const isLocalNight = () => {
  const now = new Date().getHours();
  const localNight = now >= 18 || now <= 5; 
  return localNight;
}

export default isLocalNight;