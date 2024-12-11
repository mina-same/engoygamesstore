import { getProducts } from "@/actions/get-productPage";

const makeAction = async (currentLength: number) => {
  console.log("currentLength", currentLength);

  //   const nextPage = Math.ceil(currentLength / 18) + 1; // Calculate the next page
  const response = await getProducts({ isFeatured: true, page: 1, limit: 30 });
  console.log(response); // Log the new products
  return response; // Return the response
};

export default makeAction; // Export the function as default
