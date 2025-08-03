export const extractError = (error) => {
  if (!error?.code) return "Unknown error";

  const rawCode = error.code.split('/')[1]; 
  const readable = rawCode
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); 

  return readable;
};
