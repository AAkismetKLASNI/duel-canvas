import { useState } from 'react';

export const useFlag = () => {
  const [isFlag, setIsFlag] = useState(false);

  const onToggleFlag = () => setIsFlag(!isFlag);

  return { onToggleFlag };
};
