import { useMutation } from "@tanstack/react-query";
import { createLink, type ICreateLink } from "../service/link/createLink";

const useCreateLink = () => {
 
  const mutation = useMutation({
    mutationFn: async (payload: ICreateLink) => {
      return await createLink(payload);
    }
  });

  return {
    isLoading: mutation.isPending,
    isError: mutation.isError,
    createMutation: mutation
  };
};

export default useCreateLink;
