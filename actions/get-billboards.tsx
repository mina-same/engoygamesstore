import { Billboard } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`

export const getBillboards = async () => {
  // Fetch all billboards instead of just one by ID
  const response = await fetch(URL); 
  const data = await response.json();
  return data; 
};

