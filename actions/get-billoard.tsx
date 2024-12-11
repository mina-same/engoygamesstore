// actions/get-billoard.ts
import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export const getBillboardById = async (id: string): Promise<Billboard> => {
    const response = await fetch(`${URL}/${id}`);

    if (!response.ok) {
        throw new Error('Failed to fetch billboard');
    }

    return response.json(); // Ensure you return the JSON data
};
